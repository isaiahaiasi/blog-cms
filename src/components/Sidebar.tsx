import React, { useContext, useEffect, useState } from 'react';
import type { PostPreview } from '../utils/Post';
import UserContext from '../contexts/user';
import '../styles/Sidebar.scss';
import useAuthFetch from '../hooks/useAuthFetch';
import type { User } from '../utils/User';
import type { Nullable } from '../utils/Nullable';

// TODO: move to separate routes file
function getUserPostsEndpoint(user?: Nullable<User>) {
  return user ? `http://localhost:3000/api/users/${user?._id}/blogs-all` : '';
}

export default function Sidebar() {
  const [user] = useContext(UserContext) ?? [];

  const [posts, setPosts] = useState<PostPreview[] | null>(null);

  const [publishedPosts, drafts] = posts
    ? splitPostsByPublicationStatus(posts)
    : [[], []];

  // Fetch User's blogpost top-level content, and split into "Published" & "unpublished"
  const blogPreviewsEndpoint = getUserPostsEndpoint(user);
  const { response, isError, isLoading, callFetch } =
    useAuthFetch(blogPreviewsEndpoint);

  useEffect(() => {
    callFetch();
  }, []);

  useEffect(() => {
    async function updatePosts() {
      // response cannot be null, because I'm checking below
      const resPosts = await (response as Response).json();

      console.log(resPosts);

      // if response isn't an array, then something went wrong and don't need to update posts
      if (!Array.isArray(resPosts)) {
        return;
      }

      setPosts(resPosts);
    }

    if (response) {
      updatePosts();
    }
  }, [response]);

  // TODO: create "SidebarPostList" component to reuse for published posts & drafts
  return (
    <div className="Sidebar">
      <div className="SidebarSectionheader">Drafts</div>
      <ul>
        {drafts.map((post) => (
          <li key={post._id} style={{ borderBottom: '1px solid grey' }}>
            {post.title}
          </li>
        ))}
      </ul>
      <div className="SidebarSectionheader">Published</div>
      <ul>
        {publishedPosts.map((post) => (
          <li key={post._id} style={{ borderBottom: '1px solid grey' }}>
            {post.title} - {post.publishDate}
          </li>
        ))}
      </ul>
    </div>
  );
}

function splitPostsByPublicationStatus(posts: PostPreview[]) {
  // typings that are too ugly to inline
  type SplitPostsCollection = [PostPreview[], PostPreview[]];

  type PostReducer = (
    acc: SplitPostsCollection,
    post: PostPreview,
  ) => SplitPostsCollection;

  // nice split-up logic
  const postReducer: PostReducer = (acc, post) => {
    const [publishedPosts, drafts] = acc;

    return isPublished(post)
      ? [[...publishedPosts, post], drafts]
      : [publishedPosts, [...drafts, post]];
  };

  return posts.reduce<SplitPostsCollection>(postReducer, [[], []]);
}

// TODO: implement test to see if post has been published yet based on publishDate
function isPublished(post: PostPreview) {
  return new Date(post.publishDate) <= new Date();
}
