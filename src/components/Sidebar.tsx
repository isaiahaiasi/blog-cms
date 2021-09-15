import React from 'react';
import '../styles/Sidebar.scss';

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="SidebarSectionheader">Drafts</div>
      <ul>
        {['My draft', 'Second draft', 'yet another draft', 'sorry'].map(
          (p, i) => (
            <li key={i}>
              {i + 1} - {p}
            </li>
          ),
        )}
      </ul>
      <div className="SidebarSectionheader">Published</div>
      <ul>
        {new Array(35).fill('Post').map((p, i) => (
          <li key={i}>
            {i + 1} - {p + ' ' + i}
          </li>
        ))}
      </ul>
    </div>
  );
}
