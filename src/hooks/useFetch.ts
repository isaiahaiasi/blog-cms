import { useCallback, useState } from 'react';

// TODO: caching
export default function useFetch(
  url: string,
  options = {},
): {
  callFetch: (body?: any) => {};
  isLoading: boolean;
  isError: boolean;
  response: any;
  // TODO: cb trigger a re-fetch
} {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState<null | Response>(null);

  const callFetch = useCallback((body) => {
    console.log('body', body);
    const full_options = body
      ? {
          ...options,
          body: JSON.stringify(body),
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      : options;
    fetch(url, full_options).then((response) => {
      setIsLoading(false);

      if (!response.ok) {
        setIsError(true);
      }

      setResponse(response);
    });

    return () => {
      // ?
    };
  }, []);

  return { callFetch, isLoading, isError, response };
}
