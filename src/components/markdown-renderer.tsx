import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
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
            <h1
              className="tracking-h1 mt-12 scroll-m-20 text-4xl font-bold first:mt-0"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="tracking-h2 mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold text-amber-300 first:mt-0"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="tracking-h2 mt-8 scroll-m-20 text-2xl font-semibold first:mt-0"
              {...props}
            />
          ),
          h4: ({ node, ...props }) => (
            <h4
              className="tracking-h2 mt-6 scroll-m-20 text-xl font-semibold first:mt-0"
              {...props}
            />
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
          ol: ({ node, ...props }) => (
            <ol className="my-4 ml-6 list-decimal [&>li]:mt-2" {...props} />
          ),
          li: ({ children, ...props }) => {
            // Detecta se o primeiro filho é um input checkbox
            const firstChild = Array.isArray(children) ? children[0] : null;
            if (
              firstChild &&
              typeof firstChild === "object" &&
              "type" in firstChild &&
              firstChild.type === "input" &&
              firstChild.props?.type === "checkbox"
            ) {
              return (
                <li className="mb-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!firstChild.props.checked}
                    readOnly
                    className="h-4 w-4 rounded border-gray-300 accent-amber-400"
                  />
                  <span className={firstChild.props.checked ? "text-gray-400 line-through" : ""}>
                    {Array.isArray(children) ? children.slice(1) : null}
                  </span>
                </li>
              );
            }
            return <li {...props}>{children}</li>;
          },
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="mt-6 border-l-4 border-gray-300 pl-4 text-gray-700 italic"
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
              return (
                <SyntaxHighlighter PreTag="div" language={match[1]} style={oneDark}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            }
            return (
              <code
                className="rounded bg-gray-200 px-1 py-0.5 font-mono text-sm text-gray-800"
                {...props}
              >
                {children}
              </code>
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
