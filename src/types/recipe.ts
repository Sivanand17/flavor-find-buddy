
export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
  missedIngredients?: Ingredient[];
  usedIngredients?: Ingredient[];
  unusedIngredients?: Ingredient[];
  likes?: number;
  summary?: string;
  instructions?: string;
  extendedIngredients?: ExtendedIngredient[];
  readyInMinutes?: number;
  servings?: number;
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  dairyFree?: boolean;
  analyzedInstructions?: AnalyzedInstruction[];
}

export interface Ingredient {
  id: number;
  amount: number;
  unit: string;
  unitLong: string;
  unitShort: string;
  aisle: string;
  name: string;
  original: string;
  originalName: string;
  meta: string[];
  image: string;
}

export interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
    metric: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
  };
}

export interface AnalyzedInstruction {
  name: string;
  steps: {
    number: number;
    step: string;
    ingredients?: Ingredient[];
    equipment?: {
      id: number;
      name: string;
      localizedName: string;
      image: string;
    }[];
  }[];
}

export interface SearchFilters {
  ingredients: string;
  diet?: string;
  intolerances?: string[];
  maxReadyTime?: number;
}

export type DietType = 'vegetarian' | 'vegan' | 'glutenFree' | 'dairyFree' | '';
