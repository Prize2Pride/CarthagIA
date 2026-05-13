import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, phases, kpis, ideas, votes, InsertIdea, InsertVote } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Phases queries
export async function getAllPhases() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(phases).orderBy((p) => p.phaseNumber);
}

export async function getPhaseById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(phases).where(eq(phases.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// KPIs queries
export async function getKPIsByPhaseId(phaseId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(kpis).where(eq(kpis.phaseId, phaseId));
}

// Ideas queries
export async function getIdeasByPhaseId(phaseId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(ideas).where(eq(ideas.phaseId, phaseId)).orderBy((i) => i.createdAt);
}

export async function getAllIdeas() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(ideas).orderBy((i) => i.createdAt);
}

export async function getIdeaById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(ideas).where(eq(ideas.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createIdea(idea: InsertIdea) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(ideas).values(idea);
  return result;
}

export async function updateIdeaStatus(id: number, status: "pending" | "approved" | "rejected") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(ideas).set({ status }).where(eq(ideas.id, id));
}

// Votes queries - FIXED to prevent duplicate votes
export async function getUserVoteOnIdea(userId: number, ideaId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(votes)
    .where(and(eq(votes.userId, userId), eq(votes.ideaId, ideaId)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createOrUpdateVote(
  userId: number,
  ideaId: number,
  voteType: "upvote" | "downvote"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if user already voted
  const existingVote = await getUserVoteOnIdea(userId, ideaId);
  const idea = await getIdeaById(ideaId);

  if (!idea) throw new Error("Idea not found");

  let newUpvotes = idea.upvotes || 0;
  let newDownvotes = idea.downvotes || 0;

  // Remove previous vote if exists
  if (existingVote) {
    if (existingVote.voteType === "upvote") {
      newUpvotes = Math.max(0, newUpvotes - 1);
    } else {
      newDownvotes = Math.max(0, newDownvotes - 1);
    }

    // Delete the old vote
    await db.delete(votes).where(eq(votes.id, existingVote.id));
  }

  // Add new vote
  if (voteType === "upvote") {
    newUpvotes++;
  } else {
    newDownvotes++;
  }

  // Update idea vote counts
  await db.update(ideas).set({ upvotes: newUpvotes, downvotes: newDownvotes }).where(eq(ideas.id, ideaId));

  // Insert new vote
  await db.insert(votes).values({
    userId,
    ideaId,
    voteType,
  });

  return { upvotes: newUpvotes, downvotes: newDownvotes };
}

export async function deleteVote(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(votes).where(eq(votes.id, id));
}
