import { SocialMediaType } from "./social-media.type";

export interface UserType {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
  socialMedias: SocialMediaType[];
}
