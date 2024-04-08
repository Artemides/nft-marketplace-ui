import { AstroUploadForm } from "@/components/AstroUploadForm";

export default function AstroMint() {
  return (
    <div className="px-[120px] py-8">
      <div>
        <h1 className="font-bold text-5xl">Create your Astro NFT </h1>
        <p className="text-neutral-300 my-2">
          Once your NFT is created you will not be able to update or change any of this <br />
          information.
        </p>
      </div>
      <AstroUploadForm />
    </div>
  );
}
