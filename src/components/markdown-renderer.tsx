/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
          h1: ({ node, children, ...props }) => (
            <h1 className="mt-8 mb-4 text-4xl font-bold" {...props}>
              {children}
            </h1>
          ),
          h2: ({ node, children, ...props }) => (
            <h2 className="mt-6 mb-3 text-2xl font-semibold" {...props}>
              {children}
            </h2>
          ),
          h3: ({ node, children, ...props }) => (
            <h3 className="mt-4 mb-2 text-xl font-medium" {...props}>
              {children}
            </h3>
          ),
          h4: ({ node, children, ...props }) => (
            <h4 className="mt-4 mb-2 text-[0.8rem] font-medium" {...props}>
              {children}
            </h4>
          ),

          p: ({ node, children, ...props }) => {
            const hasPreOrCode =
              node?.children &&
              Array.isArray(node.children) &&
              node.children.some(
                (child) =>
                  child.type === "element" && (child.tagName === "pre" || child.tagName === "code")
              );

            if (hasPreOrCode) return <>{children}</>;

            return (
              <p className="mt-4 leading-7" {...props}>
                {children}
              </p>
            );
          },
          pre: ({ node, children, ...props }) => {
            return <pre {...props}>{children}</pre>;
          },
          code: (props) => {
            const { node, inline, className, children, ...rest } = props as any;
            const match = /language-(\w+)/.exec(className || "");
            if (inline) {
              return (
                <code
                  className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
                  {...rest}
                >
                  {children}
                </code>
              );
            }
            return (
              <SyntaxHighlighter
                language={match?.[1] || "plaintext"}
                style={dracula}
                customStyle={{
                  margin: "1.5rem 0",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                  overflowX: "auto",
                  border: "1px solid #374151",
                  background: "#1e293b",
                }}
                wrapLongLines
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
