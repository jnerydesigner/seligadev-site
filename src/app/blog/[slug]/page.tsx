import React from "react";
import { PostContainer } from "@/components/post-container";
import { markdownContent } from "@/data/markdown-content";

export default function Page() {
  return (
    <PostContainer
      title="Título do Post do Blog"
      authorName="Jander Nery"
      avatar="https://github.com/jnerydesigner.png"
      content={markdownContent}
      noticeFontLink="https://linkedin.com/in/jander-nery"
      noticeFontTitle="Linkedin"
    />
  );
}
