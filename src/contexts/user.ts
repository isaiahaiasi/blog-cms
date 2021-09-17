import React from 'react';

// TODO: type 'user'
const UserContext = React.createContext<[any, React.Dispatch<any>] | null>(
  null,
);

export default UserContext;
