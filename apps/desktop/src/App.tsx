import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";

function App() {
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
