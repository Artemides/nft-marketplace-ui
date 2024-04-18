import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

const Gallery = async () => {
  const { user } = await auth();
  if (!user) redirect("/");

  return <main></main>;
};

export default Gallery;
