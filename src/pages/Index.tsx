
import { useState, useEffect } from "react";
import { Plus, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SwipeableInstallmentCard } from "@/components/SwipeableInstallmentCard";
import { EmptyState } from "@/components/EmptyState";
import { SummaryCards } from "@/components/SummaryCards";
import { Navigation } from "@/components/Navigation";
import { Onboarding } from "@/components/Onboarding";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [installments, setInstallments] = useState([
    {
      id: 1,
      storeName: "Carrefour Egypt",
      itemName: "Samsung Galaxy S24",
      totalAmount: 35000,
      paidAmount: 14000,
      totalInstallments: 12,
      paidInstallments: 4,
      monthlyPayment: 2916,
      nextDueDate: "2025-06-15",
      isOverdue: false,
      daysUntilDue: 14
    },
    {
      id: 2,
      storeName: "IKEA Egypt",
      itemName: "Living Room Furniture Set",
      totalAmount: 18000,
      paidAmount: 9000,
      totalInstallments: 6,
      paidInstallments: 3,
      monthlyPayment: 3000,
      nextDueDate: "2025-06-05",
      isOverdue: true,
      daysOverdue: 4
    },
    {
      id: 3,
      storeName: "B.TECH Egypt",
      itemName: "Laptop Dell Inspiron",
      totalAmount: 25000,
      paidAmount: 5000,
      totalInstallments: 10,
      paidInstallments: 2,
      monthlyPayment: 2500,
      nextDueDate: "2025-06-20",
      isOverdue: false,
      daysUntilDue: 19
    }
  ]);

  // Check if user is new (in real app, this would check local storage or user profile)
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('qist_onboarding_completed');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('qist_onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  const totalMonthlyPayment = installments.reduce((sum, item) => sum + item.monthlyPayment, 0);
  const totalOutstanding = installments.reduce((sum, item) => sum + (item.totalAmount - item.paidAmount), 0);
  const overdueCount = installments.filter(item => item.isOverdue).length;

  const handleMarkAsPaid = (id: number) => {
    setInstallments(prev => 
      prev.map(item => {
        if (item.id === id && item.paidInstallments < item.totalInstallments) {
          const newPaidInstallments = item.paidInstallments + 1;
          const newPaidAmount = newPaidInstallments * item.monthlyPayment;
          return {
            ...item,
            paidInstallments: newPaidInstallments,
            paidAmount: newPaidAmount,
            isOverdue: false
          };
        }
        return item;
      })
    );
  };

  const handleAddItem = () => {
    navigate('/add-item');
  };

  // Show onboarding if user is new
  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-teal-100 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-teal-900">Qist</h1>
            <p className="text-sm text-teal-600">Payment Tracker</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-teal-700" />
              {overdueCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                  {overdueCount}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
              <User className="h-5 w-5 text-teal-700" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pb-20">
        {/* Summary Cards */}
        <SummaryCards 
          totalMonthlyPayment={totalMonthlyPayment}
          totalOutstanding={totalOutstanding}
          overdueCount={overdueCount}
        />

        {/* Installments Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-teal-900">Your Installments</h2>
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={handleAddItem}>
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
          </div>

          {installments.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                💡 Tip: Swipe left to mark as paid, swipe right to view details
              </p>
              {installments.map((installment) => (
                <SwipeableInstallmentCard 
                  key={installment.id}
                  installment={installment}
                  onMarkAsPaid={handleMarkAsPaid}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Index;
