import Link from "next/link";

const ButtonEditRecipe = ({ id }) => {
  return (
    <Link href="/">
      <a role="button">Edit</a>
    </Link>
  );
};

export default ButtonEditRecipe;
