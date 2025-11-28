import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Sparkles, PartyPopper, Heart, Trophy, Coffee, Dumbbell } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { OccasionType } from '../types';

export const Occasion = () => {
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType | null>(null);
  const navigate = useNavigate();

  const occasions = [
    {
      type: 'casual' as OccasionType,
      title: 'Casual',
      description: 'Everyday comfortable wear',
      icon: Coffee,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      selectedColor: 'bg-blue-100 border-blue-500',
    },
    {
      type: 'formal' as OccasionType,
      title: 'Formal',
      description: 'Business meetings and formal events',
      icon: Briefcase,
      color: 'bg-slate-50 text-slate-600 border-slate-200',
      selectedColor: 'bg-slate-100 border-slate-500',
    },
    {
      type: 'festival' as OccasionType,
      title: 'Festival',
      description: 'Cultural celebrations and festivals',
      icon: Sparkles,
      color: 'bg-violet-50 text-violet-600 border-violet-200',
      selectedColor: 'bg-violet-100 border-violet-500',
    },
    {
      type: 'wedding' as OccasionType,
      title: 'Wedding',
      description: 'Wedding ceremonies and receptions',
      icon: Heart,
      color: 'bg-pink-50 text-pink-600 border-pink-200',
      selectedColor: 'bg-pink-100 border-pink-500',
    },
    {
      type: 'party' as OccasionType,
      title: 'Party',
      description: 'Social gatherings and celebrations',
      icon: PartyPopper,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      selectedColor: 'bg-amber-100 border-amber-500',
    },
    {
      type: 'office' as OccasionType,
      title: 'Office',
      description: 'Professional workplace attire',
      icon: Briefcase,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      selectedColor: 'bg-emerald-100 border-emerald-500',
    },
    {
      type: 'sports' as OccasionType,
      title: 'Sports',
      description: 'Athletic and workout clothing',
      icon: Dumbbell,
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      selectedColor: 'bg-orange-100 border-orange-500',
    },
  ];

  const handleGenerate = () => {
    if (selectedOccasion) {
      navigate(`/recommendations?occasion=${selectedOccasion}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Select an Occasion</h1>
          <p className="text-slate-600">
            Choose the event type to get personalized outfit recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {occasions.map((occasion) => (
            <Card
              key={occasion.type}
              onClick={() => setSelectedOccasion(occasion.type)}
              className={`p-6 cursor-pointer border-2 transition-all duration-200 ${
                selectedOccasion === occasion.type
                  ? occasion.selectedColor
                  : 'hover:scale-105'
              }`}
            >
              <div className="text-center">
                <div className={`inline-flex p-4 rounded-xl mb-4 ${occasion.color}`}>
                  <occasion.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {occasion.title}
                </h3>
                <p className="text-sm text-slate-600">
                  {occasion.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleGenerate}
            disabled={!selectedOccasion}
            size="lg"
            className="min-w-[300px]"
          >
            <Sparkles className="w-5 h-5" />
            Generate Outfit Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};
