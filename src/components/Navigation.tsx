
import { Button } from "@/components/ui/button";
import { Home, Plus, Calendar, User, BarChart3 } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-teal-100 px-4 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-teal-600 bg-teal-50">
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-gray-600">
          <Calendar className="h-5 w-5" />
          <span className="text-xs">Calendar</span>
        </Button>
        
        <Button 
          size="sm" 
          className="bg-teal-600 hover:bg-teal-700 rounded-full p-3 relative -top-2 shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
        
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-gray-600">
          <BarChart3 className="h-5 w-5" />
          <span className="text-xs">Analytics</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-gray-600">
          <User className="h-5 w-5" />
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </nav>
  );
};
