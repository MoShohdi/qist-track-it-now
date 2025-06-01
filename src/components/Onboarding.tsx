
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Bell, Shield, ChevronRight, Check } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <CreditCard className="h-12 w-12 text-teal-600" />,
      title: "Welcome to Qist",
      description: "Track all your installment payments in one place. Never miss a payment again and stay on top of your finances.",
      action: "Get Started"
    },
    {
      icon: <Bell className="h-12 w-12 text-teal-600" />,
      title: "Smart Reminders",
      description: "Get notified 3 days before, 1 day before, and on your payment due dates. You can snooze reminders if needed.",
      action: "Enable Notifications"
    },
    {
      icon: <Shield className="h-12 w-12 text-teal-600" />,
      title: "Your Data is Safe",
      description: "All your financial information is encrypted and stored securely. You're in control of your data.",
      action: "Start Tracking"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index <= currentStep ? 'bg-teal-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <Card className="border-teal-200">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              {steps[currentStep].icon}
            </div>
            
            <h2 className="text-2xl font-bold text-teal-900 mb-4">
              {steps[currentStep].title}
            </h2>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              {steps[currentStep].description}
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={handleNext}
                className="w-full bg-teal-600 hover:bg-teal-700 text-lg py-6"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    {steps[currentStep].action}
                  </>
                ) : (
                  <>
                    {steps[currentStep].action}
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={handleSkip}
                className="w-full text-gray-500"
              >
                Skip for now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
