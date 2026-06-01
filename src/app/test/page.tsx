import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-6 bg-zinc-50 dark:bg-zinc-950">
      <h1 className="text-3xl font-bold tracking-tight">Shadcn UI Test Page</h1>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verification Card</CardTitle>
          <CardDescription>This card verifies that shadcn/ui and Tailwind CSS are working.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            If the styling looks correct and the button below is styled, the installation is successful.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Click Me</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
