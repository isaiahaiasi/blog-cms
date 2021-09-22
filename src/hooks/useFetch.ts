import { useCallback, useState } from 'react';

export interface UseFetchInterface {
  (url: string, options: Record<string, any>): {
    callFetch: (body?: any) => {};
    isLoading: boolean;
    isError: boolean;
    response: Response | null;
  };
}

// TODO: caching
const useFetch: UseFetchInterface = function (url, options = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState<null | Response>(null);
  // Possibly derivative of response.body, but that's returned in a one-time Stream,
  // and I want to cache it without overriding/extending the response object
  const [body, setBody] = useState<null | Record<string, any> | string>(null);

  const callFetch = useCallback(
    async (body) => {
      // Controller to abort fetch on cleanup if necessary
      const abortController = new AbortController();

      // Add body & appropriate POST headers
      const full_options: RequestInit = body
        ? {
            ...options,
            body: JSON.stringify(body),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: abortController.signal,
          }
        : options;

      const res = await fetch(url, full_options);

      setIsLoading(false);

      if (!res.ok) {
        setIsError(true);
      }

      setResponse(response);

      return () => {
        console.log('Abandoning fetch request');
        abortController?.abort();
      };
    },
    [url],
  );

  return { callFetch, isLoading, isError, response, body };
};

export default useFetch;
