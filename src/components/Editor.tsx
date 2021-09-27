import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PostsContext } from '../contexts/Posts';
import UserContext from '../contexts/user';
import useAuthFetch from '../hooks/useAuthFetch';
import useDefinedContext from '../hooks/useDefinedContext';
import '../styles/Editor.scss';
import { getPostBlogAPIEndpoint } from '../utils/routeGetters';

export default function Editor() {
  const { postid } = useParams<{ postid: string }>();
  const [user] = useDefinedContext(UserContext);

  const { posts } = useDefinedContext(PostsContext);
  const activePost = posts.find((post) => post._id === postid);

  const [postTitle, setPostTitle] = useState('Loading');
  const [postContent, setPostContent] = useState('Loading');

  useEffect(() => {
    setPostTitle(activePost?.title ?? 'New Post');
    setPostContent(activePost?.content ?? 'New Post');
  }, [postid]);

  const [isSending, setIsSending] = useState(false);
  const { callFetch, isLoading } = useAuthFetch(
    getPostBlogAPIEndpoint(user?._id ?? 'undefined'),
  );
  useEffect(() => {
    if (isSending) {
      callFetch({
        title: postTitle,
        content: postContent,
        publishDate: new Date(),
      });
    }
  }, [isSending]);

  useEffect(() => {
    if (isLoading === false) {
      console.log('sending complete!');
      setIsSending(false);
    }
  }, [isLoading]);

  function handleTitleUpdate(e: React.FormEvent<HTMLInputElement>) {
    setPostTitle(e.currentTarget.value);
  }

  function handleContentUpdate(e: React.FormEvent<HTMLTextAreaElement>) {
    setPostContent(e.currentTarget.value);
  }

  function publishPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
  }

  return (
    <div className="EditorContainer">
      <form className="EditorColumn" onSubmit={publishPost}>
        <div className="EditorToolbar">Tools n such</div>
        <div className="EditorPage">
          <input
            className="EditorPage-Title"
            value={postTitle}
            onChange={handleTitleUpdate}
          />
          <textarea
            className="EditorPage-Content"
            value={postContent}
            onChange={handleContentUpdate}
          />
        </div>
        <div className="EditorPublishBar">
          <button className="Button" type="button">
            Save as draft
          </button>
          <button className="Button" type="button">
            Schedule publication
          </button>
          <button className="Button" type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
