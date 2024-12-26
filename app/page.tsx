import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-bold text-4xl">This is the frontend!</h1>
      <Button className="m-4">This button comes from shadcn/ui</Button>
    </div>
  );
}
