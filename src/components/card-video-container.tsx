import { ShortType } from "@/types/shorts.type";
import { CardVideo, VideoProps } from "./card-video";
import { CardShorts } from "./card-shorts";

interface CardVideoContainerProps {
  cardVideos: VideoProps[];
  cardShorts: ShortType[];
  shorts: boolean;
}
export const CardVideosContainer = ({
  cardVideos,
  shorts,
  cardShorts,
}: CardVideoContainerProps) => {
  const itemsToRender = shorts ? cardShorts : cardVideos;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {itemsToRender?.map((item) =>
          shorts ? (
            <CardShorts title={item.title} thumb={item.thumb} url={item.url} key={item.url} />
          ) : (
            <CardVideo title={item.title} thumb={item.thumb} url={item.url} key={item.url} />
          )
        )}
      </div>
    </section>
  );
};
