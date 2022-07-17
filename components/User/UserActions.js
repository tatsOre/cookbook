import Link from "next/link";
import {
  ButtonDelete,
  ButtonTogglePublic,
  LinkOutlined,
} from "../Buttons/Buttons";
import useUser from "../../src/useUser";

const UserActions = ({ recipeID, isPublic }) => {
  const { user } = useUser();
  const userRecipes = user?.recipes || [];

  return userRecipes.includes(recipeID) ? (
    <>
      <ButtonTogglePublic id={recipeID} isPublic={isPublic} />
      <Link href={`/edit/${recipeID}`} passHref>
        <LinkOutlined className="btn__edit__recipe">Edit</LinkOutlined>
      </Link>
      <ButtonDelete id={recipeID} item="recipe" />
    </>
  ) : null;
};

export default UserActions;
