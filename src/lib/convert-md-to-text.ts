import { htmlToText } from "html-to-text";
import { marked } from "marked";

export const ConvertMdToText = async (content: string, limit = 150) => {
  const html = await marked(content);
  const pureText = htmlToText(html, {
    wordwrap: 100,
  });

  return pureText.slice(0, limit);
};
