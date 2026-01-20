import { WorkflowManager } from "@convex-dev/workflow";
import { v } from "convex/values";
import { components, internal } from "./_generated/api";

export const workflowManager = new WorkflowManager(components.workflow);

export const eventProcessingWorkflow = workflowManager.define({
  args: {
    name: v.string(),
  },
  handler: async (step, args) => {
    // Step 1: Execute first worker task
    await step.runAction(internal.tasks.executeWorkerTask, {
      taskName: `${args.name} - Task 1`,
    });

    // Step 2: Execute second worker task
    await step.runAction(internal.tasks.executeWorkerTask, {
      taskName: `${args.name} - Task 2`,
    });

    // Step 3: Save the result
    await step.runMutation(internal.events.saveEvent, {
      name: `${args.name} - Completed`,
    });
  },
});
