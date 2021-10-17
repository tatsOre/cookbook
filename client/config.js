export const BASE_URL = `http://localhost:3000`;
export const prodEndpoint = `fill me in when we deploy`;

export const LOGIN_URL = `${BASE_URL}/api/v1/auth/login`;

export const LOGOUT_URL = `${BASE_URL}/api/v1/auth/logout`;

export const SIGNUP_URL = `${BASE_URL}/api/v1/auth/register`;

export const CURRENT_USER_URL = `${BASE_URL}/api/v1/me`;

export const ALL_RECIPES_URL = `${BASE_URL}/api/v1/recipes`;

export const EDIT_FAVORITES_URL = `${BASE_URL}/api/v1/me/favorites`;

export const RECIPE_BASE_URL = `${BASE_URL}/api/v1/recipe`;

// field can be 'fraction' | 'measurement';
export const INGR_ASSET_URL = (field) =>
  `${BASE_URL}/api/assets/ingredients?field=${field}`;

export const SHOP_LIST_BASE_URL = `${BASE_URL}/api/v1/me/shopping_lists`;

export const AVATAR_DEFAULT =
  "https://thumbs.dreamstime.com/z/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg";
