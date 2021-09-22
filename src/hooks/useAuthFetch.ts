import { useEffect } from 'react';
import useFetch from './useFetch';

export default function useAuthFetch(url: string, options = {}) {
  // provides auth credentials by default, which can also be overridden
  const optionsWithAuth = { credentials: 'include', ...options };

  const { callFetch, isLoading, isError, response, body } = useFetch(
    url,
    optionsWithAuth,
  );

  // TODO: if "not authenticated" error is returned, log user out
  useEffect(() => {
    if (typeof body === 'string') {
      console.log('Post response body:', body);
    }
  }, [body]);

  return { callFetch, isLoading, isError, response, body };
}
