import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PostsContext } from '../contexts/Posts';
import UserContext from '../contexts/user';
import useAuthFetch from '../hooks/useAuthFetch';
import useDefinedContext from '../hooks/useDefinedContext';
import '../styles/Editor.scss';
import type Post from '../utils/Post';
import {
  getPostBlogAPIEndpoint,
  getUpdateBlogAPIEndpoint,
} from '../utils/routeGetters';

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
  const { posts, dispatch } = useDefinedContext(PostsContext);
  const activePost = posts.find((post) => post._id === postid);

  const [editedPost, setEditedPost] = useState<EditedPost>({ ...defaultPost });

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

  // TODO: instead of all this ternary logic, just make 2 different functions?
  const ApiPostBlogEndpoint = isNewPost()
    ? getPostBlogAPIEndpoint(user?._id ?? 'undefined')
    : getUpdateBlogAPIEndpoint(postid);

  const { callFetch, body: publishRequestResponse } =
    useAuthFetch(ApiPostBlogEndpoint);

  function publishPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fetchBody = {
      title: editedPost.title,
      content: editedPost.content,
      publishDate: activePost?.publishDate ?? new Date(),
    };

    callFetch(isNewPost() ? 'POST' : 'PUT', fetchBody);
  }

  function isNewPost() {
    return postid === 'new';
  }

  // whenever the selected post changes, change the text to match
  // TODO: if there's unsaved content, warn before allowing the user to switch
  useEffect(() => {
    if (activePost?.title && activePost?.content) {
      setEditedPost({ title: activePost.title, content: activePost.content });
    } else {
      setEditedPost({ ...defaultPost });
    }
  }, [postid]);

  // add newly published post to list of posts if publish fetch returns successful
  useEffect(() => {
    if (!publishRequestResponse) {
      return;
    }

    const responsePost = publishRequestResponse.content as Post;

    // make sure the response is actually the returned post, and return if not
    if (!responsePost._id || !responsePost.title) {
      return;
    }

    if (isNewPost()) {
      dispatch({ type: 'add', posts: [responsePost] });
    } else {
      dispatch({ type: 'update', id: postid, post: responsePost });
    }
  }, [publishRequestResponse]);

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
