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
          p: ({ node, children, ...props }) => {
            const hasPreOrCode = node.children?.some(
              (child) =>
                child.type === "element" && (child.tagName === "pre" || child.tagName === "code")
            );

            if (hasPreOrCode) {
              return <>{children}</>;
            }

            return (
              <p className="mt-4 leading-7" {...props}>
                {children}
              </p>
            );
          },
          pre: ({ node, children, ...props }) => {
            return <pre {...props}>{children}</pre>;
          },
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            if (inline) {
              return (
                <code
                  className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
                  {...props}
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
