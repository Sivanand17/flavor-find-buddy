
import React, { useState, useEffect } from 'react';
import ApiKeyForm from '../components/ApiKeyForm';
import SearchFilters from '../components/SearchFilters';
import RecipeCard from '../components/RecipeCard';
import RecipeDetail from '../components/RecipeDetail';
import FavoritesView from '../components/FavoritesView';
import LoadingSpinner from '../components/LoadingSpinner';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Recipe, SearchFilters as FilterType } from '../types/recipe';
import { getApiKey } from '../services/apiKeyService';
import { searchRecipes } from '../services/recipeService';
import { getFavoriteRecipes } from '../services/favoriteService';
import { Heart, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [lastSearch, setLastSearch] = useState<string>('');
  const [favoritesCount, setFavoritesCount] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    const apiKey = getApiKey();
    setHasApiKey(!!apiKey);
    setFavoritesCount(getFavoriteRecipes().length);
  }, []);

  const handleApiKeySet = () => {
    setHasApiKey(!!getApiKey());
  };

  const handleSearch = async (filters: FilterType) => {
    if (!hasApiKey) return;

    setLoading(true);
    setRecipes([]);
    setLastSearch(filters.ingredients);

    try {
      const response = await searchRecipes(filters);
      setRecipes(response.results);
      
      if (response.results.length === 0) {
        toast({
          title: "No recipes found",
          description: "Try with different ingredients or filters",
        });
      }
    } catch (error) {
      console.error('Error searching recipes:', error);
      toast({
        title: "Error searching recipes",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  const updateFavoritesCount = () => {
    setFavoritesCount(getFavoriteRecipes().length);
  };

  const toggleFavoritesView = () => {
    setShowFavorites(!showFavorites);
  };

  // Main content based on states
  const renderContent = () => {
    if (!hasApiKey) {
      return (
        <div className="max-w-3xl mx-auto py-8">
          <ApiKeyForm onApiKeySet={handleApiKeySet} />
        </div>
      );
    }

    if (showFavorites) {
      return <FavoritesView onClose={toggleFavoritesView} />;
    }

    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-honey to-tomato p-6 rounded-lg shadow-md text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Flavor Find Buddy</h1>
              <p className="mt-2 opacity-90">Search for recipes by ingredients and dietary preferences</p>
            </div>
            <Button
              variant="outline"
              className="bg-white/20 text-white border-white/40 hover:bg-white/30"
              onClick={toggleFavoritesView}
            >
              <Heart className="mr-2 h-4 w-4 fill-white" />
              Favorites
              {favoritesCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-white text-honey">
                  {favoritesCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        <div className="bg-card shadow-sm rounded-lg p-6">
          <SearchFilters onSearch={handleSearch} isLoading={loading} />
        </div>

        <div>
          {loading ? (
            <LoadingSpinner />
          ) : recipes.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Utensils size={18} className="text-muted-foreground" />
                <h2 className="text-lg font-medium">
                  Recipes with{" "}
                  <span className="text-primary font-semibold">
                    {lastSearch}
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => handleCardClick(recipe)}
                  />
                ))}
              </div>
            </div>
          ) : lastSearch ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No recipes found. Try with different ingredients.</p>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="mb-2">
                <Utensils size={32} className="mx-auto text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Enter ingredients above to search for recipes
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {renderContent()}
        
        <RecipeDetail
          recipe={selectedRecipe}
          open={detailOpen}
          onClose={handleDetailClose}
          onFavoriteChange={updateFavoritesCount}
        />
      </div>
    </div>
  );
};

export default Index;
