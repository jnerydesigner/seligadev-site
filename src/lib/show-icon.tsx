import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const showIcon = (socialName: string) => {
  switch (socialName) {
    case "github": {
      return (
        <Image
          src="/github.svg"
          alt="icon social media linkedin"
          width={300}
          height={300}
          className="h-[20px] w-[20px]"
        />
      );
    }
    case "linkedin": {
      return (
        <Image
          src="/linkedin.svg"
          alt="icon social media linkedin"
          width={300}
          height={300}
          className="h-[20px] w-[20px]"
        />
      );
    }
    case "x": {
      return (
        <Image
          src="/icon-x.svg"
          alt="icon social media X"
          width={300}
          height={300}
          className="h-[20px] w-[20px]"
        />
      );
    }
  }
};
