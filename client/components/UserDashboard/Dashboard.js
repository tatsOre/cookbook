import WithWidget from "../User/userSWR";
import RecipePill from "../RecipeCard/RecipePill";
import RecipeCard from "../RecipeCard/RecipeCard";
import ShopListCard from "../ShoppingLists/ShopListCard";

import styles from "./Dashboard.module.css";

const RecipesWidget = WithWidget(RecipePill);
const FavoritesWidget = WithWidget(RecipeCard);
const ShopListsWidget = WithWidget(ShopListCard);

const Dashboard = () => {
  return (
    <div className={styles.dashboard__container}>
      <div className={styles.dashboard__widget}>
        <h2>Account</h2>
        <div>hello</div>
      </div>
      <div className={styles.dashboard__widget}>
        <h2>My Recipes</h2>
        <RecipesWidget field="recipes" fallback="Ups, nothing here yet." />
      </div>
      <div className={styles.dashboard__widget}>
        <h2>My Favorites</h2>
        <FavoritesWidget field="favorites" fallback="Ups, no favs here yet." />
      </div>
      <div className={styles.dashboard__widget}>
        <h2>My Shopping Lists</h2>
        <ShopListsWidget
          field="shopping_lists"
          fallback="Ups, no favs here yet."
        />
      </div>
    </div>
  );
};

export default Dashboard;
