import { HostingerDataType } from "@/types/hostinger-data.type";
import TitleTop from "./title";

type HostingerPlansProps = {
  hostinger: HostingerDataType[];
  titleTop: string;
};

const formatCurrency = (value: number) =>
  `R$${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

export const HostingerPlans = ({ hostinger, titleTop }: HostingerPlansProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-8">
      <TitleTop titleStr={titleTop} notH1 className="w-full text-center md:text-[1.4rem]" />

      <div className="flex w-full flex-col items-center gap-5">
        {hostinger.map((plan) => (
          <div
            key={plan.id}
            className="flex w-full max-w-5xl flex-col justify-between overflow-hidden rounded-3xl border border-purple-100/80 bg-gradient-to-br from-white via-gray-50 to-purple-50/60 shadow-lg transition-shadow hover:shadow-purple-300"
          >
            <div className="border-b border-purple-100 bg-white/90 px-5 py-4">
              <div className="mb-1 text-[0.7rem] font-semibold tracking-[0.22em] text-purple-400 uppercase">
                Plano Hostinger
              </div>
              <h2 className="font-bangers text-3xl tracking-[0.06em] text-purple-700 md:text-4xl">
                {plan.title}
              </h2>
            </div>

            <div className="grid gap-4 px-4 py-5 sm:px-5 md:grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
              <div className="flex flex-col gap-3">
                <div className="rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-sm">
                  <div className="flex flex-col items-start gap-1.5">
                    <span className="text-xs font-semibold tracking-[0.18em] text-purple-400 uppercase">
                      Preco promocional
                    </span>
                    <span className="font-bangers rounded-2xl bg-emerald-50 px-4 py-2 text-left text-[2rem] tracking-[0.04em] text-green-700 shadow-sm">
                      {formatCurrency(plan.price)}
                    </span>
                    <div className="font-bangers text-lg tracking-[0.04em] text-red-600">
                      Preco original {formatCurrency(plan.priceOriginalTotal)}
                    </div>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm leading-6 text-slate-700">
                  {plan.hostingerDescription.map((desc) => (
                    <li key={desc.id} className="flex items-start gap-2">
                      <span className="mt-0.5 text-green-600">✓</span>
                      <span>{desc.line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-bangers mb-5 text-3xl tracking-[0.05em] text-slate-900">
                  Resumo do pedido
                </h3>
                <div className="font-bangers mb-5 text-2xl tracking-[0.04em] text-slate-900">
                  {plan.title}
                </div>

                <div className="space-y-3 text-sm leading-6 text-slate-700">
                  {plan.hostingerDiscountDdescription.map((discount) => (
                    <div key={discount.id} className="flex items-center justify-between gap-4">
                      <span>{discount.line}</span>
                      <span className="font-bangers text-lg tracking-[0.04em] text-slate-900">
                        Aplicado
                      </span>
                    </div>
                  ))}
                </div>

                <div className="my-5 border-t border-slate-200" />

                <div className="flex items-end justify-between gap-4">
                  <span className="font-bangers text-4xl tracking-[0.05em] text-slate-900">
                    Total
                  </span>
                  <div className="text-right">
                    <div className="text-sm text-slate-400 line-through">
                      {formatCurrency(plan.priceOriginalTotal)}
                    </div>
                    <div className="font-bangers text-5xl leading-none tracking-[0.04em] text-slate-900">
                      {formatCurrency(plan.price)}
                    </div>
                  </div>
                </div>

                <div className="mt-5 text-sm font-semibold text-purple-700">
                  Oferta promocional aplicada automaticamente
                </div>
              </div>
            </div>

            <a
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bangers mx-4 mt-4 mb-5 inline-flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-3 text-center text-lg tracking-[0.06em] text-white shadow-md transition hover:from-purple-700 hover:to-fuchsia-700 sm:mx-5 sm:text-xl md:px-6"
            >
              Garantir oferta agora por {formatCurrency(plan.price)}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
