import useFetch from './useFetch';

export default function useAuthFetch(url: string, options = {}) {
  // provides auth credentials by default, which can also be overriden
  const optionsWithAuth = { credentials: 'include', ...options };

  const { callFetch, isLoading, isError, response } = useFetch(
    url,
    optionsWithAuth,
  );

  // TODO: if "not authenticated" error is returned, log user out

  return { callFetch, isLoading, isError, response };
}
