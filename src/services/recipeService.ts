
import { Recipe, SearchFilters } from '../types/recipe';
import { getApiKey } from './apiKeyService';

const BASE_URL = 'https://api.spoonacular.com';

// Error handling wrapper
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }
  return response.json();
};

// Search recipes by ingredients
export const searchRecipesByIngredients = async (
  ingredients: string,
  limit: number = 12
): Promise<Recipe[]> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key not found');

  const params = new URLSearchParams({
    apiKey,
    ingredients,
    number: limit.toString(),
    ranking: '1', // maximize used ingredients
    ignorePantry: 'true', // ignore common ingredients like salt, oil
  });

  const response = await fetch(`${BASE_URL}/recipes/findByIngredients?${params}`);
  return handleResponse(response);
};

// Search recipes with complex parameters
export const searchRecipes = async (
  filters: SearchFilters,
  limit: number = 12
): Promise<{ results: Recipe[] }> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key not found');

  const params = new URLSearchParams({
    apiKey,
    query: filters.ingredients,
    number: limit.toString(),
    addRecipeInformation: 'true',
    fillIngredients: 'true',
  });

  // Add optional filters
  if (filters.diet) params.append('diet', filters.diet);
  if (filters.intolerances && filters.intolerances.length > 0) {
    params.append('intolerances', filters.intolerances.join(','));
  }
  if (filters.maxReadyTime) params.append('maxReadyTime', filters.maxReadyTime.toString());

  const response = await fetch(`${BASE_URL}/recipes/complexSearch?${params}`);
  return handleResponse(response);
};

// Get recipe details by ID
export const getRecipeDetails = async (recipeId: number): Promise<Recipe> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key not found');

  const params = new URLSearchParams({
    apiKey,
    includeNutrition: 'false',
  });

  const response = await fetch(`${BASE_URL}/recipes/${recipeId}/information?${params}`);
  return handleResponse(response);
};
