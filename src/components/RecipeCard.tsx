
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Clock, Utensils } from "lucide-react";
import { Recipe } from '../types/recipe';
import { toggleFavorite, isFavorite } from '../services/favoriteService';
import { useToast } from "@/hooks/use-toast";

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  const [favorite, setFavorite] = useState<boolean>(isFavorite(recipe.id));
  const { toast } = useToast();
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    const isFav = toggleFavorite(recipe);
    setFavorite(isFav);
    
    toast({
      title: isFav ? "Added to Favorites" : "Removed from Favorites",
      description: isFav 
        ? `"${recipe.title}" added to your favorites` 
        : `"${recipe.title}" removed from your favorites`,
      duration: 2000,
    });
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full recipe-card-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
          }}
        />
        <button
          className={`absolute top-2 right-2 p-2 rounded-full ${
            favorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600'
          } transition-colors duration-300 hover:scale-105`}
          onClick={handleFavoriteClick}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={18} 
            className={favorite ? 'animate-pulse-heart fill-white' : ''}
          />
        </button>
      </div>
      
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg leading-tight line-clamp-2 h-12">{recipe.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-3 flex-grow">
        <div className="flex flex-wrap gap-1 mt-1">
          {recipe.vegetarian && <Badge variant="outline" className="bg-avocado/10">Vegetarian</Badge>}
          {recipe.vegan && <Badge variant="outline" className="bg-avocado/10">Vegan</Badge>}
          {recipe.glutenFree && <Badge variant="outline" className="bg-avocado/10">Gluten-Free</Badge>}
          {recipe.dairyFree && <Badge variant="outline" className="bg-avocado/10">Dairy-Free</Badge>}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 border-t flex justify-between text-sm text-muted-foreground">
        {recipe.readyInMinutes && (
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{recipe.readyInMinutes} min</span>
          </div>
        )}
        {recipe.servings && (
          <div className="flex items-center gap-1">
            <Utensils size={14} />
            <span>{recipe.servings} servings</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
