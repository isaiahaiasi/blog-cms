// useStickyState hook
// a useState hook persisted by localStorage
// a refinement of my initial implementation of this concept,
// which I wrote prior to reading this blog post:
// https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/

import React, { useEffect, useState } from 'react';

// TODO: add an export to remove the value from localStorage
// T must be JSON-serializable
export default function useStickyState<T>(defaultValue: T, key: string) {
  const [value, setValue] = useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key);

    // I want useStickyState to have effectively identical interface to useState
    // however, currently, if defaultValue is a function (possible w useState)
    // does this version set it to the result of the function, or the function itself?
    // TODO: test this with function for defaultValue...
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [value: T, setValue: React.Dispatch<T>];
}
