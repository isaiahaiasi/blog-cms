import React, { useEffect } from 'react';
import { PostsContext } from '../contexts/Posts';
import UserContext from '../contexts/user';
import useAuthFetch from '../hooks/useAuthFetch';
import useDefinedContext from '../hooks/useDefinedContext';
import type { Nullable } from '../utils/Nullable';
import type Post from '../utils/Post';
import type { User } from '../utils/User';
import Editor from './Editor';
import Sidebar from './Sidebar';

// TODO: move to separate routes file
function getUserPostsEndpoint(user?: Nullable<User>) {
  return user ? `http://localhost:3000/api/users/${user?._id}/blogs-all` : '';
}

export default function MainCMS() {
  // Fetch posts & dispatch them to post reducer
  const [user] = useDefinedContext(UserContext);
  const { dispatch } = useDefinedContext(PostsContext);
  const { body, isError, isLoading, callFetch } = useAuthFetch(
    getUserPostsEndpoint(user),
  );

  useEffect(() => {
    callFetch();
  }, []);

  useEffect(() => {
    console.log('useEffect sidebar...');
    if (!Array.isArray(body)) {
      console.log(
        'Could not set Posts state because response body was not Array',
      );
      return;
    }

    dispatch({ type: 'set', posts: body as Post[] });
  }, [body]);

  return (
    <>
      <Sidebar />
      <Editor />
    </>
  );
}
