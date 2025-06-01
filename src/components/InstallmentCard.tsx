
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Clock, AlertTriangle, Store } from "lucide-react";
import { SegmentedProgress } from "./SegmentedProgress";

interface Installment {
  id: number;
  storeName: string;
  itemName: string;
  totalAmount: number;
  paidAmount: number;
  totalInstallments: number;
  paidInstallments: number;
  monthlyPayment: number;
  nextDueDate: string;
  isOverdue: boolean;
  daysUntilDue?: number;
  daysOverdue?: number;
}

interface InstallmentCardProps {
  installment: Installment;
  onMarkAsPaid: (id: number) => void;
}

export const InstallmentCard = ({ installment, onMarkAsPaid }: InstallmentCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isCompleted = installment.paidInstallments === installment.totalInstallments;

  const getStatusBadge = () => {
    if (isCompleted) {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
    }
    if (installment.isOverdue) {
      return <Badge className="bg-red-100 text-red-800 border-red-200">
        <AlertTriangle className="h-3 w-3 mr-1" />
        {installment.daysOverdue} days overdue
      </Badge>;
    }
    return <Badge className="bg-blue-100 text-blue-800 border-blue-200">
      <Clock className="h-3 w-3 mr-1" />
      Due in {installment.daysUntilDue} days
    </Badge>;
  };

  return (
    <Card className={`transition-all hover:shadow-md ${
      installment.isOverdue ? 'border-red-200 bg-red-50' : 
      isCompleted ? 'border-green-200 bg-green-50' : 'border-teal-200'
    }`}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Store className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{installment.storeName}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{installment.itemName}</h3>
            {getStatusBadge()}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{installment.paidInstallments} of {installment.totalInstallments} paid</span>
          </div>
          <SegmentedProgress 
            current={installment.paidInstallments} 
            total={installment.totalInstallments} 
            className="mb-2"
          />
        </div>

        {/* Payment Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Monthly Payment</p>
            <p className="font-semibold text-teal-900">{formatCurrency(installment.monthlyPayment)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Remaining</p>
            <p className="font-semibold text-gray-900">
              {formatCurrency(installment.totalAmount - installment.paidAmount)}
            </p>
          </div>
        </div>

        {/* Action Button */}
        {!isCompleted && (
          <Button 
            onClick={() => onMarkAsPaid(installment.id)}
            className="w-full bg-teal-600 hover:bg-teal-700"
            size="sm"
          >
            <Check className="h-4 w-4 mr-2" />
            Mark as Paid
          </Button>
        )}

        {isCompleted && (
          <div className="text-center py-2">
            <Badge className="bg-green-100 text-green-800 border-green-200 text-sm">
              ✨ Fully Paid! ✨
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
