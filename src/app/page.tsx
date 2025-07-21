import Hero from "@/components/hero";
import { LastPostBlog } from "@/components/last-post-blog";
import { Consult } from "@/components/consult";
import { AdsBanner } from "@/components/adsbanner";

export default function Home() {
  return (
    <div className="h-[1000px] w-full">
      <Hero />
      <AdsBanner
        dataAdClient="ca-pub-1600331961556195"
        dataAdFormat="auto"
        dataFullWidthResponsive={true}
        dataAdSlot="6139750906"
      />
      <Consult />
    </div>
  );
}
