import { auth } from "@/utils/auth";

const Gallery = async () => {
  const { user } = await auth();

  return <main></main>;
};

export default Gallery;
