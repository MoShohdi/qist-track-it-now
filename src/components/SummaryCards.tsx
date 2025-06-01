
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, CreditCard } from "lucide-react";

interface SummaryCardsProps {
  totalMonthlyPayment: number;
  totalOutstanding: number;
  overdueCount: number;
}

export const SummaryCards = ({ totalMonthlyPayment, totalOutstanding, overdueCount }: SummaryCardsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 gap-4 my-6">
      {/* This Month's Payments */}
      <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm font-medium">This Month's Payments</p>
              <p className="text-2xl font-bold">{formatCurrency(totalMonthlyPayment)}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Outstanding & Overdue Alert */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-teal-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-teal-600" />
              <p className="text-xs text-gray-600 font-medium">Total Outstanding</p>
            </div>
            <p className="text-lg font-bold text-teal-900">{formatCurrency(totalOutstanding)}</p>
          </CardContent>
        </Card>

        {overdueCount > 0 && (
          <Card className="border-red-200 bg-red-50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <p className="text-xs text-red-700 font-medium">Overdue</p>
              </div>
              <p className="text-lg font-bold text-red-800">{overdueCount} Payment{overdueCount > 1 ? 's' : ''}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
