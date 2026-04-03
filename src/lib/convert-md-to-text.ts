import { htmlToText } from "html-to-text";
import { marked } from "marked";

export const ConvertMdToText = async (content: string, limit = 150) => {
  const html = await marked(content);
  const pureText = htmlToText(html, {
    wordwrap: 100,
  });
  const normalizedText = pureText.replace(/\s+/g, " ").trim();

  if (normalizedText.length <= limit) {
    return normalizedText;
  }

  const truncatedText = normalizedText.slice(0, limit).trimEnd();
  const lastSpaceIndex = truncatedText.lastIndexOf(" ");
  const safeText =
    lastSpaceIndex > Math.floor(limit * 0.6)
      ? truncatedText.slice(0, lastSpaceIndex)
      : truncatedText;

  return safeText.replace(/[.\u2026,;:!?-]+$/g, "").trimEnd();
};
