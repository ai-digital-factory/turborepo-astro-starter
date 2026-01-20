import { internalAction } from "./_generated/server";
import { v } from "convex/values";

export const executeWorkerTask = internalAction({
  args: {
    taskName: v.string(),
  },
  handler: async (ctx, args) => {
    console.log(`Executing worker task: ${args.taskName}`);

    const response = await fetch(
      "https://starter-worker.reelfreakz.com/execute",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName: args.taskName }),
      },
    );

    if (!response.ok) {
      throw new Error(`Worker task failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log(`Worker task ${args.taskName} completed:`, result);
    return result;
  },
});
