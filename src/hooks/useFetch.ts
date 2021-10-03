import { useEffect, useState } from 'react';

export type ResponseBody = Record<string, any> | string | null;

export interface UseFetchInterface {
  (url: string, options: Partial<RequestInit>): {
    callFetch: (method: RequestMethod, body?: any) => void;
    isLoading: boolean;
    isError: boolean;
    response: Response | null;
    body: ResponseBody;
  };
}

type RequestMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

interface RequestInfo {
  method: RequestMethod;
  body?: any;
}

const useFetch: UseFetchInterface = function (url, options = {}) {
  // state variables exported by useFetch
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState<null | Response>(null);
  const [resBody, setResBody] = useState<ResponseBody>(null);

  // state necessary for triggering request on command, using useEffect
  const [reqInfo, setReqInfo] = useState<RequestInfo | null>(null);

  // Controller to abort fetch on cleanup if necessary
  const abortController = new AbortController();

  useEffect(() => {
    // only fetch if request *isn't* null (the default value)
    if (reqInfo === null) {
      return;
    }

    console.log('calling useEffect fetch...');

    let isMounted = true;

    const fullOptions = getFetchOptions(options, reqInfo, abortController);

    const doFetch = async () => {
      console.log('fetching');
      const res = await fetch(url, fullOptions);

      // State should never be set on an unmounted component
      if (!isMounted) return;

      if (!res.ok) {
        setIsError(true);
      }

      let responseBody = await parseResponse(res);

      if (!abortController.signal.aborted && isMounted) {
        setResBody(responseBody);
        setResponse(res);
        setIsLoading(false);
      }
    };

    doFetch();

    return () => {
      console.log('Abandoning fetch request');
      isMounted = false;
      abortController?.abort();
    };
  }, [reqInfo]);

  function callFetch(method: RequestMethod, body?: any) {
    setReqInfo({ method, body });
  }

  return { callFetch, isLoading, isError, response, body: resBody };
};

// Read body stream and cast if necessary
// NOTE: the returned value won't necessarily be JSON formatted
// eg, "Unauthorized" response
async function parseResponse(res: Response) {
  const responseText = await res.text();

  try {
    return JSON.parse(responseText);
  } catch (err) {
    console.log(`Could not parse fetch response ${responseText} as JSON`);
    return responseText;
  }
}

function getFetchOptions(
  options: RequestInit,
  reqInfo: RequestInfo,
  abortController: AbortController,
): RequestInit {
  // first, merge static headers, headers passed into hook, & reqInfo-based headers
  const headers = {
    'Access-Control-Allow-Methods': reqInfo.method,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // if reqInfo.body is JSON-serializable, JSONify it; otherwise, leave it alone
  let body = reqInfo.body;
  try {
    body = JSON.stringify(body);
  } catch (_) {
    console.log('Request body not serializable as JSON', body);
  }

  return {
    ...options,
    signal: abortController.signal,
    method: reqInfo.method,
    headers,
    body,
  };
}

export default useFetch;
