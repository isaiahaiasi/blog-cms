import React, { useEffect } from 'react';
import { PostsContext } from '../contexts/Posts';
import UserContext from '../contexts/user';
import useAuthFetch from '../hooks/useAuthFetch';
import useDefinedContext from '../hooks/useDefinedContext';
import type Post from '../utils/Post';
import { getUserPostsEndpoint } from '../utils/routeGetters';
import Editor from './Editor';
import Sidebar from './Sidebar';

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
