import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
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
  const { body, isError, isLoading, callFetch } = useAuthFetch(
    getUserPostsEndpoint(user),
  );

  // fetch user posts on mount
  useEffect(() => {
    callFetch();
  }, []);

  // update the posts when the response body is set
  useEffect(() => {
    console.log('useEffect MainCMS...');
    if (!Array.isArray(body)) {
      console.log(
        'Could not set Posts state because response body was not Array',
        body,
      );
      return;
    }

    dispatch({ type: 'set', posts: body as Post[] });
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
