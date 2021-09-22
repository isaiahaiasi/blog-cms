import { useCallback, useState } from 'react';

export type ResponseBody = Record<string, any> | string | null;

export interface UseFetchInterface {
  (url: string, options: Record<string, any>): {
    callFetch: (body?: any) => {};
    isLoading: boolean;
    isError: boolean;
    response: Response | null;
    body: ResponseBody;
  };
}

const useFetch: UseFetchInterface = function (url, options = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState<null | Response>(null);

  // Possibly derivative of response.body, but that's returned in a one-time Stream,
  // and I want to cache it without overriding/extending the response object
  const [body, setBody] = useState<ResponseBody>(null);

  const callFetch = useCallback(
    async (postBody) => {
      // Controller to abort fetch on cleanup if necessary
      const abortController = new AbortController();

      // Add body & appropriate POST headers
      const full_options: RequestInit = postBody
        ? {
            ...options,
            body: JSON.stringify(postBody),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: abortController.signal,
          }
        : options;

      const res = await fetch(url, full_options);

      if (!res.ok) {
        setIsError(true);
      }

      // Read body stream and cast if necessary
      // NOTE: the returned value won't necessarily be JSON formatted
      // eg, "Unauthorized" response
      let resBody = await res.text();

      try {
        resBody = JSON.parse(resBody);
      } catch (err) {
        console.log(`Could not parse fetch response ${resBody} as JSON`);
      }

      setBody(resBody);
      setResponse(res);
      setIsLoading(false);

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
