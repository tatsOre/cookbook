import { useRouter } from "next/router";
import ButtonFavorites from "../Buttons/ButtonFavorites";
import {
  ButtonDeleteRecipe,
  ButtonEditRecipe,
  ButtonTogglePublic,
} from "../Buttons/Buttons";
import useUser from "../../src/useUser";

const UserActions = ({ recipeID, isPublic }) => {
  const { user } = useUser();
  const router = useRouter();
  const userRecipes = user?.recipes || [];
  const recipePage = router.pathname.startsWith("/recipes/");

  return (
    <>
      {userRecipes.includes(recipeID) ? (
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
