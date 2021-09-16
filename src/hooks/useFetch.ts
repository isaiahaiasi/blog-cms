import { useEffect, useState } from 'react';

// TODO: caching
export default function useFetch(
  url: string,
  options = {},
): {
  isLoading: boolean;
  isError: boolean;
  response: any;
  // TODO: cb trigger a re-fetch
} {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState<null | Response>(null);

  useEffect(() => {
    fetch(url, options).then((response) => {
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

  return { isLoading, isError, response };
}
