import { SocialMedia, Post, User } from "@prisma/client";
import { PostType } from "../posts.type";

type ExtendedUser = User & {
  socialMedias?: SocialMedia[];
};

export class PostMapper {
  static toResponse(
    post: Post & {
      user?: ExtendedUser | null;
      User?: ExtendedUser | null;
    }
  ): PostType {
    const user = post.user ?? post.User;

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      imageUrl: post.imageUrl ?? "",
      newsSource: post.newsSource,
      newsSourceUrl: post.newsSourceUrl,
      userId: post.userId ?? "",
      user: user
        ? {
            id: user.id,
            name: user.name,
            email: user.email,
            avatarUrl: user.avatarUrl,
            createdAt: user.createdAt,
            socialMedias:
              user.socialMedias?.map((sm) => ({
                id: sm.id,
                name: sm.name,
                slug: sm.slug,
                url: sm.url,
                userId: sm.userId,
              })) ?? [],
          }
        : {
            id: "",
            name: "",
            email: "",
            avatarUrl: "",
            createdAt: new Date(),
            socialMedias: [],
          },
    };
  }
}
