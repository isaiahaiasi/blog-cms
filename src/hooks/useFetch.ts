import { useCallback, useEffect, useState } from 'react';

export type ResponseBody = Record<string, any> | string | null;

export interface UseFetchInterface {
  (url: string, options: Record<string, any>): {
    callFetch: (body?: any) => void;
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
  const [resBody, setResBody] = useState<ResponseBody>(null);
  const [reqBody, setReqBody] = useState<Record<string, any> | null>(null);

  // Controller to abort fetch on cleanup if necessary
  const abortController = new AbortController();

  useEffect(() => {
    console.log('useeffect fetch...');

    // Add body & appropriate POST headers
    const full_options: RequestInit = reqBody
      ? {
          ...options,
          body: JSON.stringify(reqBody),
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: abortController.signal,
        }
      : options;

    const doFetch = async () => {
      console.log('fetching');
      const res = await fetch(url, full_options);

      if (!res.ok) {
        setIsError(true);
      }

      // Read body stream and cast if necessary
      // NOTE: the returned value won't necessarily be JSON formatted
      // eg, "Unauthorized" response
      let responseBody = await res.text();

      try {
        responseBody = JSON.parse(responseBody);
      } catch (err) {
        console.log(`Could not parse fetch response ${responseBody} as JSON`);
      }

      if (!abortController.signal.aborted) {
        setResBody(responseBody);
        setResponse(res);
        setIsLoading(false);
      }
    };

    doFetch();

    // cleanup
    return () => {
      console.log('Abandoning fetch request');
      abortController?.abort();
    };
  }, [reqBody]);

  function callFetch(body?: any) {
    setReqBody(body);
  }

  return { callFetch, isLoading, isError, response, body: resBody };
};

export default useFetch;
