
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, CreditCard, Calendar, DollarSign } from "lucide-react";

const Analytics = () => {
  // Mock data - in real app this would come from your database
  const monthlyData = [
    { month: "Jan", amount: 8500 },
    { month: "Feb", amount: 7200 },
    { month: "Mar", amount: 9800 },
    { month: "Apr", amount: 6500 },
    { month: "May", amount: 8400 },
    { month: "Jun", amount: 7800 },
  ];

  const categoryData = [
    { name: "Electronics", value: 45000, color: "#0d9488" },
    { name: "Furniture", value: 18000, color: "#14b8a6" },
    { name: "Appliances", value: 12000, color: "#2dd4bf" },
    { name: "Others", value: 8000, color: "#5eead4" },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-teal-100 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-teal-600" />
            <h1 className="text-2xl font-bold text-teal-900">Analytics</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pb-20 pt-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-teal-600" />
                <span className="text-sm text-gray-600">Total Paid</span>
              </div>
              <p className="text-xl font-bold text-teal-900">{formatCurrency(28000)}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-4 w-4 text-teal-600" />
                <span className="text-sm text-gray-600">Remaining</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(55000)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Payments Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-teal-900">Monthly Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="amount" fill="#0d9488" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-teal-900">Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-teal-900">Payment Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">May 2025</span>
              </div>
              <span className="text-sm font-semibold text-green-800">{formatCurrency(8400)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Jun 2025</span>
              </div>
              <span className="text-sm font-semibold text-blue-800">{formatCurrency(7800)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">Jul 2025</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{formatCurrency(8200)}</span>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Analytics;
