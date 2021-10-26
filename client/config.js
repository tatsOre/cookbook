const dev = process.env.NEXT_PUBLIC_NODE_ENV_FE === "development";
export const BASE_URL = dev
  ? "http://localhost:3000"
  : process.env.NEXT_PUBLIC_PROD_ADDR;

export const LOGIN_URL = `${BASE_URL}/api/v1/auth/login`;

export const LOGIN_WITH_GOOGLE_URL = `${BASE_URL}/api/v1/auth/google`;

export const LOGOUT_URL = `${BASE_URL}/api/v1/auth/logout`;

export const SIGNUP_URL = `${BASE_URL}/api/v1/auth/register`;

export const CURRENT_USER_URL = `${BASE_URL}/api/v1/me`;

export const SEARCH_IN_CURRENT_USER_URL = (field) =>
  `${BASE_URL}/api/v1/me/search?field=${field}&q=`;

export const ALL_RECIPES_URL = `${BASE_URL}/api/v1/recipes`;

export const EDIT_FAVORITES_URL = `${BASE_URL}/api/v1/me/favorites`;

export const RECIPE_BASE_URL = `${BASE_URL}/api/v1/recipe`;

// field can be 'fraction' | 'measurement';
export const CLIENT_ASSET_URL = (category, value) =>
  `${BASE_URL}/assets/${category}?field=${value}`;

export const SHOP_LIST_BASE_URL = `${BASE_URL}/api/v1/me/shopping_lists`;

export const LATEST_RECIPES_URL = `${BASE_URL}/api/v1/recipes/latest`;

export const AVATAR_DEFAULT =
  "https://thumbs.dreamstime.com/z/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg";
