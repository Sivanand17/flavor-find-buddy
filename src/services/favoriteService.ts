
import { Recipe } from '../types/recipe';

const FAVORITES_STORAGE_KEY = 'favorite_recipes';

// Get all favorite recipes
export const getFavoriteRecipes = (): Recipe[] => {
  const favoritesJson = localStorage.getItem(FAVORITES_STORAGE_KEY);
  return favoritesJson ? JSON.parse(favoritesJson) : [];
};

// Check if a recipe is favorited
export const isFavorite = (recipeId: number): boolean => {
  const favorites = getFavoriteRecipes();
  return favorites.some(recipe => recipe.id === recipeId);
};

// Toggle favorite status
export const toggleFavorite = (recipe: Recipe): boolean => {
  const favorites = getFavoriteRecipes();
  const index = favorites.findIndex(item => item.id === recipe.id);
  
  if (index >= 0) {
    // Remove from favorites
    favorites.splice(index, 1);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    return false;
  } else {
    // Add to favorites
    favorites.push(recipe);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    return true;
  }
};
