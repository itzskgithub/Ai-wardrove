import { createContext, useContext, useState, ReactNode } from 'react';
import { ClothingItem } from '../types';

interface WardrobeContextType {
  wardrobe: ClothingItem[];
  addToWardrobe: (item: ClothingItem) => void;
  removeFromWardrobe: (itemId: string) => void;
}

const WardrobeContext = createContext<WardrobeContextType | undefined>(undefined);

export const WardrobeProvider = ({ children }: { children: ReactNode }) => {
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);

  const addToWardrobe = (item: ClothingItem) => {
    setWardrobe(prev => {
      if (prev.some(i => i.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromWardrobe = (itemId: string) => {
    setWardrobe(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <WardrobeContext.Provider value={{ wardrobe, addToWardrobe, removeFromWardrobe }}>
      {children}
    </WardrobeContext.Provider>
  );
};

export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  if (context === undefined) {
    throw new Error('useWardrobe must be used within a WardrobeProvider');
  }
  return context;
};
