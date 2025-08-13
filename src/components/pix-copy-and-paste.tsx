"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export const PixCopyAndPaste = () => {
  const [copied, setCopied] = useState(false);

  const textToCopy =
    "00020126990014BR.GOV.BCB.PIX0136aedfa8da-bea0-4652-89eb-2d600dd43de20237Muito obrigado por contribuir com nos5204000053039865802BR5920JANDER DA COSTA NERY6006MANAUS62120508PixCanal6304B9D5";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Erro ao copiar texto:", err);
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="mx-auto w-full rounded-lg bg-white px-4 py-2 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Código PIX</h2>

      <div className="mb-2">
        <div
          onClick={copyToClipboard}
          className="relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-8 py-2 transition-all duration-200 hover:border-gray-400 hover:bg-gray-100"
        >
          <p className="line-clamp-3 font-mono text-sm break-all text-gray-700">{textToCopy}</p>

          <div className="absolute top-2 right-2">
            {copied ? (
              <Check className="h-5 w-5 text-green-600" />
            ) : (
              <Copy className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>

        <p className="mt-2 text-center text-xs text-gray-500">Clique no código acima para copiar</p>
      </div>

      {/* Feedback visual quando copiado */}
      {copied && (
        <div className="mb-2 rounded-lg border border-green-200 bg-green-50 p-3">
          <p className="text-center text-sm font-medium text-green-700">
            ✅ Código copiado para a área de transferência!
          </p>
        </div>
      )}

      <button
        onClick={copyToClipboard}
        className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-all duration-200 ${
          copied ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copiar Código PIX
          </>
        )}
      </button>
    </div>
  );
};
