import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import type Post from '../utils/Post';

interface SidebarPostItemProps {
  post: Post;
}

export default function SidebarPostItem({ post }: SidebarPostItemProps) {
  return (
    <Link to={`/editor/${post._id}`} className="Link">
      <p>{post.title}</p>
      <p>{formatDate(new Date(post.publishDate))}</p>
    </Link>
  );
}
