
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchFilters } from '../types/recipe';
import { Search } from "lucide-react";

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({ onSearch, isLoading }) => {
  const [ingredients, setIngredients] = useState<string>('');
  const [diet, setDiet] = useState<string>('');
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!ingredients.trim()) return;
    
    const filters: SearchFilters = {
      ingredients: ingredients.trim(),
      diet: diet || undefined,
    };
    
    onSearch(filters);
  };
  
  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3">
          <Input
            placeholder="Enter ingredients (e.g., tomato, cheese, pasta)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full"
            aria-label="Ingredients search"
          />
        </div>
        
        <div className="md:col-span-1">
          <Select value={diet} onValueChange={setDiet}>
            <SelectTrigger>
              <SelectValue placeholder="Diet (Optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Diet</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="gluten free">Gluten Free</SelectItem>
              <SelectItem value="dairy free">Dairy Free</SelectItem>
              <SelectItem value="keto">Keto</SelectItem>
              <SelectItem value="paleo">Paleo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-span-1">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading || !ingredients.trim()}
          >
            {isLoading ? (
              <div className="flex justify-center items-center space-x-1">
                <div className="loading-dot w-2 h-2 rounded-full bg-current"></div>
                <div className="loading-dot w-2 h-2 rounded-full bg-current"></div>
                <div className="loading-dot w-2 h-2 rounded-full bg-current"></div>
              </div>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchFiltersComponent;
