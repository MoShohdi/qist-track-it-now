
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AddItem = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    itemName: "",
    storeName: "",
    totalAmount: "",
    downPayment: "",
    installmentCount: "",
    paymentFrequency: "monthly",
    notes: ""
  });

  const [calculatedPayment, setCalculatedPayment] = useState<number | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-calculate monthly payment when relevant fields change
    if (field === "totalAmount" || field === "downPayment" || field === "installmentCount") {
      const total = parseFloat(formData.totalAmount || "0");
      const down = parseFloat(formData.downPayment || "0");
      const installments = parseFloat(formData.installmentCount || "0");
      
      if (total > 0 && installments > 0) {
        const remaining = total - down;
        const monthly = remaining / installments;
        setCalculatedPayment(monthly);
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.itemName || !formData.storeName || !formData.totalAmount || !formData.installmentCount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // For now, we'll just show a success message and navigate back
    // In the future, this will save to Supabase
    toast({
      title: "Item Added Successfully!",
      description: `${formData.itemName} has been added to your installments.`,
    });
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-teal-100 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5 text-teal-700" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-teal-900">Add New Item</h1>
            <p className="text-sm text-teal-600">Track a new installment plan</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-teal-900">Item Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="itemName">Item Name *</Label>
                <Input
                  id="itemName"
                  placeholder="e.g., Samsung Galaxy S24"
                  value={formData.itemName}
                  onChange={(e) => handleInputChange("itemName", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="storeName">Store Name *</Label>
                <Input
                  id="storeName"
                  placeholder="e.g., Carrefour Egypt"
                  value={formData.storeName}
                  onChange={(e) => handleInputChange("storeName", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional details..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-teal-900">Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="totalAmount">Total Amount (EGP) *</Label>
                <Input
                  id="totalAmount"
                  type="number"
                  placeholder="35000"
                  value={formData.totalAmount}
                  onChange={(e) => handleInputChange("totalAmount", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="downPayment">Down Payment (EGP)</Label>
                <Input
                  id="downPayment"
                  type="number"
                  placeholder="5000"
                  value={formData.downPayment}
                  onChange={(e) => handleInputChange("downPayment", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="installmentCount">Number of Installments *</Label>
                <Input
                  id="installmentCount"
                  type="number"
                  placeholder="12"
                  value={formData.installmentCount}
                  onChange={(e) => handleInputChange("installmentCount", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="paymentFrequency">Payment Frequency</Label>
                <Select value={formData.paymentFrequency} onValueChange={(value) => handleInputChange("paymentFrequency", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Calculated Payment Display */}
              {calculatedPayment && (
                <Card className="bg-teal-50 border-teal-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="h-4 w-4 text-teal-600" />
                      <span className="text-sm font-medium text-teal-700">Calculated Payment</span>
                    </div>
                    <p className="text-lg font-semibold text-teal-900">
                      {formatCurrency(calculatedPayment)} per {formData.paymentFrequency === "monthly" ? "month" : "week"}
                    </p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-lg py-6">
            <Plus className="h-5 w-5 mr-2" />
            Add to My Installments
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AddItem;
