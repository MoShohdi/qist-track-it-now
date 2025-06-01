
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Navigation } from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Bell, Globe, Shield, LogOut, Crown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Profile = () => {
  const { language, setLanguage } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);

  // Mock user data - in real app this would come from authentication
  const user = {
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    phone: "+20 100 123 4567",
    plan: "Qist Plus",
    joinDate: "March 2025"
  };

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    setLanguage(newLanguage);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Logout logic will be added when Supabase is connected
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-teal-100 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-teal-600" />
            <h1 className="text-2xl font-bold text-teal-900">Profile</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pb-20 pt-6 space-y-6">
        {/* User Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" />
                <AvatarFallback className="bg-teal-100 text-teal-700 text-lg font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    <Crown className="h-3 w-3 mr-1" />
                    {user.plan}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">Member since {user.joinDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-teal-900">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Language Setting */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Language</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleLanguageChange('en')}
                  className={language === 'en' ? 'bg-teal-600 hover:bg-teal-700' : ''}
                >
                  English
                </Button>
                <Button
                  variant={language === 'ar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleLanguageChange('ar')}
                  className={language === 'ar' ? 'bg-teal-600 hover:bg-teal-700' : ''}
                >
                  العربية
                </Button>
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Push Notifications</span>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            {/* Biometric Login */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Biometric Login</span>
              </div>
              <Switch
                checked={biometric}
                onCheckedChange={setBiometric}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Privacy & Security
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500">
          <p>Qist v1.0.0</p>
          <p>Made with ❤️ for Egypt</p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Profile;
