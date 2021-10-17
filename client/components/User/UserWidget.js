import { useEffect, useState } from "react";
import { getData } from "../../src/ApiCalls";
import { CURRENT_USER_URL } from "../../config";

function WithWidget(Component) {
  return function WithUserWidget({ field, fallback }) {
    const [state, setState] = useState({ data: [], isLoading: false });
    const URL = `${CURRENT_USER_URL}/${field}`;

    const title = field.replace("_", " ");

    useEffect(() => {
      const getUserData = async () => {
        try {
          setState({ ...state, isLoading: true });
          const response = await getData(URL);
          const result = await response.json();
          setState({ data: result[field], isLoading: false });
        } catch (error) {
          console.log(error);
          setState({ ...state, isLoading: false });
        }
      };
      getUserData();
    }, []);

    return (
      <>
        <h2>My {title}</h2>
        <div>
          {state.data.length ? (
            state.data.map((item) => (
              <div>
                <Component data={item} />
              </div>
            ))
          ) : (
            <p>{fallback}</p>
          )}
        </div>
      </>
    );
  };
}

export default WithWidget;
