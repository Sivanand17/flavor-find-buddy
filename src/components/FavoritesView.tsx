
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';
import { Recipe } from '../types/recipe';
import { getFavoriteRecipes } from '../services/favoriteService';
import { Heart } from "lucide-react";

interface FavoritesViewProps {
  onClose: () => void;
}

const FavoritesView: React.FC<FavoritesViewProps> = ({ onClose }) => {
  const [favorites, setFavorites] = useState<Recipe[]>(getFavoriteRecipes());
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  
  const handleCardClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setDetailOpen(true);
  };
  
  const handleDetailClose = () => {
    setDetailOpen(false);
  };
  
  const handleFavoriteChange = () => {
    setFavorites(getFavoriteRecipes());
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold flex items-center">
          <Heart className="mr-2 h-5 w-5 fill-tomato text-tomato" />
          Favorites
        </h2>
        <Button variant="outline" onClick={onClose}>Back to Search</Button>
      </div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">You haven't added any favorite recipes yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onClick={() => handleCardClick(recipe)}
            />
          ))}
        </div>
      )}
      
      <RecipeDetail 
        recipe={selectedRecipe} 
        open={detailOpen} 
        onClose={handleDetailClose}
        onFavoriteChange={handleFavoriteChange}
      />
    </div>
  );
};

export default FavoritesView;
