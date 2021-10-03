import type { Nullable } from './Nullable';
import type { User } from './User';

export function getUserPostsEndpoint(user?: Nullable<User>) {
  return user ? `http://localhost:3000/api/users/${user?._id}/blogs-all` : '';
}

export function getPostBlogAPIEndpoint(userId: string) {
  return `http://localhost:3000/api/users/${userId}/blogs`;
}

export function getUpdateBlogAPIEndpoint(postId: string) {
  return `http://localhost:3000/api/blogs/${postId}`;
}
