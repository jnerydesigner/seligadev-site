import Image from "next/image";

export const showIcon = (socialName: string) => {
  switch (socialName) {
    case "github": {
      return (
        <Image
          src="/github.svg"
          alt="icon social media github"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      );
    }
    case "linkedin": {
      return (
        <Image
          src="/linkedin.svg"
          alt="icon social media linkedin"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      );
    }
    case "youtube": {
      return (
        <Image
          src="/youtube.svg"
          alt="icon social media youtube"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      );
    }
    case "instagram": {
      return (
        <Image
          src="/instagram.svg"
          alt="icon social media instagram"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      );
    }
    case "facebook": {
      return (
        <Image
          src="/facebook.svg"
          alt="icon social media facebook"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      );
    }
    case "x": {
      return (
        <Image
          src="/icon-x.svg"
          alt="icon social media X"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      );
    }
    default: {
      return null;
    }
  }
};
