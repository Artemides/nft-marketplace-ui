import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex items-center justify-center p-12 h-[calc(100vh-73px)] ">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-6xl">
            Mint, List and Sell your NFT Collection as easiest as never
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Effortless NFT Creation on any chain
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button className="px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
