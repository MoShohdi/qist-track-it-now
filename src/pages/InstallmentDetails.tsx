
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, CreditCard, TrendingDown, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SegmentedProgress } from "@/components/SegmentedProgress";

const InstallmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app this would fetch from database by ID
  const installments = [
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
      daysUntilDue: 14,
      purchaseDate: "2024-02-15"
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
      daysOverdue: 4,
      purchaseDate: "2024-12-05"
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
      daysUntilDue: 19,
      purchaseDate: "2024-04-20"
    }
  ];

  const installment = installments.find(item => item.id === Number(id));

  if (!installment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Installment not found</h2>
          <Button onClick={() => navigate('/')} className="bg-teal-600 hover:bg-teal-700">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Generate payment history
  const generatePaymentHistory = () => {
    const payments = [];
    const startDate = new Date(installment.purchaseDate);
    
    for (let i = 0; i < installment.totalInstallments; i++) {
      const paymentDate = new Date(startDate);
      paymentDate.setMonth(paymentDate.getMonth() + i + 1);
      
      payments.push({
        id: i + 1,
        dueDate: paymentDate,
        amount: installment.monthlyPayment,
        isPaid: i < installment.paidInstallments,
        paidDate: i < installment.paidInstallments ? paymentDate : null
      });
    }
    
    return payments;
  };

  const paymentHistory = generatePaymentHistory();
  const remainingDebt = installment.totalAmount - installment.paidAmount;
  const isCompleted = installment.paidInstallments === installment.totalInstallments;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-teal-100 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5 text-teal-700" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-teal-900">Installment Details</h1>
            <p className="text-sm text-teal-600">{installment.storeName}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Item Overview */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{installment.itemName}</h2>
              <p className="text-sm text-gray-600 mb-3">{installment.storeName}</p>
              {isCompleted ? (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  ✨ Fully Paid! ✨
                </Badge>
              ) : installment.isOverdue ? (
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  {installment.daysOverdue} days overdue
                </Badge>
              ) : (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  Due in {installment.daysUntilDue} days
                </Badge>
              )}
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{installment.paidInstallments} of {installment.totalInstallments} payments made</span>
              </div>
              <SegmentedProgress 
                current={installment.paidInstallments} 
                total={installment.totalInstallments} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-4 w-4 text-teal-600" />
                <span className="text-sm font-medium text-gray-700">Total Amount</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(installment.totalAmount)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">Remaining</span>
              </div>
              <p className="text-lg font-semibold text-orange-600">{formatCurrency(remainingDebt)}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Monthly Payment</span>
            </div>
            <p className="text-lg font-semibold text-blue-600">{formatCurrency(installment.monthlyPayment)}</p>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-teal-900">Payment History</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      payment.isPaid ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {payment.isPaid ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <X className="h-3 w-3 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Payment #{payment.id}</p>
                      <p className="text-xs text-gray-500">Due: {formatDate(payment.dueDate.toISOString())}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(payment.amount)}</p>
                    <p className={`text-xs ${payment.isPaid ? 'text-green-600' : 'text-gray-500'}`}>
                      {payment.isPaid ? 'Paid' : 'Pending'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default InstallmentDetails;
