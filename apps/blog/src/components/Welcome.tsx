import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Welcome() {
  return (
    <div
      id="container"
      className="flex items-center justify-center min-h-screen bg-muted/50 p-4"
    >
      <main className="max-w-md w-full">
        <Card className="shadow-xl border-t-4 border-t-blue-600">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-extrabold text-blue-600 uppercase tracking-tighter">
              Digital Factory
            </CardTitle>
            <CardDescription className="text-lg font-medium text-muted-foreground mt-2">
              Astro + Shadcn UI + Tailwind v4
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="bg-blue-50 p-4 rounded-full">
              <img
                src="/background.svg"
                width="80"
                height="80"
                alt="Astro Logo"
                className="opacity-90"
              />
            </div>
            <p className="text-center text-muted-foreground leading-relaxed">
              Tailwind CSS v4 is now working with Shadcn components in this
              Turborepo starter!
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
