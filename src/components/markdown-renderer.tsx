/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import type { ReactElement } from "react";
import type { ComponentProps } from "react";
import Image from "next/image";

interface MarkdownRendererProps {
  markdown: string;
  className?: string;
}

export function MarkdownRenderer({ markdown, className }: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="mt-12 scroll-m-20 text-2xl font-bold first:mt-0" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="mt-10 scroll-m-20 border-b pb-2 text-xl font-semibold text-gray-600 first:mt-0"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold first:mt-0" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="mt-6 scroll-m-20 text-xl font-semibold first:mt-0" {...props} />
          ),
          p: ({ node, ...props }) => <p className="mt-4 leading-7" {...props} />,
          a: ({ node, ...props }) => (
            <a
              className="font-medium text-blue-600 underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => <ul className="my-4 ml-6 list-disc [&>li]:mt-2" {...props} />,
          ol: ({ children, ...props }) => (
            <ol className="list-decimal space-y-1 pl-6" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => {
            const firstChild = Array.isArray(children) ? children[0] : null;

            const isCheckbox =
              firstChild &&
              typeof firstChild === "object" &&
              "type" in firstChild &&
              firstChild.type === "input" &&
              firstChild.props?.type === "checkbox";

            if (isCheckbox) {
              return (
                <li className="mb-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!firstChild.props.checked}
                    readOnly
                    className="h-4 w-4 rounded border-gray-300 accent-amber-400"
                  />
                  <span className={firstChild.props.checked ? "text-gray-400 line-through" : ""}>
                    {Array.isArray(children)
                      ? children.slice(1).map((child, idx) => <span key={idx}>{child}</span>)
                      : null}
                  </span>
                </li>
              );
            }

            return (
              <li className="mb-2 list-item list-inside">
                {Array.isArray(children)
                  ? children.map((child, idx) => <span key={idx}>{child}</span>)
                  : children}
              </li>
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="mt-6 border-l-4 border-gray-300 bg-gray-100 px-2 py-4 pl-4 text-gray-700 italic"
              {...props}
            />
          ),
          code: ({
            inline,
            className,
            children,
            ...props
          }: ComponentProps<"code"> & { inline?: boolean }) => {
            const match = /language-(\w+)/.exec(className || "");

            if (!inline && match) {
              // Este é um bloco de código com linguagem especificada
              // Retorna null para deixar o componente pre lidar com isso
              return null;
            }

            if (!inline) {
              // Bloco de código simples sem linguagem
              return (
                <code
                  className="my-6 block overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            // Código inline
            return (
              <code
                className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ node, children, ...props }) => {
            const codeElement = Array.isArray(children)
              ? children.find(
                  (child: any) =>
                    child?.type === "code" && child?.props?.className?.includes("language-")
                )
              : null;

            if (codeElement) {
              const match = /language-(\w+)/.exec(codeElement.props.className || "");
              const code = String(codeElement.props.children).trim();

              return (
                <SyntaxHighlighter
                  language={match?.[1] || "plaintext"}
                  style={dracula}
                  customStyle={{
                    margin: "1.5rem 0",
                    padding: "1rem",
                    background: "#1e293b",
                    fontSize: "0.875rem",
                    lineHeight: "1.5",
                    borderRadius: "0.5rem",
                    border: "1px solid #374151",
                  }}
                  wrapLongLines={true}
                >
                  {code}
                </SyntaxHighlighter>
              );
            }

            // Pre normal sem syntax highlighting
            return (
              <pre
                className="my-6 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-zinc-100"
                {...props}
              />
            );
          },
          table: ({ node, ...props }) => (
            <div className="my-6 w-full overflow-x-auto">
              <table className="w-full table-auto border-collapse text-sm" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border-b border-gray-200 px-3 py-2" {...props} />
          ),
          hr: ({ node, ...props }) => <hr className="my-8 border-gray-300" {...props} />,
          img: ({ node, ...props }) => (
            <Image
              className="my-4 max-h-96 w-auto rounded-md border object-contain"
              src={props.src as string}
              alt={props.alt ?? ""}
              width={600}
              height={400}
              style={{ height: "auto", width: "auto" }}
            />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
