import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { workflowManager } from "./workflows";
import { internal } from "./_generated/api";

export const startEventWorkflow = mutation({
  args: { name: v.string() },
  handler: async (ctx, args): Promise<string> => {
    const workflowId: string = await workflowManager.start(
      ctx,
      internal.workflows.eventProcessingWorkflow,
      {
        name: args.name,
      },
    );
    return workflowId;
  },
});

export const saveEvent = internalMutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const eventId = await ctx.db.insert("events", { name: args.name });
    return eventId;
  },
});

export const getEvents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").collect();
  },
});
