import { CardBlog } from "@/components/card-blog";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PageBlog() {
  return (
    <section className="w-full h-auto flex justify-center items-center flex-col p-4">
      <div className="h1-rectangle-path">
        <h1 className="z-10 text-[1.8rem]">Blog</h1>
      </div>
      <CardBlog />
      <CardBlog />
      <CardBlog />
      <CardBlog />
      <CardBlog />
      <CardBlog />
    </section>
  );
}
