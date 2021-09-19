import React from 'react';
import type { Nullable } from 'src/utils/Nullable';
import type { User } from 'src/utils/User';

const UserContext = React.createContext<
  [Nullable<User>, React.Dispatch<Nullable<User>>] | null
>(null);

export default UserContext;
