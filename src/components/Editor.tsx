import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { setStateFromResponseBody } from '../utils/fetchHelpers';
import useAuthFetch from '../hooks/useAuthFetch';
import '../styles/Editor.scss';

function getBlogPostUrl(postid: string): string {
  return `http://localhost:3000/api/blogs/${postid}`;
}

export default function Editor() {
  const { postid } = useParams<{ postid: string }>();

  const [postTitle, setPostTitle] = useState('Loading');
  const [postContent, setPostContent] = useState('Loading');

  const { callFetch, body, isLoading, isError } = useAuthFetch(
    getBlogPostUrl(postid),
  );

  useEffect(() => {
    callFetch();
  }, [postid]);

  useEffect(() => {
    console.log('useEffect Editor...');
    setStateFromResponseBody(body, {
      title: setPostTitle,
      content: setPostContent,
    });
  }, [body]);

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
