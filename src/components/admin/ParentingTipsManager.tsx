import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ParentingTipsManager = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Parenting Tips Management</CardTitle>
            <CardDescription>Add, edit, or remove parenting tips and resources</CardDescription>
          </div>
          <Button className="gap-2 bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4" />
            Add Tip
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center text-gray-500 py-8">
          No parenting tips yet. Add your first tip to help parents!
        </div>
      </CardContent>
    </Card>
  );
};

export default ParentingTipsManager;
