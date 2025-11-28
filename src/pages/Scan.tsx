import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ImageUploader } from '../components/ui/ImageUploader';
import { Loader } from '../components/ui/Loader';

export const Scan = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    bodyType: string;
    colorTone: string;
    style: string;
  } | null>(null);
  const navigate = useNavigate();

  const handleImageSelect = (file: File, preview: string) => {
    setImageFile(file);
    setImagePreview(preview);
    setAnalysisResult(null);
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview('');
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;

    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setAnalysisResult({
        bodyType: 'Athletic',
        colorTone: 'Warm',
        style: 'Contemporary Casual',
      });
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Scan Your Appearance</h1>
          <p className="text-slate-600">
            Upload a full-body photo and let our AI analyze your appearance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Upload Photo</h2>
            <ImageUploader
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove}
              preview={imagePreview}
            />

            {imageFile && !isAnalyzing && !analysisResult && (
              <Button
                onClick={handleAnalyze}
                className="w-full mt-6"
              >
                <Sparkles className="w-4 h-4" />
                Analyze My Appearance
              </Button>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">AI Analysis</h2>

            {!imageFile && (
              <div className="h-64 flex items-center justify-center text-slate-400 text-center">
                <div>
                  <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Upload a photo to get started</p>
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="h-64 flex flex-col items-center justify-center">
                <Loader size="lg" />
                <p className="text-slate-600 mt-4">Analyzing your appearance...</p>
              </div>
            )}

            {analysisResult && !isAnalyzing && (
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-1">Body Type</h3>
                  <p className="text-slate-700">{analysisResult.bodyType}</p>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-1">Color Tone</h3>
                  <p className="text-slate-700">{analysisResult.colorTone}</p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-1">Style Profile</h3>
                  <p className="text-slate-700">{analysisResult.style}</p>
                </div>

                <Button
                  onClick={() => navigate('/occasion')}
                  className="w-full"
                >
                  Continue to Outfit Recommendations
                </Button>
              </div>
            )}

            {imageFile && !isAnalyzing && !analysisResult && (
              <div className="h-64 flex items-center justify-center text-slate-400 text-center">
                <div>
                  <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Click "Analyze My Appearance" to start the AI analysis</p>
                  <p className="text-sm mt-2">This AI will analyze your body type, color tone, and style preferences</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
