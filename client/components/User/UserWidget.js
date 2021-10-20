import { useEffect, useState } from "react";
import { getData } from "../../src/ApiCalls";
import { CURRENT_USER_URL } from "../../config";

function WithWidget(Component) {
  return function WithUserWidget({ field, fallback }) {
    const [state, setState] = useState({ data: [], isLoading: false });
    const URL = `${CURRENT_USER_URL}/${field}`;

    useEffect(() => {
      const getUserData = async () => {
        try {
          setState({ ...state, isLoading: true });
          const result = await getData(URL);
          setState({ data: result[field], isLoading: false });
        } catch (error) {
          console.log(error);
          setState({ ...state, isLoading: false });
        }
      };
      getUserData();
    }, []);

    return (
      <div>
        {state.data.length ? (
          state.data.map((item) => <Component data={item} />)
        ) : (
          <p>{fallback}</p>
        )}
      </div>
    );
  };
}

export default WithWidget;
