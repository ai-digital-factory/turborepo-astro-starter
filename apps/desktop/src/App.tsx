import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";

function App() {
  useEffect(() => {
    if (window.ipcRenderer) {
      const controller = new AbortController();

      window.ipcRenderer.on(
        "main-process-message",
        (message) => {
          console.log(message);
        },
        { signal: controller.signal },
      );

      return () => {
        controller.abort();
      };
    }
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background p-4">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Starter Desktop App</CardTitle>
          <CardDescription>
            Built with Electron, React, Vite, and Turborepo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is an empty page styled using the shared <code>@repo/ui</code>{" "}
            package.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
