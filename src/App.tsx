import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <div className="Header">
        <div className="btn-grp-left">
          <button className="Header__btn">Home</button>
        </div>
        <div className="btn-grp-right">
          <button className="Header__btn">Reader</button>
          <button className="Header__btn">Github</button>
        </div>
      </div>
      <main className="Main">
        <div className="Sidebar">
          <ul>
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
                perferendis laudantium maiores? Quo rem consequatur
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
                doloribus, aut laudantium adipisci in sed animi. Magnam illo
                totam nihil excepturi sunt placeat soluta, minus enim dolore
                similique accusamus at omnis non voluptatum ratione veniam dolor
                quo possimus perferendis id assumenda eligendi! Tempore commodi,
                ex sed incidunt quia delectus? Vel, aspernatur? Quia, dolores
                labore, laboriosam neque explicabo reprehenderit ea nihil,
                sapiente magnam sed et suscipit ab dolore corrupti illum
                veritatis numquam! Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Blanditiis iste natus dignissimos error
                labore, accusamus quis? Impedit veritatis quisquam beatae
                aperiam accusantium commodi, voluptates facilis quod accusamus
                magnam suscipit veniam. Animi rerum non odio quasi vero, veniam
                quo consequatur dignissimos repudiandae porro, itaque eius in
                laudantium recusandae velit, odit suscipit laborum cum
                cupiditate! Obcaecati sapiente vitae id. Hic nisi ipsum fugiat,
                sunt exercitationem quam et recusandae, obcaecati autem esse
                quod quas quibusdam quo quos. Nulla explicabo alias quos
                consectetur quisquam dolorem sed perferendis facilis adipisci
                natus, veritatis voluptas doloremque sit dicta laudantium optio?
                Animi, quod dignissimos! Cumque laboriosam error sapiente est
                explicab e expedita exercitationem ratione autem inventore
                dolore magnam maiores commodi in est adipisci ea culpa. Libero
                error vero ad quis dolore! Labore mollitia amet cupiditate
                aliquid vitae praesentium animi maiores ex inventore nam ut ad,
                beatae vel eaque. A animi adipisci reiciendis, qui, itaque quia
                eveniet cupiditate ut, at facilis repellat dolore iure. Eaque ut
                ipsum laboriosam, nostrum totam exercitationem fuga provident
                aspernatur beatae nobis odit distinctio rerum quo autem amet,
                aliquid obcaecati necessitatibus cupiditate hic voluptatibus
                quibusdam adipisci inventore? Quos cum debitis iure placeat
                recusandae labore omnis ducimus amet id, accusantium nulla modi
                perferendis sequi necessitatibus minima ad quidem ipsam ea non
                culpa doloremque numquam. Dolores rerum nisi minima itaque cum
                commodi amet aspernatur, unde, illum, numquam nihil harum. Nobis
                eum itaque unde provident exercitationem, quaerat labore
                perferendis, distinctio magni eos doloremque dignissimos ut
                praesentium.
              </div>
            </div>
            <div className="EditorPublishBar">
              <button>Save as draft</button>
              <button>Schedule publication</button>
              <button>Publish</button>
            </div>
          </div>
        </div>
      </main>
      <div className="Footer">Made with {'<'}3 I guess</div>
    </div>
  );
}

export default App;
