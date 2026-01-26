import { R2 } from "@convex-dev/r2";
import { v } from "convex/values";
import { components } from "./_generated/api";
import { mutation } from "./_generated/server";

const getR2 = () => new R2(components.r2);

export const generateUploadUrl = mutation({
  args: {},
  handler: async () => {
    const r2 = getR2();
    return await r2.generateUploadUrl();
  },
});

export const recordUpload = mutation({
  args: {
    key: v.string(),
    filename: v.string(),
    contentType: v.string(),
    size: v.number(),
  },
  handler: async (ctx, args) => {
    const r2 = getR2();
    return await ctx.db.insert("uploads", {
      key: args.key,
      filename: args.filename,
      contentType: args.contentType,
      size: args.size,
      uploadedAt: Date.now(),
      bucket: r2.config.bucket,
    });
  },
});
