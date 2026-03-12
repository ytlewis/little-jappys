import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/storage";

interface Sitter {
  id: string;
  name: string;
  experience: string;
  rate: number;
  image: string;
  availability?: string;
}

const SittersManager = () => {
  const [sitters, setSitters] = useState<Sitter[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSitter, setEditingSitter] = useState<Sitter | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    rate: "",
    image: "",
    availability: "",
  });

  useEffect(() => {
    loadSitters();
  }, []);

  const loadSitters = () => {
    const stored = getFromLocalStorage<Sitter[]>("littlejappy_sitters");
    if (stored) {
      setSitters(stored);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const sitterData: Sitter = {
      id: editingSitter?.id || `s${Date.now()}`,
      name: formData.name,
      experience: formData.experience,
      rate: parseFloat(formData.rate),
      image: formData.image || "/placeholder.svg",
      availability: formData.availability || undefined,
    };

    let updatedSitters: Sitter[];
    if (editingSitter) {
      updatedSitters = sitters.map(s => s.id === editingSitter.id ? sitterData : s);
      toast({ title: "Sitter Updated", description: "Sitter has been updated successfully." });
    } else {
      updatedSitters = [...sitters, sitterData];
      toast({ title: "Sitter Added", description: "New sitter has been added successfully." });
    }

    saveToLocalStorage("littlejappy_sitters", updatedSitters);
    setSitters(updatedSitters);
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (sitter: Sitter) => {
    setEditingSitter(sitter);
    setFormData({
      name: sitter.name,
      experience: sitter.experience,
      rate: sitter.rate.toString(),
      image: sitter.image,
      availability: sitter.availability || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const updatedSitters = sitters.filter(s => s.id !== id);
    saveToLocalStorage("littlejappy_sitters", updatedSitters);
    setSitters(updatedSitters);
    toast({ title: "Sitter Deleted", description: "Sitter has been removed." });
  };

  const resetForm = () => {
    setFormData({ name: "", experience: "", rate: "", image: "", availability: "" });
    setEditingSitter(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Babysitters Management</CardTitle>
            <CardDescription>Add, edit, or remove babysitters</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-teal-600 hover:bg-teal-700">
                <Plus className="h-4 w-4" />
                Add Sitter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingSitter ? "Edit Sitter" : "Add New Sitter"}</DialogTitle>
                <DialogDescription>
                  {editingSitter ? "Update sitter details" : "Enter the details for the new sitter"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g., 5 years"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rate">Hourly Rate ($)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.01"
                    value={formData.rate}
                    onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/placeholder.svg"
                  />
                </div>
                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    placeholder="e.g., Weekdays, Weekends"
                  />
                </div>
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                  {editingSitter ? "Update Sitter" : "Add Sitter"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sitters.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No sitters found. Add your first sitter!
                </TableCell>
              </TableRow>
            ) : (
              sitters.map((sitter) => (
                <TableRow key={sitter.id}>
                  <TableCell>
                    <img src={sitter.image} alt={sitter.name} className="w-12 h-12 object-cover rounded-full" />
                  </TableCell>
                  <TableCell className="font-medium">{sitter.name}</TableCell>
                  <TableCell>{sitter.experience}</TableCell>
                  <TableCell>${sitter.rate.toFixed(2)}/hr</TableCell>
                  <TableCell>{sitter.availability || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(sitter)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(sitter.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SittersManager;
