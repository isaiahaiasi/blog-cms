export default interface Post {
  publishDate: Date; // ?
  title: string;
  content: string;
  author: string;
  _id: string;
}

export type PostPreview = Omit<Post, 'content'>;
