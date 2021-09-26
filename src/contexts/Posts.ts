import React, { Dispatch } from 'react';
import type Post from '../utils/Post';

function addPosts(posts: Post[], newPosts: Post[]): Post[] {
  return [...posts, ...newPosts]; // TODO: re-sort?
}
function setPosts(newPosts: Post[]): Post[] {
  return [...newPosts];
}
function updatePost(posts: Post[], id: string, updatedPost: Post): Post[] {
  return posts.map((post) => (post._id === id ? updatedPost : post));
}
function deletePost(posts: Post[], id: string): Post[] {
  return posts.filter((post) => post._id !== id);
}

type PostReducerAction =
  | { type: 'add'; posts: Post[] }
  | { type: 'set'; posts: Post[] }
  | { type: 'update'; id: string; post: Post }
  | { type: 'delete'; id: string };

type PostReducer = (state: Post[], action: PostReducerAction) => Post[];

export const postReducer: PostReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return addPosts(state, action.posts);
    case 'set':
      return setPosts(action.posts);
    case 'update':
      return updatePost(state, action.id, action.post);
    case 'delete':
      return deletePost(state, action.id);
    default:
      throw new Error(
        `Malformed action--unhandled action type ${
          (action as PostReducerAction).type
        }`,
      );
  }
};

// const [posts, postsDispatch] = useReducer(postReducer, defaultPosts);

export const PostsContext = React.createContext<{
  posts: Post[];
  dispatch: Dispatch<PostReducerAction>;
} | null>(null);
