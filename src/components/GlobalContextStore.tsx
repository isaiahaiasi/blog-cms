import React, { ReactNode, useReducer } from 'react';
import { postReducer, PostsContext } from '../contexts/Posts';
import UserContext from '../contexts/user';
import useStickyState from '../hooks/useStickyState';
import type { Nullable } from '../utils/Nullable';
import type { User } from '../utils/User';

interface GlobalContextStoreProps {
  children: ReactNode;
}

export default function GlobalContextStore({
  children,
}: GlobalContextStoreProps) {
  const [user, setUser] = useStickyState<Nullable<User>>(null, 'USER_INFO');
  const [posts, dispatch] = useReducer(postReducer, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <PostsContext.Provider value={{ posts, dispatch }}>
        {children}
      </PostsContext.Provider>
    </UserContext.Provider>
  );
}
