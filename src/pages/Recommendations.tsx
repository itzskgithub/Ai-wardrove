import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Loader } from '../components/ui/Loader';
import { useWardrobe } from '../context/WardrobeContext';
import { ClothingItem } from '../types';

export const Recommendations = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<ClothingItem[]>([]);
  const { addToWardrobe } = useWardrobe();
  const navigate = useNavigate();
  const occasion = searchParams.get('occasion') || 'casual';

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockRecommendations: ClothingItem[] = [
        {
          id: '1',
          name: 'Classic Navy Blazer',
          description: 'Timeless navy blazer perfect for formal occasions',
          imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Outerwear',
          occasion: ['formal', 'office', 'wedding'],
          aiConfidence: 95,
        },
        {
          id: '2',
          name: 'Slim Fit White Shirt',
          description: 'Crisp white cotton shirt for a polished look',
          imageUrl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Tops',
          occasion: ['formal', 'office', 'casual'],
          aiConfidence: 92,
        },
        {
          id: '3',
          name: 'Dark Denim Jeans',
          description: 'Versatile dark wash jeans for everyday wear',
          imageUrl: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Bottoms',
          occasion: ['casual', 'party'],
          aiConfidence: 88,
        },
        {
          id: '4',
          name: 'Leather Chelsea Boots',
          description: 'Premium leather boots for a sophisticated touch',
          imageUrl: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Footwear',
          occasion: ['formal', 'casual', 'office'],
          aiConfidence: 90,
        },
        {
          id: '5',
          name: 'Cotton Polo Shirt',
          description: 'Comfortable polo shirt for smart casual events',
          imageUrl: 'https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Tops',
          occasion: ['casual', 'sports'],
          aiConfidence: 87,
        },
        {
          id: '6',
          name: 'Tailored Trousers',
          description: 'Elegant trousers for professional settings',
          imageUrl: 'https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Bottoms',
          occasion: ['formal', 'office', 'wedding'],
          aiConfidence: 93,
        },
      ];

      setRecommendations(mockRecommendations);
      setIsLoading(false);
    };

    fetchRecommendations();
  }, [occasion]);

  const handleAddToWardrobe = (item: ClothingItem) => {
    addToWardrobe(item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="outline"
          onClick={() => navigate('/occasion')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Occasions
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Outfit Recommendations
          </h1>
          <p className="text-slate-600">
            AI-curated outfits for <span className="font-semibold capitalize">{occasion}</span> occasions
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader size="lg" />
            <p className="text-slate-600 mt-4">Finding the perfect outfits for you...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((item) => (
              <Card key={item.id} className="overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="success">
                      {item.aiConfidence}% Match
                    </Badge>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="default">{item.category}</Badge>
                    <Badge variant="info">
                      Suitable for: {item.occasion[0]}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToWardrobe(item)}
                      variant="outline"
                      className="flex-1"
                    >
                      <Heart className="w-4 h-4" />
                      Add to Wishlist
                    </Button>
                    <Button
                      onClick={() => {}}
                      className="flex-1"
                    >
                      <Sparkles className="w-4 h-4" />
                      Try Virtual Fit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
