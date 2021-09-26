import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PostsContext } from '../contexts/Posts';
import useDefinedContext from '../hooks/useDefinedContext';
import '../styles/Editor.scss';

export default function Editor() {
  const { postid } = useParams<{ postid: string }>();
  const { posts } = useDefinedContext(PostsContext);
  const activePost = posts.find((post) => post._id === postid);

  const [postTitle, setPostTitle] = useState('Loading');
  const [postContent, setPostContent] = useState('Loading');

  useEffect(() => {
    setPostTitle(activePost?.title ?? 'Loading');
    setPostContent(activePost?.content ?? 'Loading');
  }, [postid]);

  function handleTitleUpdate(e: React.FormEvent<HTMLInputElement>) {
    setPostTitle(e.currentTarget.value);
  }

  function handleContentUpdate(e: React.FormEvent<HTMLTextAreaElement>) {
    setPostContent(e.currentTarget.value);
  }

  return (
    <div className="EditorContainer">
      <form className="EditorColumn">
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
          <button className="Button" type="button">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
