import Layout from "../../components/Layout/Layout";
import WithWidget from "../../components/User/UserWidget";
import RecipeCardSmall from "../../components/RecipeCard/RecipeCardSmall";
import ShopListCard from "../../components/ShoppingLists/ShopListCard";

const RecipesWidget = WithWidget(RecipeCardSmall);
const FavoritesWidget = WithWidget(RecipeCardSmall);
const ShopListsWidget = WithWidget(ShopListCard);

export default function UserDashboard() {
  return (
    <Layout>
      <div>
        <div>
          <h2>Account</h2>
        </div>
        <div>
          <RecipesWidget field="recipes" fallback="Ups, nothing here yet." />
        </div>
        <div>
          <FavoritesWidget
            field="favorites"
            fallback="Ups, no favs here yet."
          />
        </div>
        <div>
          <ShopListsWidget
            field="shopping_lists"
            fallback="Ups, no favs here yet."
          />
        </div>
      </div>
    </Layout>
  );
}
