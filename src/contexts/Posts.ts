import React, { useReducer } from 'react';
import type Post from 'src/utils/Post';

// TODO: IMPLEMENT
function addPost(posts: Post[], post: Post): Post[] {
  return posts;
}
function updatePost(posts: Post[], id: string, post: Post): Post[] {
  return posts;
}
function deletePost(posts: Post[], id: string): Post[] {
  return posts;
}

type PostReducerAction =
  | { type: 'add'; post: Post }
  | { type: 'update'; id: string; post: Post }
  | { type: 'delete'; id: string };

type PostReducer = (state: Post[], action: PostReducerAction) => Post[];

export const postReducer: PostReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return addPost(state, action.post);
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
  dispatch: PostReducer;
} | null>(null);
