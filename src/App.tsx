import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App theme-dark">
      <div className="Header content-bar">
        <div className="btn-grp-left">
          <button className="Button">Home</button>
        </div>
        <div className="btn-grp-right">
          <button className="Button">Reader</button>
          <button className="Button dark">Github</button>
        </div>
      </div>
      <main className="Main">
        <div className="Sidebar">
          <div className="SidebarSectionheader">Drafts</div>
          <ul>
            <li>Post 1</li>
            <li>Post 2</li>
            <li>Post 3</li>
            <li>Post 4</li>
          </ul>
          <div className="SidebarSectionheader">Published</div>
          <ul>
            <li>Post 1</li>
            <li>Post 2</li>
            <li>Post 3</li>
            <li>Post 4</li>
            <li>Post 1</li>
            <li>Post 2</li>
            <li>Post 3</li>
            <li>Post 4</li>
            <li>Post 1</li>
            <li>Post 2</li>
            <li>Post 3</li>
            <li>Post 4</li>
            <li>Post 1</li>
            <li>Post 2</li>
            <li>Post 3</li>
            <li>Post 4</li>
            <li>Post 1</li>
            <li>Post 2</li>
            <li>Post 3</li>
            <li>Post 4</li>
            <li>Post 1</li>
            <li>Post 2</li>
            <li>Post 3</li>
            <li>Post 4</li>
          </ul>
        </div>
        <div className="EditorContainer">
          <div className="EditorColumn">
            <div className="EditorToolbar">Tools n such</div>
            <div className="EditorPage">
              <div className="EditorPage-Title">Hello world</div>
              <div className="EditorPage-Content">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
                repellat numquam non doloribus odit dolorum, deleniti ad quasi
                vitae fugiat, perferendis placeat vero iure quos repellendus est
                id autem quia totam soluta. Qui ab necessitatibus, facere ipsam
                molestias ad eos minus dicta reprehenderit sequi incidunt, nam
                debitis distinctio ducimus. Enim consectetur laboriosam
                perfereci in sed animi. Magnam illo totam nihil excepturi sunt
                placeat soluta, minus enim dolore similique accusamus at omnis
                non voluptatum ratione veniam dolor quo possimus perferendis id
                assumenda eligendi! Tempore commodi, ex sed incidunt quia
                delectus? Vel, aspernatur? Quia, dolores labore, laboriosam
                neque explicabo reprehenderit ea nihil, sapiente magnam sed et
                suscipit ab dolore corrupti illum praesentium. ndis laudantium
                maiores? Quo rem consequatur necessitatibus corporis saepe
                repudiandae impedit ipsum natus sequi. Sunt expedita facere,
                soluta est saepe deserunt, hic repellat nisi mollitia minus
                vitae tempore, autem voluptatum cupiditate. Quibusdam
                consequatur iste consequuntur praesentium aliquid itaque
                deserunt, neque facilis ducimus odit sed totam esse placeat
                dignissimos iure soluta corporis voluptatibus vel illum mollitia
                sit. Unde adipisci obcaecati earum officia non, ad iure,
                repellat doloremque reprehenderit a architecto impedit mollitia
                laborum consequatur molestias porro consectetur perferendis et
                vitae eos suscipit nisi sit nemo fugiat. Cum doloribus, aut
                laudantium adipis ndis laudantium maiores? Quo rem consequatur
                necessitatibus corporis saepe repudiandae impedit ipsum natus
                sequi. Sunt expedita facere, soluta est saepe deserunt, hic
                repellat nisi mollitia minus vitae tempore, autem voluptatum
                cupiditate. Quibusdam consequatur iste consequuntur praesentium
                aliquid itaque deserunt, neque facilis ducimus odit sed totam
                esse placeat dignissimos iure soluta corporis voluptatibus vel
                illum mollitia sit. Unde adipisci obcaecati earum officia non,
                ad iure, repellat doloremque reprehenderit a architecto impedit
                mollitia laborum consequatur molestias porro consectetur
                perferendis et vitae eos suscipit nisi sit nemo fugiat. Cum
                doloribus, aut laudantium adipis
              </div>
            </div>
            <div className="EditorPublishBar">
              <button className="Button">Save as draft</button>
              <button className="Button">Schedule publication</button>
              <button className="Button">Publish</button>
            </div>
          </div>
        </div>
      </main>
      <div className="Footer content-bar">
        <p>Made with {'<'}3 I guess</p>
        <p>w: 300 | ch: 1200</p>
      </div>
    </div>
  );
}

export default App;
