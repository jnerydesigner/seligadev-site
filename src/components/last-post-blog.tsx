import Link from "next/link";

export function LastPostBlog() {
  return (
    <>
      <h1 className="z-10">Last Post Blog</h1>
      <div className="halftone-blue z-10 mt-10 flex h-32 items-center p-4">
        <Link href="#" className="z-10 flex h-full flex-1 items-center gap-4 p-10">
          <div className="flex-1">
            <h2 className="text-xl font-bold">Título da Notícia</h2>
            <p className="line-clamp-2 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt doloremque sint quam
              beatae tenetur eum porro ipsa, molestiae illum itaque et odit? Nisi libero deserunt,
              rerum tempore nostrum numquam adipisci?
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
