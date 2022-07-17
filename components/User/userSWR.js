import { getData } from "../../src/ApiCalls";
import { CURRENT_USER_URL } from "../../config";

import useSWR from "swr";

const fetcher = (URL, callback) => {
  const { data, error } = useSWR(URL, callback);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default function WithWidget(Component) {
  return function WithUserWidget({ field, fallback }) {
    const URL = `${CURRENT_USER_URL}/${field}`;
    const { data, isLoading, isError } = fetcher(URL, getData);
    if (isLoading) return null;
    if (isError) return null;

    return (
      <>
        {data[field]?.length ? (
          data[field].map((item) => <Component key={item._id} data={item} />)
        ) : (
          <p>{fallback}</p>
        )}
      </>
    );
  };
}
