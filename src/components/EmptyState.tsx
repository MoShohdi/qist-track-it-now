
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard } from "lucide-react";

export const EmptyState = () => {
  return (
    <Card className="border-teal-200 border-dashed">
      <CardContent className="p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
          <CreditCard className="h-8 w-8 text-teal-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No installments yet</h3>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          Start tracking your installment payments by adding your first item. Stay organized and never miss a payment!
        </p>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Your First Item
        </Button>
      </CardContent>
    </Card>
  );
};
