import type { Nullable } from './Nullable';
import type { User } from './User';
import.meta.hot;

declare const __SNOWPACK_ENV__: {
  SNOWPACK_PUBLIC_API_URL: string;
};

export const { SNOWPACK_PUBLIC_API_URL } = __SNOWPACK_ENV__;

export const getLoginEndpoint = () =>
  `${SNOWPACK_PUBLIC_API_URL}/api/auth/login`;

export function getUserPostsEndpoint(user?: Nullable<User>) {
  return user
    ? `${SNOWPACK_PUBLIC_API_URL}/api/users/${user?._id}/blogs-all`
    : '';
}

export function getPostBlogAPIEndpoint(userId: string) {
  return `${SNOWPACK_PUBLIC_API_URL}/api/users/${userId}/blogs`;
}

export function getUpdateBlogAPIEndpoint(postId: string) {
  return `${SNOWPACK_PUBLIC_API_URL}/api/blogs/${postId}`;
}
