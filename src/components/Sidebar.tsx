import React from 'react';
import { PostsContext } from '../contexts/Posts';
import useDefinedContext from '../hooks/useDefinedContext';
import '../styles/Sidebar.scss';
import type Post from '../utils/Post';
import type { PostPreview } from '../utils/Post';
import SidebarPostItem from './SidebarPostItem';

export default function Sidebar() {
  const { posts } = useDefinedContext(PostsContext);

  const [publishedPosts, drafts] = posts
    ? splitPostsByPublicationStatus(posts)
    : [[], []];

  return (
    <div className="Sidebar">
      <div className="SidebarSectionheader">Drafts</div>
      <ul>
        {drafts.map((post) => (
          <li key={post._id} style={{ borderBottom: '1px solid grey' }}>
            <SidebarPostItem post={post as Post} />
          </li>
        ))}
      </ul>
      <div className="SidebarSectionheader">Published</div>
      <ul>
        {publishedPosts.map((post) => (
          <li key={post._id} style={{ borderBottom: '1px solid grey' }}>
            <SidebarPostItem post={post as Post} />
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

function isPublished(post: PostPreview) {
  return new Date(post.publishDate) <= new Date();
}
