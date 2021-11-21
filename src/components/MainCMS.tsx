import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { PostsContext } from '../contexts/Posts';
import UserContext from '../contexts/user';
import useAuthFetch from '../hooks/useAuthFetch';
import useDefinedContext from '../hooks/useDefinedContext';
import type Post from '../utils/Post';
import { getUserPostsEndpoint } from '../utils/routeGetters';
import Editor from './Editor';
import Sidebar from './Sidebar';

export default function MainCMS() {
  const { path } = useRouteMatch();

  // Fetch posts & dispatch them to post reducer
  const [user] = useDefinedContext(UserContext);
  const { dispatch } = useDefinedContext(PostsContext);
  const { body, callFetch } = useAuthFetch(getUserPostsEndpoint(user));

  // fetch user posts on mount
  useEffect(() => {
    callFetch('GET');
  }, []);

  // update the posts when the response body is set
  useEffect(() => {
    if (typeof body === 'string') {
      return console.error('unauthorized response received', body);
    }

    const content = body?.content ?? [];

    if (!Array.isArray(content)) {
      return console.error(
        'Could not set Posts state because response body was not Array',
        body,
      );
    }

    dispatch({ type: 'set', posts: content as Post[] });
  }, [body]);

  return (
    <>
      <Sidebar />
      <Switch>
        <Route exact path={`${path}`}>
          <div>Select a post or add a new one!</div>
        </Route>
        <Route exact path={`${path}/:postid`}>
          <Editor />
        </Route>
      </Switch>
    </>
  );
}
