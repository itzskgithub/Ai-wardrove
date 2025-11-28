import { useNavigate } from 'react-router-dom';
import { Scan, ShoppingBag, Sparkles, Calendar, User as UserIcon } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const actions = [
    {
      title: 'Scan My Appearance',
      description: 'Upload a photo to analyze your body type, color tone, and style',
      icon: Scan,
      path: '/scan',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'My Wardrobe',
      description: 'View and manage your saved clothing items and outfits',
      icon: ShoppingBag,
      path: '/wardrobe',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Recommended Outfits',
      description: 'Get AI-powered outfit suggestions based on your style',
      icon: Sparkles,
      path: '/recommendations',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Occasion Selector',
      description: 'Choose an event to get outfit recommendations',
      icon: Calendar,
      path: '/occasion',
      color: 'bg-violet-50 text-violet-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <Card className="p-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                {user?.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center border-4 border-white shadow-lg">
                    <UserIcon className="w-12 h-12 text-slate-500" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-slate-600">
                  {user?.bio || 'Ready to discover your perfect style?'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">What would you like to do?</h2>
          <p className="text-slate-600">Choose an action to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {actions.map((action) => (
            <Card
              key={action.path}
              onClick={() => navigate(action.path)}
              hover
              className="p-6 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-xl ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
