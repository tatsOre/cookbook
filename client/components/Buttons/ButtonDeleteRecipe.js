import { DELETE_RECIPE_URL } from "../../config";

const ButtonDeleteRecipe = ({ id }) => {
  const handleClickDelete = async (id) => {
    const URL = DELETE_RECIPE_URL(id);
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    // TODO: HANDLE ERRORS
  };

  return (
    <button type="button" onClick={() => handleClickDelete(id)}>
      Delete
    </button>
  );
};

export default ButtonDeleteRecipe;
