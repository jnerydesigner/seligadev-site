import prisma from "@/lib/prisma";
import TitleTop from "./title";

export type Plan = {
  id: number;
  title: string;
  priceOriginalTotal: string;
  discountOne: string;
  discountOneValue: string;
  referralDiscount: string;
  referralDiscountValue: string;
  price: string;
  description: { line: string }[];
  discountDescription: string;
  priceAndDiscount: string;
  discountSubDescription: { line: string }[];
  link: string;
};

function parseDescription(desc: unknown): { line: string }[] {
  if (typeof desc === "string") {
    try {
      return JSON.parse(desc);
    } catch {
      return [];
    }
  }
  if (Array.isArray(desc)) {
    return desc as { line: string }[];
  }
  return [];
}

export const HostingerPlans = async () => {
  const hostinger = await prisma.hostinger.findMany();

  return (
    <>
      <TitleTop
        titleStr="Adquira os planos da Hostinger e ajude o Canal a Crescer 🚀"
        notH1
        className="md:text-[1.4rem]"
      />

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        {hostinger.map((plan) => (
          <div
            key={plan.id}
            className="flex flex-col justify-between rounded-2xl border border-purple-100 bg-gray-50 p-6 shadow-lg transition-shadow hover:shadow-purple-400"
          >
            <div>
              <h2 className="mb-4 text-xl font-semibold text-purple-500">{plan.title}</h2>
              <span className="mb-4 block rounded-sm p-2 text-center text-[1.6rem] font-semibold text-green-600 shadow-sm">
                R${" "}
                {Number(plan.price).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <ul className="mb-4 space-y-2 text-sm text-gray-600">
                {parseDescription(plan.description).map((desc, idx) => (
                  <li key={idx}>✅ {desc.line}</li>
                ))}
              </ul>
              <div
                className="mb-2 text-sm text-gray-500"
                dangerouslySetInnerHTML={{ __html: plan.discountDescription }}
              />
              <div className="mb-2 text-[0.8rem] font-semibold text-red-600">
                Preço Original R${" "}
                {Number(plan.priceOriginalTotal).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </div>
              <div className="mb-2 text-lg font-semibold text-green-600">
                Preço com desconto R${" "}
                {Number(plan.price).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </div>
              {parseDescription(plan.discountSubDescription).map(
                (d: { line: string }, i: number) => (
                  <div key={i} className="text-[1.2rem] text-red-500">
                    {d.line}
                  </div>
                )
              )}
            </div>
            <a
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-xl bg-purple-600 px-4 py-2 text-center font-medium text-white transition hover:bg-purple-700"
            >
              Abrir Link com Preço em desconto de{" "}
              {Number(plan.price).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </a>
          </div>
        ))}
      </div>
    </>
  );
};
