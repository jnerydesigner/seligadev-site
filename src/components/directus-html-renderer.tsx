"use client";

import { Fragment, useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface DirectusHtmlRendererProps {
  html: string;
  className?: string;
}

type ContentSegment =
  | { type: "html"; value: string }
  | { type: "code"; value: string; language: string };

const decodeHtmlEntities = (value: string): string => {
  const entities: Record<string, string> = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&ldquo;": '"',
    "&rdquo;": '"',
    "&lsquo;": "'",
    "&rsquo;": "'",
    "&hellip;": "...",
    "&mdash;": "—",
    "&ndash;": "–",
    "&eacute;": "é",
    "&ecirc;": "ê",
    "&ccedil;": "ç",
    "&atilde;": "ã",
    "&otilde;": "õ",
    "&aacute;": "á",
    "&iacute;": "í",
    "&uacute;": "ú",
    "&oacute;": "ó",
    "&agrave;": "à",
  };

  return value.replace(/&[#\w]+;/g, (match) => {
    if (entities[match]) return entities[match];
    if (/^&#\d+$/.test(match)) {
      return String.fromCharCode(Number(match.slice(2, -1)));
    }
    return match;
  });
};

const inferCodeLanguage = (code: string) => {
  if (
    code.includes("public class") ||
    code.includes("private ") ||
    code.includes("protected ") ||
    code.includes("@RestController") ||
    code.includes("@Controller") ||
    code.includes("@Service") ||
    code.includes("@Repository") ||
    code.includes("@GetMapping") ||
    code.includes("@PostMapping") ||
    code.includes("@RequestMapping") ||
    code.includes("ResponseEntity") ||
    code.includes("SpringApplication.run")
  ) {
    return "java";
  }

  if (
    code.includes("const ") ||
    code.includes("req.query") ||
    code.includes("@Get()") ||
    code.includes("async ")
  ) {
    return "typescript";
  }

  if (code.includes("npm ") || code.includes("yarn ") || code.includes("pnpm ")) {
    return "bash";
  }

  if (code.trim().startsWith("GET /") || code.trim().startsWith("POST /")) {
    return "http";
  }

  if (code.includes("{") && code.includes("}") && code.includes(":")) {
    return "json";
  }

  return "plaintext";
};

const restoreCodeIndentation = (code: string, language: string) => {
  if (!["typescript", "javascript", "json", "java"].includes(language)) {
    return code;
  }

  const lines = code.split("\n");
  let indentLevel = 0;

  return lines
    .map((rawLine) => {
      const line = rawLine.trim();

      if (!line) {
        return "";
      }

      if (/^[}\])]/.test(line)) {
        indentLevel = Math.max(indentLevel - 1, 0);
      }

      const formattedLine = `${"  ".repeat(indentLevel)}${line}`;

      const openCount = (line.match(/[{\[]/g) || []).length;
      const closeCount = (line.match(/[}\]]/g) || []).length;
      const delta = openCount - closeCount;

      if (delta > 0) {
        indentLevel += delta;
      } else if (delta < 0 && !/^[}\])]/.test(line)) {
        indentLevel = Math.max(indentLevel + delta, 0);
      }

      return formattedLine;
    })
    .join("\n");
};

const transformDirectusHtml = (html: string) => {
  return html
    .replace(
      /<div id="code-block-viewer"[\s\S]*?<div class="cm-content[^"]*">([\s\S]*?)<\/div>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g,
      (_, codeContent: string) => {
        const normalizedCode = decodeHtmlEntities(
          codeContent
            .replace(/<br\s*\/?>/g, "\n")
            .replace(/<\/span>/g, "")
            .replace(/<span[^>]*>/g, "")
        );

        return `<pre><code>${normalizedCode}</code></pre>`;
      }
    )
    .replace(/\sclass="[^"]*"/g, "")
    .replace(/\sdata-[^=]+="[^"]*"/g, "")
    .replace(/<div>\s*&nbsp;\s*<\/div>/g, "")
    .replace(/<div>\s*<\/div>/g, "");
};

const splitContentSegments = (html: string): ContentSegment[] => {
  const segments: ContentSegment[] = [];
  const codeBlockRegex = /<pre><code(?: class="([^"]*)")?>([\s\S]*?)<\/code><\/pre>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(html)) !== null) {
    const [fullMatch, className, code] = match;
    const matchStart = match.index;

    if (matchStart > lastIndex) {
      segments.push({
        type: "html",
        value: html.slice(lastIndex, matchStart),
      });
    }

    const codeValue = decodeHtmlEntities(code).trimEnd();
    const languageMatch = /language-(\w+)/.exec(className || "");
    const language = languageMatch?.[1] || inferCodeLanguage(codeValue);

    segments.push({
      type: "code",
      value: restoreCodeIndentation(codeValue, language),
      language,
    });

    lastIndex = matchStart + fullMatch.length;
  }

  if (lastIndex < html.length) {
    segments.push({
      type: "html",
      value: html.slice(lastIndex),
    });
  }

  return segments.filter((segment) => segment.value.trim() !== "");
};

export function DirectusHtmlRenderer({ html, className }: DirectusHtmlRendererProps) {
  const processedHtml = transformDirectusHtml(html);
  const segments = splitContentSegments(processedHtml);

  return (
    <div className={`chatgpt-html ${className ?? ""}`.trim()}>
      {segments.map((segment, index) => {
        if (segment.type === "code") {
          return (
            <SyntaxHighlighter
              key={`code-${index}`}
              language={segment.language}
              style={dracula}
              showLineNumbers
              customStyle={{
                margin: "1.25rem 0",
                padding: "1rem 0",
                borderRadius: "var(--code-radius)",
                fontSize: "0.875rem",
                lineHeight: "1.6",
                overflowX: "auto",
                background: "var(--chatgpt-code-bg)",
                fontFamily: '"Fira Code", "JetBrains Mono", monospace',
              }}
              codeTagProps={{
                style: {
                  fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                },
              }}
              lineNumberStyle={{
                minWidth: "3rem",
                padding: "0 1rem 0 0",
                marginRight: "1rem",
                color: "#71717a",
                textAlign: "right",
                borderRight: "1px solid rgba(255,255,255,0.08)",
                userSelect: "none",
              }}
              wrapLongLines={false}
            >
              {segment.value}
            </SyntaxHighlighter>
          );
        }

        return (
          <div
            key={`html-${index}`}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: segment.value }}
          />
        );
      })}
    </div>
  );
}
