// A wrapper for useContext that throws if there is no context provider
// (default behavior is to return whatever the default value is)
// This avoids having to check for garbage data in every consumer

import { useContext } from 'react';

// TODO: not sure how to implement generic type guard...

export default function useDefinedContext<T>(
  context: React.Context<T>,
): NonNullable<T> {
  const result = useContext(context);

  if (result === null || result === undefined) {
    throw new Error(
      'Context was null. This might mean useContext was not able to find a ContextProvider.',
    );
  }

  return result as NonNullable<T>;
}
