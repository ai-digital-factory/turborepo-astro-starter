import React, { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@backend/_generated/api";
import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui";

function App() {
  const events = useQuery(api.events.getEvents);

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
    <div className="flex min-h-screen w-screen flex-col items-center justify-start gap-4 bg-background p-8 overflow-y-auto">
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle>Convex Events</CardTitle>
          <CardDescription>
            Real-time event list fetched from Convex.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex w-full max-w-[500px] flex-col gap-4">
        {events === undefined ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg animate-pulse text-muted-foreground">
                Loading events...
              </CardTitle>
            </CardHeader>
          </Card>
        ) : events.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">
                No events found.
              </CardTitle>
            </CardHeader>
          </Card>
        ) : (
          events.map((event: { _id: string; name: string }) => (
            <Card key={event._id}>
              <CardHeader>
                <CardTitle className="text-lg">{event.name}</CardTitle>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
