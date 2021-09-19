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

  const callFetch = useCallback(
    (body) => {
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
    },
    [url],
  );

  return { callFetch, isLoading, isError, response };
};

export default useFetch;
