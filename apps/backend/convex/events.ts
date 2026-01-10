import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const saveEvent = mutation({
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
