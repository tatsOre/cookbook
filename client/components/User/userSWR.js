import { getData } from "../../src/ApiCalls";
import { CURRENT_USER_URL } from "../../config";

import useSWR from "swr";

const FETCHER = (URL, callback) => {
  const { data, error } = useSWR(URL, callback);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

function WithWidget(Component) {
  return function WithUserWidget({ field, fallback }) {
    const URL = `${CURRENT_USER_URL}/${field}`;
    const { data, isLoading, isError } = FETCHER(URL, getData);
    if (isLoading) return null;
    if (isError) return null;

    return (
      <div>
        {data[field].length ? (
          data[field].map((item) => (
            <div>
              <Component data={item} />
            </div>
          ))
        ) : (
          <p>{fallback}</p>
        )}
      </div>
    );
  };
}

export default WithWidget;
