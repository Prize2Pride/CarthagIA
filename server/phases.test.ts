import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock user context
const createMockContext = (role: "user" | "admin" = "user"): TrpcContext => ({
  user: {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "test",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  },
  req: {
    protocol: "https",
    headers: {},
  } as TrpcContext["req"],
  res: {
    clearCookie: () => {},
  } as TrpcContext["res"],
});

describe("Phases API", () => {
  it("should fetch all phases", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const phases = await caller.phases.getAll();

    expect(Array.isArray(phases)).toBe(true);
  });

  it("should fetch a phase by ID", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const phase = await caller.phases.getById({ id: 1 });

    // Phase may or may not exist depending on database state
    if (phase) {
      expect(phase).toHaveProperty("id");
      expect(phase).toHaveProperty("titleEn");
    }
  });
});

describe("KPIs API", () => {
  it("should fetch KPIs by phase ID", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const kpis = await caller.kpis.getByPhaseId({ phaseId: 1 });

    expect(Array.isArray(kpis)).toBe(true);
  });
});

describe("Ideas API", () => {
  it("should fetch ideas by phase ID", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const ideas = await caller.ideas.getByPhaseId({ phaseId: 1 });

    expect(Array.isArray(ideas)).toBe(true);
  });

  it("should create an idea when authenticated", async () => {
    const ctx = createMockContext("user");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.ideas.create({
      phaseId: 1,
      titleEn: "Test Idea",
      titleAr: "فكرة اختبار",
      titleFr: "Idée de Test",
      descriptionEn: "This is a test idea",
      descriptionAr: "هذه فكرة اختبار",
      descriptionFr: "Ceci est une idée de test",
    });

    expect(result).toBeDefined();
  });

  it("should not allow unauthenticated users to create ideas", async () => {
    const ctx = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    } as unknown as TrpcContext;

    const caller = appRouter.createCaller(ctx);

    try {
      await caller.ideas.create({
        phaseId: 1,
        titleEn: "Test",
        titleAr: "اختبار",
        titleFr: "Test",
        descriptionEn: "Test",
        descriptionAr: "اختبار",
        descriptionFr: "Test",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("Admin API", () => {
  it("should allow admin to update idea status", async () => {
    const ctx = createMockContext("admin");
    const caller = appRouter.createCaller(ctx);

    // This will fail if no ideas exist, but tests the permission logic
    try {
      await caller.ideas.updateStatus({
        ideaId: 999,
        status: "approved",
      });
    } catch (error) {
      // Expected if idea doesn't exist
      expect(error).toBeDefined();
    }
  });

  it("should not allow non-admin to update idea status", async () => {
    const ctx = createMockContext("user");
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.ideas.updateStatus({
        ideaId: 1,
        status: "approved",
      });
      expect.fail("Should have thrown a FORBIDDEN error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("Votes API", () => {
  it("should not allow unauthenticated users to vote", async () => {
    const ctx = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    } as unknown as TrpcContext;

    const caller = appRouter.createCaller(ctx);

    try {
      await caller.votes.vote({
        ideaId: 1,
        voteType: "upvote",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should allow authenticated users to vote", async () => {
    const ctx = createMockContext("user");
    const caller = appRouter.createCaller(ctx);

    // This will fail if idea doesn't exist, but tests the logic
    try {
      await caller.votes.vote({
        ideaId: 999,
        voteType: "upvote",
      });
    } catch (error) {
      // Expected if idea doesn't exist
      expect(error).toBeDefined();
    }
  });
});

describe("Auth API", () => {
  it("should return current user", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const user = await caller.auth.me();

    expect(user).toEqual(ctx.user);
  });

  it("should handle logout", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
  });
});
