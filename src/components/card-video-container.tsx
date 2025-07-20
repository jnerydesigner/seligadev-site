
import { Videos } from "@prisma/client";
import { CardVideo, VideoProps } from "./card-video";

interface CardVideoContainerProps {
  cardVideos: Videos[];
}

export const CardVideosContainer = ({ cardVideos }: CardVideoContainerProps) => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cardVideos?.map((video) => (
          <CardVideo title={video.title} thumb={video.thumb} url={video.url} key={video.id} />
        ))}
      </div>
    </section>
  );
};
