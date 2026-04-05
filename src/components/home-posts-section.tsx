import { PostHomeDirectusTypeData } from "@/types/post-directus.type";
import { HomeFeaturedPostCard } from "./home-featured-post-card";
import { HomePostMiniCard } from "./home-post-mini-card";

interface HomePostPreview {
  id: number | string;
  title: string;
  slug: string;
  content: string;
  banner?: string | null;
  imageUrl?: string | null;
  dateCreated?: string;
}

interface HomePostsSectionProps {
  featuredPost: HomePostPreview | PostHomeDirectusTypeData | null;
  recentPosts: HomePostPreview[];
  postsHome: PostHomeDirectusTypeData[];
}

export function HomePostsSection({ featuredPost, recentPosts, postsHome }: HomePostsSectionProps) {
  const cards = postsHome.length > 0 ? postsHome : recentPosts;
  const featuredCard = featuredPost ?? cards[0] ?? null;
  const gridCards = postsHome.length > 0 ? postsHome.slice(1, 5) : recentPosts.slice(0, 4);

  if (!featuredCard && gridCards.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 w-full">
      <div className="grid w-full grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-4">
          {featuredCard && <HomeFeaturedPostCard {...featuredCard} />}
        </div>
        <div className="col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
          {gridCards.map((post) => (
            <HomePostMiniCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}
