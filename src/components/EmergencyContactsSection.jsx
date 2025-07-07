import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Plus,
  Phone,
  Mail,
  Star,
  Edit,
  Trash2,
  Users,
  Heart,
  UserCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* 1) Local Zod schema for form validation (no @shared/schema import) */
/* ------------------------------------------------------------------ */
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),
  relationship: z.string().optional(),
  isPrimary: z.boolean().optional(),
});

/* Derive form data type (optional for autocomplete) */
const defaultValues = {
  name: "",
  phone: "",
  email: "",
  relationship: "",
  isPrimary: false,
};

export function EmergencyContactsSection() {
  /* ------------------------- local component state ------------------------- */
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  /* ---------------------------- hooks / helpers ---------------------------- */
  const queryClient = useQueryClient();

  /* ---------------------------- fetch contacts ----------------------------- */
  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["/api/emergency-contacts"],
  });

  /* ---------------------------- react‑hook‑form ---------------------------- */
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  /* --------------------------- create & update ----------------------------- */
  const createContactMutation = useMutation({
    mutationFn: async (data) =>
      (await apiRequest("POST", "/api/emergency-contacts", data)).json(),
    onSuccess: () => {
      toast.success("Emergency contact added successfully");
      queryClient.invalidateQueries({ queryKey: ["/api/emergency-contacts"] });
      setIsAddDialogOpen(false);
      setEditingContact(null);
      form.reset(defaultValues);
    },
    onError: () =>
       toast.error(
      "Failed to add contact",                                       
      { description: "Please check the information and try again" }
    ),
  });

  const updateContactMutation = useMutation({
    mutationFn: async ({ id, data }) =>
      (await apiRequest("PUT", `/api/emergency-contacts/${id}`, data)).json(),
    onSuccess: () => {
      toast.success("Contact updated successfully");
      queryClient.invalidateQueries({ queryKey: ["/api/emergency-contacts"] });
      setIsAddDialogOpen(false);
      setEditingContact(null);
      form.reset(defaultValues);
    },
  });

  /* ----------------------------- delete contact ---------------------------- */
  const deleteContactMutation = useMutation({
    mutationFn: async (id) =>
      (await apiRequest("DELETE", `/api/emergency-contacts/${id}`)).json(),
    onSuccess: () => {
      toast.success("Contact deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["/api/emergency-contacts"] });
    },
  });

  /* ----------------------- helpers for edit & UI --------------------------- */
  const onSubmit = (data) => {
    editingContact
      ? updateContactMutation.mutate({ id: editingContact.id, data })
      : createContactMutation.mutate(data);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    form.reset({
      name: contact.name,
      phone: contact.phone,
      email: contact.email || "",
      relationship: contact.relationship || "",
      isPrimary: Boolean(contact.isPrimary),
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this emergency contact?")) deleteContactMutation.mutate(id);
  };

  /* Icon by relationship */
  const relIcon = (rel) => {
    switch ((rel || "").toLowerCase()) {
      case "family":
      case "parent":
      case "child":
      case "spouse":
        return <Heart className="w-4 h-4 text-red-400" />;
      case "friend":
        return <Users className="w-4 h-4 text-blue-400" />;
      case "doctor":
        return <UserCheck className="w-4 h-4 text-green-400" />;
      default:
        return <Users className="w-4 h-4 text-slate-400" />;
    }
  };

  /* ------------------------------------------------------------------ */
  /*                              RENDER                                */
  /* ------------------------------------------------------------------ */
  return (
    <div className="max-w-6xl space-y-6">
      {/* Heading */}
      <header>
        <h2 className="text-2xl font-bold mb-2 text-white">
          Emergency Contacts
        </h2>
        <p className="text-slate-400">
          Manage your emergency contact list for crisis situations
        </p>
      </header>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          [
            Users,
            "Total Contacts",
            contacts.length,
            "bg-blue-500/20",
            "text-blue-400",
          ],
          [
            Star,
            "Primary Contacts",
            contacts.filter((c) => c.isPrimary).length,
            "bg-yellow-500/20",
            "text-yellow-400",
          ],
          [
            Phone,
            "With Phone",
            contacts.filter((c) => c.phone).length,
            "bg-green-500/20",
            "text-green-400",
          ],
        ].map(([Icon, label, count, bg, color], idx) => (
          <Card key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className={`p-2 ${bg} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{count}</p>
                  <p className="text-sm text-slate-400">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add / Edit Dialog trigger */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Contact List</h3>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[hsl(74,100%,40%)] hover:bg-[hsl(74,100%,35%)] text-black">
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </DialogTrigger>

          {/* Dialog content */}
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingContact ? "Edit Contact" : "Add Emergency Contact"}
              </DialogTitle>
            </DialogHeader>

            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="Enter full name"
                  className="bg-slate-700 border-slate-600 text-white"
                />
                {form.formState.errors.name && (
                  <p className="text-red-400 text-sm mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-white">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  {...form.register("phone")}
                  placeholder="+1 (555) 000-0000"
                  className="bg-slate-700 border-slate-600 text-white"
                />
                {form.formState.errors.phone && (
                  <p className="text-red-400 text-sm mt-1">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-white">
                  Email (Optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="email@example.com"
                  className="bg-slate-700 border-slate-600 text-white"
                />
                {form.formState.errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Relationship */}
              <div>
                <Label htmlFor="relationship" className="text-white">
                  Relationship
                </Label>
                <Select
                  onValueChange={(val) => form.setValue("relationship", val)}
                  defaultValue={form.getValues("relationship")}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "family",
                      "friend",
                      "spouse",
                      "parent",
                      "child",
                      "doctor",
                      "neighbor",
                      "colleague",
                      "other",
                    ].map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Primary switch */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="isPrimary"
                  checked={Boolean(form.watch("isPrimary"))}
                  onCheckedChange={(val) => form.setValue("isPrimary", !!val)}
                />
                <Label htmlFor="isPrimary" className="text-white">
                  Primary Contact (notified first)
                </Label>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <Button
                  type="submit"
                  disabled={
                    createContactMutation.isPending ||
                    updateContactMutation.isPending
                  }
                  className="bg-[hsl(74,100%,40%)] hover:bg-[hsl(74,100%,35%)] text-black flex-1"
                >
                  {editingContact ? "Update Contact" : "Add Contact"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setEditingContact(null);
                    form.reset(defaultValues);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contacts list */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardContent className="pt-6">
          {isLoading ? (
            /* Loading spinner */
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(74,100%,40%)] mx-auto" />
              <p className="text-slate-400 mt-2">Loading contacts…</p>
            </div>
          ) : contacts.length === 0 ? (
            /* Empty state */
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No Emergency Contacts
              </h3>
              <p className="text-slate-400 mb-4">
                Add your first emergency contact to get started
              </p>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-[hsl(74,100%,40%)] hover:bg-[hsl(74,100%,35%)] text-black"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Contact
              </Button>
            </div>
          ) : (
            /* List contacts */
            <div className="space-y-4">
              {contacts.map((c) => (
                <div
                  key={c.id}
                  className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-[hsl(74,100%,40%)]/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    {/* Left: avatar & info */}
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-slate-600 rounded-lg">
                        {relIcon(c.relationship)}
                      </div>
                      <div>
                        {/* Name + primary badge */}
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-white">{c.name}</h4>
                          {c.isPrimary && (
                            <Badge className="bg-yellow-600 text-white border-yellow-500">
                              <Star className="w-3 h-3 mr-1" />
                              Primary
                            </Badge>
                          )}
                        </div>

                        {/* Contact details */}
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="flex items-center space-x-1 text-sm text-slate-300">
                            <Phone className="w-3 h-3" />
                            <span>{c.phone}</span>
                          </span>
                          {c.email && (
                            <span className="flex items-center space-x-1 text-sm text-slate-300">
                              <Mail className="w-3 h-3" />
                              <span>{c.email}</span>
                            </span>
                          )}
                          {c.relationship && (
                            <Badge variant="outline" className="text-xs">
                              {c.relationship}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Edit / Delete */}
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(c)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(c.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
