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

  return (
    <div className="EditorContainer">
      <div className="EditorColumn">
        <div className="EditorToolbar">Tools n such</div>
        <div className="EditorPage">
          <div className="EditorPage-Title">{postTitle}</div>
          <div className="EditorPage-Content">{postContent}</div>
        </div>
        <div className="EditorPublishBar">
          <button className="Button">Save as draft</button>
          <button className="Button">Schedule publication</button>
          <button className="Button">Publish</button>
        </div>
      </div>
    </div>
  );
}
