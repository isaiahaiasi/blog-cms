import React from 'react';
import Editor from './Editor';
import Sidebar from './Sidebar';

export default function MainCMS() {
  return (
    <main className="Main">
      <Sidebar />
      <Editor />
    </main>
  );
}
