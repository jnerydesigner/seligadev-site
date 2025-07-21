import Image from "next/image";
import Link from "next/link";

export function LastPostBlog() {
  return (
    <>
      <h1 className="z-10">Last Post Blog</h1>
      <div className="h-32 p-4 z-10 mt-10 flex items-center halftone-blue">
        <Link href="#" className="flex-1 z-10 h-full flex items-center p-10 gap-4">
          <div className="h-20 z-10 bg-white">
            <Image
              src="/dedo.svg"
              alt="Imagem exemplo"
              className="w-full h-full object-contain p-2"
              width={300}
              height={300}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Título da Notícia</h2>
            <p className="text-sm line-clamp-2">
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
