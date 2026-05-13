import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  getAllPhases,
  getPhaseById,
  getKPIsByPhaseId,
  getIdeasByPhaseId,
  getIdeaById,
  createIdea,
  updateIdeaStatus,
  getUserVoteOnIdea,
  createOrUpdateVote,
  getAllIdeas,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  phases: router({
    getAll: publicProcedure.query(() => getAllPhases()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getPhaseById(input.id)),
  }),

  kpis: router({
    getByPhaseId: publicProcedure
      .input(z.object({ phaseId: z.number() }))
      .query(({ input }) => getKPIsByPhaseId(input.phaseId)),
  }),

  ideas: router({
    getByPhaseId: publicProcedure
      .input(z.object({ phaseId: z.number() }))
      .query(({ input }) => getIdeasByPhaseId(input.phaseId)),

    getAll: publicProcedure
      .query(() => getAllIdeas()),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getIdeaById(input.id)),

    create: protectedProcedure
      .input(
        z.object({
          phaseId: z.number(),
          titleEn: z.string(),
          titleAr: z.string(),
          titleFr: z.string(),
          descriptionEn: z.string(),
          descriptionAr: z.string(),
          descriptionFr: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return createIdea({
          userId: ctx.user.id,
          phaseId: input.phaseId,
          titleEn: input.titleEn,
          titleAr: input.titleAr,
          titleFr: input.titleFr,
          descriptionEn: input.descriptionEn,
          descriptionAr: input.descriptionAr,
          descriptionFr: input.descriptionFr,
        });
      }),

    updateStatus: protectedProcedure
      .input(
        z.object({
          ideaId: z.number(),
          status: z.enum(["pending", "approved", "rejected"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return updateIdeaStatus(input.ideaId, input.status);
      }),
  }),

  votes: router({
    getUserVote: protectedProcedure
      .input(z.object({ ideaId: z.number() }))
      .query(async ({ ctx, input }) => {
        return getUserVoteOnIdea(ctx.user.id, input.ideaId);
      }),

    vote: protectedProcedure
      .input(
        z.object({
          ideaId: z.number(),
          voteType: z.enum(["upvote", "downvote"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return createOrUpdateVote(ctx.user.id, input.ideaId, input.voteType);
      }),
  }),
});

export type AppRouter = typeof appRouter;
