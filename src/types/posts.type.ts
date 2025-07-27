import { UserType } from "./users.type";

export interface PostType {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  newsSource: string;
  newsSourceUrl: string;
  userId: string;
  user: UserType;
}
