import Hero from "@/components/hero";

import { Consult } from "@/components/consult";
import { CardHome } from "@/components/card-home";

export default function Home() {
  return (
    <div className="h-[1000px] w-full">
      <Hero />
      {/* <AdsBanner
        dataAdClient="ca-pub-1600331961556195"
        dataAdFormat="auto"
        dataFullWidthResponsive={true}
        dataAdSlot="6139750906"
      /> */}
      {/* <Consult /> */}
      <CardHome
        title="Consultoria Premium 🚀"
        description="A orientação certa para levar seu projeto ao próximo nível."
        link="/consult"
      />
      <CardHome
        title="🌏 Quer uma VPS para aumentar sua produtividade 🚀"
        description="Vem para Hostinger e seja feliz"
        link="/hostinger"
      />
    </div>
  );
}
