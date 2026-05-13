import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// CarthagIA Phase table
export const phases = mysqlTable("phases", {
  id: int("id").autoincrement().primaryKey(),
  phaseNumber: int("phaseNumber").notNull().unique(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  titleAr: varchar("titleAr", { length: 255 }).notNull(),
  titleFr: varchar("titleFr", { length: 255 }).notNull(),
  descriptionEn: text("descriptionEn"),
  descriptionAr: text("descriptionAr"),
  descriptionFr: text("descriptionFr"),
  icon: varchar("icon", { length: 50 }),
  progressPercentage: int("progressPercentage").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Phase = typeof phases.$inferSelect;
export type InsertPhase = typeof phases.$inferInsert;

// KPI metrics table
export const kpis = mysqlTable("kpis", {
  id: int("id").autoincrement().primaryKey(),
  phaseId: int("phaseId").notNull(),
  metricKeyEn: varchar("metricKeyEn", { length: 255 }).notNull(),
  metricKeyAr: varchar("metricKeyAr", { length: 255 }).notNull(),
  metricKeyFr: varchar("metricKeyFr", { length: 255 }).notNull(),
  currentValue: decimal("currentValue", { precision: 10, scale: 2 }),
  targetValue: decimal("targetValue", { precision: 10, scale: 2 }),
  unit: varchar("unit", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type KPI = typeof kpis.$inferSelect;
export type InsertKPI = typeof kpis.$inferInsert;

// Citizen ideas table
export const ideas = mysqlTable("ideas", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  phaseId: int("phaseId").notNull(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  titleAr: varchar("titleAr", { length: 255 }).notNull(),
  titleFr: varchar("titleFr", { length: 255 }).notNull(),
  descriptionEn: text("descriptionEn").notNull(),
  descriptionAr: text("descriptionAr").notNull(),
  descriptionFr: text("descriptionFr").notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending"),
  upvotes: int("upvotes").default(0),
  downvotes: int("downvotes").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Idea = typeof ideas.$inferSelect;
export type InsertIdea = typeof ideas.$inferInsert;

// Votes table (user votes on ideas)
export const votes = mysqlTable("votes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  ideaId: int("ideaId").notNull(),
  voteType: mysqlEnum("voteType", ["upvote", "downvote"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Vote = typeof votes.$inferSelect;
export type InsertVote = typeof votes.$inferInsert;
// ============================================
// BLOCKCHAIN & TRANSPARENCY TABLES
// ============================================

// Blockchain Transactions - Immutable records
export const blockchainTransactions = mysqlTable("blockchain_transactions", {
  id: int("id").autoincrement().primaryKey(),
  transactionHash: varchar("transaction_hash", { length: 255 }).notNull().unique(),
  type: mysqlEnum("type", ["spending", "approval", "vote", "audit"]).notNull(),
  amount: decimal("amount", { precision: 15, scale: 2 }),
  description: text("description"),
  fromAddress: varchar("from_address", { length: 255 }).notNull(),
  toAddress: varchar("to_address", { length: 255 }),
  status: mysqlEnum("status", ["pending", "confirmed", "failed"]).default("pending"),
  blockNumber: int("block_number"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BlockchainTransaction = typeof blockchainTransactions.$inferSelect;
export type InsertBlockchainTransaction = typeof blockchainTransactions.$inferInsert;

// Audit Trail - Complete action history
export const auditTrail = mysqlTable("audit_trail", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  action: varchar("action", { length: 255 }).notNull(),
  resourceType: varchar("resource_type", { length: 100 }).notNull(),
  resourceId: int("resource_id"),
  changes: text("changes"),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  blockchainHash: varchar("blockchain_hash", { length: 255 }),
});

export type AuditTrail = typeof auditTrail.$inferSelect;
export type InsertAuditTrail = typeof auditTrail.$inferInsert;

// Corruption Detection Alerts
export const corruptionAlerts = mysqlTable("corruption_alerts", {
  id: int("id").autoincrement().primaryKey(),
  alertType: mysqlEnum("alert_type", [
    "anomaly",
    "pattern",
    "conflict_of_interest",
    "unusual_spending",
    "duplicate_transaction",
  ]).notNull(),
  severity: mysqlEnum("severity", ["low", "medium", "high", "critical"]).notNull(),
  description: text("description").notNull(),
  relatedTransactionId: int("related_transaction_id"),
  relatedUserId: int("related_user_id"),
  riskScore: int("risk_score"),
  status: mysqlEnum("status", ["open", "investigating", "resolved", "false_positive"]).default("open"),
  investigatedBy: int("investigated_by"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CorruptionAlert = typeof corruptionAlerts.$inferSelect;
export type InsertCorruptionAlert = typeof corruptionAlerts.$inferInsert;

// Budget Allocation & Spending Tracking
export const budgetAllocations = mysqlTable("budget_allocations", {
  id: int("id").autoincrement().primaryKey(),
  department: varchar("department", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  allocatedAmount: decimal("allocated_amount", { precision: 15, scale: 2 }).notNull(),
  spentAmount: decimal("spent_amount", { precision: 15, scale: 2 }).default('0'),
  fiscalYear: int("fiscal_year").notNull(),
  approvedBy: int("approved_by"),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending"),
  blockchainHash: varchar("blockchain_hash", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BudgetAllocation = typeof budgetAllocations.$inferSelect;
export type InsertBudgetAllocation = typeof budgetAllocations.$inferInsert;

// Multi-Signature Approvals
export const multiSigApprovals = mysqlTable("multi_sig_approvals", {
  id: int("id").autoincrement().primaryKey(),
  proposalId: varchar("proposal_id", { length: 255 }).notNull(),
  proposalType: varchar("proposal_type", { length: 100 }).notNull(),
  proposalData: text("proposal_data"),
  requiredSignatures: int("required_signatures").notNull(),
  currentSignatures: int("current_signatures").default(0),
  signers: text("signers"),
  status: mysqlEnum("status", ["pending", "approved", "rejected", "expired"]).default("pending"),
  expiresAt: timestamp("expires_at"),
  blockchainHash: varchar("blockchain_hash", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MultiSigApproval = typeof multiSigApprovals.$inferSelect;
export type InsertMultiSigApproval = typeof multiSigApprovals.$inferInsert;

// Decentralized Governance Proposals
export const governanceProposals = mysqlTable("governance_proposals", {
  id: int("id").autoincrement().primaryKey(),
  proposalNumber: varchar("proposal_number", { length: 50 }).notNull().unique(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  titleAr: varchar("titleAr", { length: 255 }).notNull(),
  titleFr: varchar("titleFr", { length: 255 }).notNull(),
  descriptionEn: text("descriptionEn"),
  descriptionAr: text("descriptionAr"),
  descriptionFr: text("descriptionFr"),
  proposedBy: int("proposed_by").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  status: mysqlEnum("status", ["draft", "active", "passed", "failed", "implemented"]).default("draft"),
  votesFor: int("votes_for").default(0),
  votesAgainst: int("votes_against").default(0),
  votesAbstain: int("votes_abstain").default(0),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  blockchainHash: varchar("blockchain_hash", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GovernanceProposal = typeof governanceProposals.$inferSelect;
export type InsertGovernanceProposal = typeof governanceProposals.$inferInsert;

// Governance Votes
export const governanceVotes = mysqlTable("governance_votes", {
  id: int("id").autoincrement().primaryKey(),
  proposalId: int("proposal_id").notNull(),
  userId: int("user_id").notNull(),
  voteType: mysqlEnum("vote_type", ["for", "against", "abstain"]).notNull(),
  blockchainHash: varchar("blockchain_hash", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GovernanceVote = typeof governanceVotes.$inferSelect;
export type InsertGovernanceVote = typeof governanceVotes.$inferInsert;
