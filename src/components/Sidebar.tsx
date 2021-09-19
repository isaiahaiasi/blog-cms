import React, { useContext, useState } from 'react';
import type { PostPreview } from '../utils/Post';
import UserContext from '../contexts/user';
import '../styles/Sidebar.scss';

export default function Sidebar() {
  const [user] = useContext(UserContext) ?? [];

  const [posts, setPosts] = useState<PostPreview[] | null>(null);

  const [publishedPosts, drafts] = posts
    ? splitPostsByPublicationStatus(posts)
    : [[], []];

  // Fetch User's blogpost top-level content, and split into "Published" & "unpublished"

  return (
    <div className="Sidebar">
      <div className="SidebarSectionheader">Drafts</div>
      <ul>
        {['My draft', 'Second draft', 'yet another draft', 'sorry'].map(
          (p, i) => (
            <li key={i}>
              {i + 1} - {p}
            </li>
          ),
        )}
      </ul>
      <div className="SidebarSectionheader">Published</div>
      <ul>
        {new Array(35).fill('Post').map((p, i) => (
          <li key={i}>
            {i + 1} - {p + ' ' + i}
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
  return true;
}
