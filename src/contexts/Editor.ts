import React from 'react';
import type { Nullable } from '../utils/Nullable';
import type Post from '../utils/Post';

export interface EditorContextContent {
  activePost: Nullable<Post>;
  setActivePost: React.Dispatch<Nullable<Post>>;
}

const EditorContext = React.createContext<Nullable<EditorContextContent>>(null);

export default EditorContext;
