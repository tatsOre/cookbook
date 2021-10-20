import { useState } from "react";

import WithWidget from "../User/userSWR";
import RecipePill from "../RecipeCard/RecipePill";
import FavoritePill from "../RecipeCard/FavoritePill";
import ShopListPill from "../ShoppingLists/ShopListPill";
import SearchBar from "../Search/SearchDownshift";
import { SEARCH_IN_CURRENT_USER_URL } from "../../config";
import styles from "./Dashboard.module.css";

const RecipesWidget = WithWidget(RecipePill);
const FavoritesWidget = WithWidget(FavoritePill);
const ShopListsWidget = WithWidget(ShopListPill);

const SEARCH_IN_OWNED_URL = SEARCH_IN_CURRENT_USER_URL("recipes");
const SEARCH_IN_FAVS_URL = SEARCH_IN_CURRENT_USER_URL("favorites");

/**
 * GET /api/v1/me/search?field=:field&q=:queryParam
 * field: [recipes || favorites]
 */

const TabLink = ({ label, active, setActiveTab }) => {
  const handleItemClick = () => setActiveTab(label);
  return (
    <button
      className={` ${active && styles.active} ${styles.tab__link}`}
      onClick={handleItemClick}
    >
      {label}
    </button>
  );
};

const TabContent = ({ active, children }) => {
  return (
    <div className={`${active && styles.active} ${styles.tab__content}`}>
      {children}
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("recipes");
  return (
    <div className={`${styles.dashboard__container}`}>
      <div className={styles.dashboard__header}>
        <TabLink
          label="recipes"
          active={activeTab === "recipes"}
          setActiveTab={setActiveTab}
        />
        <TabLink
          label="favorites"
          active={activeTab === "favorites"}
          setActiveTab={setActiveTab}
        />
        <TabLink
          label="shopping lists"
          active={activeTab === "shopping lists"}
          setActiveTab={setActiveTab}
        />
      </div>

      <div className={styles.dashboard__body}>
        <TabContent active={activeTab === "recipes"}>
          <SearchBar
            placeholder="Search in your recipes..."
            URL={SEARCH_IN_OWNED_URL}
            withBackdrop
          />
          <div className={styles.tab__results}>
            <RecipesWidget field="recipes" fallback="Ups, nothing here yet." />
          </div>
        </TabContent>

        <TabContent active={activeTab === "favorites"}>
          <SearchBar
            placeholder="Search in your favorites..."
            URL={SEARCH_IN_FAVS_URL}
            withBackdrop
          />
          <div className={styles.tab__results}>
            <FavoritesWidget
              field="favorites"
              fallback="Ups, no favs here yet."
            />
          </div>
        </TabContent>
        <TabContent active={activeTab === "shopping lists"}>
          <div className={styles.tab__results}>
            <ShopListsWidget
              field="shopping_lists"
              fallback="Ups, no favs here yet."
            />
          </div>
        </TabContent>
      </div>
    </div>
  );
};

export default Dashboard;
