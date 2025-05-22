
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Recipe } from '../types/recipe';
import { Heart, Clock, Utensils } from "lucide-react";
import { toggleFavorite, isFavorite } from '../services/favoriteService';
import { useToast } from "@/hooks/use-toast";

interface RecipeDetailProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
  onFavoriteChange: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, open, onClose, onFavoriteChange }) => {
  const { toast } = useToast();
  
  if (!recipe) return null;
  
  const favorite = isFavorite(recipe.id);
  
  const handleFavoriteClick = () => {
    const isFav = toggleFavorite(recipe);
    onFavoriteChange();
    
    toast({
      title: isFav ? "Added to Favorites" : "Removed from Favorites",
      description: isFav 
        ? `"${recipe.title}" added to your favorites` 
        : `"${recipe.title}" removed from your favorites`,
      duration: 2000,
    });
  };

  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl pr-8">{recipe.title}</DialogTitle>
          <div className="flex flex-wrap gap-1 mt-2">
            {recipe.vegetarian && <Badge variant="outline" className="bg-avocado/10">Vegetarian</Badge>}
            {recipe.vegan && <Badge variant="outline" className="bg-avocado/10">Vegan</Badge>}
            {recipe.glutenFree && <Badge variant="outline" className="bg-avocado/10">Gluten-Free</Badge>}
            {recipe.dairyFree && <Badge variant="outline" className="bg-avocado/10">Dairy-Free</Badge>}
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            {recipe.readyInMinutes && (
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{recipe.readyInMinutes} min</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-1">
                <Utensils size={16} />
                <span>{recipe.servings} servings</span>
              </div>
            )}
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-grow pr-4">
          <div className="space-y-6">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-[200px] sm:h-[300px] object-cover rounded-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
              }}
            />
            
            {recipe.summary && (
              <div>
                <h3 className="font-medium mb-2">Summary</h3>
                <div 
                  className="text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={createMarkup(recipe.summary)}
                />
              </div>
            )}
            
            {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Ingredients</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {recipe.extendedIngredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.original}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Instructions</h3>
                <ol className="list-decimal pl-5 text-sm space-y-3">
                  {recipe.analyzedInstructions[0].steps.map((step) => (
                    <li key={step.number}>
                      {step.step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <DialogFooter className="sm:justify-between">
          <Button
            variant={favorite ? "destructive" : "outline"}
            onClick={handleFavoriteClick}
            className={favorite ? "" : "border-dashed hover:border-rose-300 hover:text-rose-500"}
          >
            <Heart className={`mr-2 h-4 w-4 ${favorite ? "fill-white" : ""}`} />
            {favorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetail;
