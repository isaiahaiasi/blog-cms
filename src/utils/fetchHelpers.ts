import type React from 'react';
import type { ResponseBody } from 'src/hooks/useFetch';

type FieldSetterPairObject = Record<string, React.Dispatch<any>>;

export function setStateFromResponseBody(
  body: ResponseBody,
  fieldSetterPairs: FieldSetterPairObject,
) {
  console.log('setting state...');
  const fieldKeys = Object.keys(fieldSetterPairs);

  if (
    !body ||
    typeof body === 'string' ||
    fieldKeys.some((key) => !body[key])
  ) {
    console.log(
      'Could not set state from response body; data may be null or malformed.',
    );
    return;
  }

  // Call each state setter with the value of body[key]
  // eg: { "user": setUser } => setUser(body["user"])
  fieldKeys.forEach((key) => {
    fieldSetterPairs[key](body[key]);
  });
}
