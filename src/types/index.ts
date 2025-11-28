export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  photoUrl?: string;
  bodyType?: string;
  colorTone?: string;
  style?: string;
}

export interface ClothingItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  occasion: string[];
  aiConfidence?: number;
}

export interface Outfit {
  id: string;
  userId: string;
  clothingItems: ClothingItem[];
  occasion: string;
  createdAt: string;
}

export type OccasionType = 'casual' | 'formal' | 'festival' | 'wedding' | 'party' | 'office' | 'sports';

export interface AppearanceAnalysis {
  bodyType: string;
  colorTone: string;
  style: string;
  imageUrl: string;
}
