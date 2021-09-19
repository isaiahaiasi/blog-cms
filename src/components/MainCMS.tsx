import React, { useState } from 'react';
import EditorContext from '../contexts/Editor';
import type { Nullable } from '../utils/Nullable';
import type Post from '../utils/Post';
import Editor from './Editor';
import Sidebar from './Sidebar';

export default function MainCMS() {
  // NOT CURRENTLY IN USE, since I'm using url params instead
  const [activePost, setActivePost] = useState<Nullable<Post>>(null);
  return (
    <>
      <EditorContext.Provider value={{ activePost, setActivePost }}>
        <Sidebar />
        <Editor />
      </EditorContext.Provider>
    </>
  );
}
