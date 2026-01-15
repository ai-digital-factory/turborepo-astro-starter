import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());

const executeLongTask = async () => {
  // Simulate CPU intensive task
  console.log("Starting long task...");
  await new Promise((resolve) => setTimeout(resolve, 4000));
  console.log("Long task completed.");
  return { status: "success", message: "Task completed after 4 seconds" };
};

app.get("/", (c) => {
  return c.text("Worker is running!");
});

app.post("/execute", async (c) => {
  const result = await executeLongTask();
  return c.json(result);
});

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
