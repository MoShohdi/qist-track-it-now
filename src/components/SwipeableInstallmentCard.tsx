
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Eye, AlertTriangle, Store, Clock } from "lucide-react";
import { SegmentedProgress } from "./SegmentedProgress";
import { useNavigate } from "react-router-dom";

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

interface SwipeableInstallmentCardProps {
  installment: Installment;
  onMarkAsPaid: (id: number) => void;
}

export const SwipeableInstallmentCard = ({ installment, onMarkAsPaid }: SwipeableInstallmentCardProps) => {
  const navigate = useNavigate();
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const startX = touch.clientX;
    // Simple swipe detection - in a real app you'd want more sophisticated gesture handling
    setSwipeOffset(Math.max(-100, Math.min(100, startX - 200)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (swipeOffset > 50) {
      // Swipe right - view details
      navigate(`/installment/${installment.id}`);
    } else if (swipeOffset < -50 && !isCompleted) {
      // Swipe left - mark as paid
      onMarkAsPaid(installment.id);
    }
    
    setSwipeOffset(0);
  };

  const handleCardClick = () => {
    if (!isDragging && swipeOffset === 0) {
      navigate(`/installment/${installment.id}`);
    }
  };

  return (
    <div className="relative">
      {/* Swipe Actions Background */}
      <div className="absolute inset-0 flex">
        <div className="flex-1 bg-teal-100 flex items-center justify-start pl-4">
          <Eye className="h-5 w-5 text-teal-600" />
          <span className="ml-2 text-teal-700 font-medium">View</span>
        </div>
        {!isCompleted && (
          <div className="flex-1 bg-green-100 flex items-center justify-end pr-4">
            <span className="mr-2 text-green-700 font-medium">Paid</span>
            <Check className="h-5 w-5 text-green-600" />
          </div>
        )}
      </div>

      {/* Main Card */}
      <Card 
        className={`transition-all hover:shadow-md cursor-pointer relative z-10 ${
          installment.isOverdue ? 'border-red-200 bg-red-50' : 
          isCompleted ? 'border-green-200 bg-green-50' : 'border-teal-200'
        }`}
        style={{ transform: `translateX(${swipeOffset}px)` }}
        onClick={handleCardClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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

          {/* Quick Actions */}
          <div className="flex gap-2">
            {!isCompleted && (
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsPaid(installment.id);
                }}
                className="flex-1 bg-teal-600 hover:bg-teal-700"
                size="sm"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark as Paid
              </Button>
            )}
            
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/installment/${installment.id}`);
              }}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>

          {isCompleted && (
            <div className="text-center py-2">
              <Badge className="bg-green-100 text-green-800 border-green-200 text-sm">
                ✨ Fully Paid! ✨
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
