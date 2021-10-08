export const BASE_URL = `http://localhost:3000`;
export const prodEndpoint = `fill me in when we deploy`;

export const LOGIN_URL = `${BASE_URL}/api/v1/auth/login`;
export const LOGOUT_URL = `${BASE_URL}/api/v1/auth/logout`;
export const SIGNUP_URL = `${BASE_URL}/api/v1/auth/register`;
export const CURRENT_USER_URL = `${BASE_URL}/api/v1/me`;
export const RECIPE_BASE_URL = `${BASE_URL}/api/v1/recipe`;
export const ALL_RECIPES_URL = `${BASE_URL}/api/v1/recipes`;
export const EDIT_FAVORITES_URL = `${BASE_URL}/api/v1/me/favorites`;
export const DELETE_RECIPE_URL = (id) =>
  `${BASE_URL}/api/v1/recipe/${id}/delete`;
