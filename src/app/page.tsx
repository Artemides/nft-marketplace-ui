import Button from "@/components/Button";
import Image from "next/image";

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
            <Button
              text="Get Started"
              className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
