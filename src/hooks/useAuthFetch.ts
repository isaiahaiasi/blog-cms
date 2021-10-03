import { useContext, useEffect } from 'react';
import UserContext from '../contexts/user';
import useFetch, { ResponseBody } from './useFetch';

export default function useAuthFetch(url: string, options = {}) {
  // provides auth credentials by default, which can also be overridden
  const optionsWithAuth: RequestInit = { credentials: 'include', ...options };

  const { callFetch, isLoading, isError, response, body } = useFetch(
    url,
    optionsWithAuth,
  );

  const [, setUser] = useContext(UserContext) ?? [];

  // If "not authenticated" response is returned, log user out automatically
  useEffect(() => {
    if (isUnauthenticatedResponse(body)) {
      if (setUser) {
        console.log('Logging user out automatically...');
        setUser(null);
      } else {
        console.error('Could not setUser because UserContext was not defined');
      }
    }
  }, [body]);

  return { callFetch, isLoading, isError, response, body };
}

function isUnauthenticatedResponse(responseBody: ResponseBody) {
  return typeof responseBody === 'string' && responseBody === 'Unauthorized';
}
