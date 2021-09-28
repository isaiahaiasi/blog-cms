import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PostsContext } from '../contexts/Posts';
import UserContext from '../contexts/user';
import useAuthFetch from '../hooks/useAuthFetch';
import useDefinedContext from '../hooks/useDefinedContext';
import '../styles/Editor.scss';
import { getPostBlogAPIEndpoint } from '../utils/routeGetters';

interface EditedPost {
  title: string;
  content: string;
}

const defaultPost = {
  title: 'New Post',
  content: 'Hello world',
};

export default function Editor() {
  const [user] = useDefinedContext(UserContext);
  const { postid } = useParams<{ postid: string }>();
  const { posts } = useDefinedContext(PostsContext);
  const activePost = posts.find((post) => post._id === postid);

  const [editedPost, setEditedPost] = useState<EditedPost>({ ...defaultPost });

  useEffect(() => {
    if (activePost?.title && activePost?.content) {
      setEditedPost({ title: activePost.title, content: activePost.content });
    } else {
      setEditedPost({ ...defaultPost });
    }
  }, [postid]);

  const ApiPostBlogEndpoint = getPostBlogAPIEndpoint(user?._id ?? 'undefined');
  const { callFetch } = useAuthFetch(ApiPostBlogEndpoint);

  function handlePostUpdate(
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    // must be extracted b/c `currentTarget` does not persist in asynchronous fn
    const [name, value] = [e.currentTarget.name, e.currentTarget.value];

    setEditedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  }

  function publishPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    callFetch({
      title: editedPost.title,
      content: editedPost.content,
      publishDate: new Date(),
    });
  }

  return (
    <div className="EditorContainer">
      <form className="EditorColumn" onSubmit={publishPost}>
        <div className="EditorToolbar">Tools n such</div>
        <div className="EditorPage">
          <input
            className="EditorPage-Title"
            value={editedPost.title}
            onChange={handlePostUpdate}
            name="title"
          />
          <textarea
            className="EditorPage-Content"
            value={editedPost.content}
            onChange={handlePostUpdate}
            name="content"
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
