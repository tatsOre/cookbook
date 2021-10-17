import { useContext } from "react";
import { userContext } from "../../src/UserContext";
import { useRouter } from "next/router";
import ButtonFavorites from "../Buttons/ButtonFavorites";
import {
  ButtonDeleteRecipe,
  ButtonEditRecipe,
  ButtonTogglePublic,
} from "../Buttons/Buttons";

const UserActions = ({ recipeID, isPublic }) => {
  const { user } = useContext(userContext);
  const router = useRouter();

  const recipePage = router.pathname.startsWith("/recipes/");

  return (
    <>
      {user?.recipes.includes(recipeID) ? (
        <>
          <ButtonTogglePublic id={recipeID} isPublic={isPublic} />
          <ButtonEditRecipe id={recipeID} />
          <ButtonDeleteRecipe id={recipeID} />
        </>
      ) : (
        <ButtonFavorites id={recipeID} addTooltip={recipePage ? false : true} />
      )}
    </>
  );
};

export default UserActions;
