import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Eye, ShoppingBag } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useWardrobe } from '../context/WardrobeContext';

export const Wardrobe = () => {
  const { wardrobe, removeFromWardrobe } = useWardrobe();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Wardrobe</h1>
          <p className="text-slate-600">
            Your saved clothing items and wishlist ({wardrobe.length} items)
          </p>
        </div>

        {wardrobe.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Your wardrobe is empty
              </h3>
              <p className="text-slate-600 mb-6">
                Start adding clothing items from recommendations to build your collection
              </p>
              <Button onClick={() => navigate('/recommendations')}>
                Browse Recommendations
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wardrobe.map((item) => (
              <Card key={item.id} className="overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mb-4">
                    <Badge variant="default">{item.category}</Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {}}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromWardrobe(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
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
