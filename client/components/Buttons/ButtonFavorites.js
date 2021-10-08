import { useContext } from "react";
import { userContext } from "../../src/UserContext";
import { EDIT_FAVORITES_URL } from "../../config";

const ButtonFavorites = ({ id }) => {
  const { user, setUser } = useContext(userContext);
  const userFavorites = user?.favorites || [];

  const handleClickFavorite = async (id) => {
    const response = await fetch(EDIT_FAVORITES_URL, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ recipe: id }),
    });
    const result = await response.json();
    setUser(result);
  };

  return (
    <button type="button" onClick={() => handleClickFavorite(id)}>
      {userFavorites.includes(id)
        ? "Added to favorites"
        : "Add to your favorites"}
    </button>
  );
};

export default ButtonFavorites;
