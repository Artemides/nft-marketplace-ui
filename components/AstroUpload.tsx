import AstroUploadForm from "./AstroUploadForm";

const AstroUpload = () => {
  return (
    <div className="px-[120px] py-8">
      <div>
        <h1 className="font-bold text-5xl">Create your Astro NFT </h1>
        <p>
          Once your NFT is created you won’t be able to update or change any of
          this information.
        </p>
      </div>
      <AstroUploadForm />
    </div>
  );
};

export default AstroUpload;
