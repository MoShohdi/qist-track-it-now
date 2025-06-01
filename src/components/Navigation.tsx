
import { Button } from "@/components/ui/button";
import { Home, Plus, Calendar, User, BarChart3 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-teal-100 px-4 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex flex-col items-center gap-1 ${
            isActive('/') ? 'text-teal-600 bg-teal-50' : 'text-gray-600'
          }`}
          onClick={() => navigate('/')}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex flex-col items-center gap-1 ${
            isActive('/calendar') ? 'text-teal-600 bg-teal-50' : 'text-gray-600'
          }`}
          onClick={() => navigate('/calendar')}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs">Calendar</span>
        </Button>
        
        <Button 
          size="sm" 
          className="bg-teal-600 hover:bg-teal-700 rounded-full p-3 relative -top-2 shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex flex-col items-center gap-1 ${
            isActive('/analytics') ? 'text-teal-600 bg-teal-50' : 'text-gray-600'
          }`}
          onClick={() => navigate('/analytics')}
        >
          <BarChart3 className="h-5 w-5" />
          <span className="text-xs">Analytics</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex flex-col items-center gap-1 ${
            isActive('/profile') ? 'text-teal-600 bg-teal-50' : 'text-gray-600'
          }`}
          onClick={() => navigate('/profile')}
        >
          <User className="h-5 w-5" />
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </nav>
  );
};
