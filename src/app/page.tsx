import Hero from "@/components/hero";
import { LastPostBlog } from "@/components/last-post-blog";

export default function Home() {
  return (
    <div className="w-full h-[1000px]">
      <Hero />
      <LastPostBlog />
    </div>
  );
}
