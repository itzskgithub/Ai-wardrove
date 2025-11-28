import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User as UserIcon, Mail, Edit2, Lock } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');

  const handleSave = () => {
    setIsEditing(false);
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Profile</h1>
          <p className="text-slate-600">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-center">
                {user?.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                    <UserIcon className="w-16 h-16 text-slate-500" />
                  </div>
                )}
                <h2 className="text-xl font-bold text-slate-900 mb-1">{user?.name}</h2>
                <p className="text-slate-600 text-sm mb-4">{user?.email}</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Edit2 className="w-4 h-4" />
                  Change Photo
                </Button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Personal Information</h3>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <UserIcon className="w-5 h-5 text-slate-400 mt-2" />
                  <div className="flex-1">
                    {isEditing ? (
                      <Input
                        label="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    ) : (
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Full Name</p>
                        <p className="text-slate-900 font-medium">{user?.name}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-slate-400 mt-2" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 mb-1">Email Address</p>
                    <p className="text-slate-900 font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Edit2 className="w-5 h-5 text-slate-400 mt-2" />
                  <div className="flex-1">
                    {isEditing ? (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                        />
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Bio</p>
                        <p className="text-slate-900">{user?.bio || 'No bio added yet'}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Style Profile</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Body Type</p>
                  <p className="text-slate-900 font-medium">
                    {user?.bodyType || 'Not analyzed yet'}
                  </p>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Color Tone</p>
                  <p className="text-slate-900 font-medium">
                    {user?.colorTone || 'Not analyzed yet'}
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Style</p>
                  <p className="text-slate-900 font-medium">
                    {user?.style || 'Not analyzed yet'}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/scan')}
              >
                Update Style Profile
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Security</h3>
              <Button variant="outline" className="w-full">
                <Lock className="w-4 h-4" />
                Change Password
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
