
import { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { CalendarDays, Clock, AlertTriangle } from "lucide-react";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock payment data - in real app this would come from your database
  const payments = [
    {
      id: 1,
      date: "2025-06-05",
      storeName: "IKEA Egypt",
      itemName: "Living Room Furniture",
      amount: 3000,
      status: "overdue"
    },
    {
      id: 2,
      date: "2025-06-15",
      storeName: "Carrefour Egypt",
      itemName: "Samsung Galaxy S24",
      amount: 2916,
      status: "upcoming"
    },
    {
      id: 3,
      date: "2025-06-20",
      storeName: "B.TECH Egypt",
      itemName: "Laptop Dell Inspiron",
      amount: 2500,
      status: "upcoming"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue": return "bg-red-100 text-red-800 border-red-200";
      case "upcoming": return "bg-blue-100 text-blue-800 border-blue-200";
      case "paid": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "overdue": return <AlertTriangle className="h-3 w-3" />;
      case "upcoming": return <Clock className="h-3 w-3" />;
      default: return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-teal-100 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-teal-600" />
            <h1 className="text-2xl font-bold text-teal-900">Payment Calendar</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pb-20 pt-6">
        {/* Calendar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full"
            />
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-teal-900">Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{payment.storeName}</span>
                    <Badge className={getStatusColor(payment.status)}>
                      {getStatusIcon(payment.status)}
                      {payment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{payment.itemName}</p>
                  <p className="text-xs text-gray-500">{formatDate(payment.date)}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-teal-900">{formatCurrency(payment.amount)}</p>
                  {payment.status === "overdue" && (
                    <Button size="sm" className="mt-1 bg-teal-600 hover:bg-teal-700">
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Calendar;
