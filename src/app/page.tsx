import Hero from "@/components/hero";
import { LastPostBlog } from "@/components/last-post-blog";
import { Consult } from "@/components/consult";

export default function Home() {
  return (
    <div className="h-[1000px] w-full">
      <Hero />
      <Consult />
    </div>
  );
}
