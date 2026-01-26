import { defineApp } from "convex/server";
import r2 from "@convex-dev/r2/convex.config";
import workflow from "@convex-dev/workflow/convex.config";
import workpool from "@convex-dev/workpool/convex.config";

const app = defineApp();

app.use(workpool);
app.use(workflow);
app.use(r2);

export default app;
