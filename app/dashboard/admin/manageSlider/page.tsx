import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getSliders } from "@/lib/api/slider";

interface Slider {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  link?: string;
  isActive: boolean;
  createdAt: string;
}

export default function SliderManagementPage() {
  const [sliders, setSliders] = useState<SliderInputs[]>(
    []
  );
  const [isEditing, setIsEditing] = useState(false);
  const sliderSchema = z.object({
    title: z.string().min(3, "Title is too short"),
    description: z.string().optional(),
    link: z.string().url("Invalid URL").optional(),
    imageUrl: z.string().url("Image URL is required"),
    isActive: z.boolean(),
  });
  type SliderInputs = z.infer<typeof sliderSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SliderInputs>({
    resolver: zodResolver(sliderSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      imageUrl: "",
      isActive: true,
    },
  });
  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const res = await getSliders();
      const data = await res.json();
      setSliders(data);
    } catch (err: unknown) {
      console.log(err as Error);
      toast.error("Failed to load sliders.");
    }
  };

  const handleSave = async () => {
    const fileSize = await getImageSize(form.imageUrl);
    if (fileSize > 2 * 1024 * 1024) {
      return toast.error("Image must be less than 2MB.");
    }
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing
        ? `/api/sliders/${form.id}`
        : "/api/sliders";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success(
          `Slider ${
            isEditing ? "updated" : "created"
          } successfully.`
        );
        fetchSliders();
        setForm({
          title: "",
          imageUrl: "",
          description: "",
          link: "",
          isActive: true,
        });
        setIsEditing(false);
      } else {
        toast.error("Something went wrong.");
      }
    } catch {
      toast.error("Error while saving slider.");
    }
  };

  const handleEdit = (slider: Slider) => {
    setForm({ ...slider });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this slider?"
      )
    )
      return;
    try {
      const res = await fetch(`/api/sliders/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Slider deleted.");
        fetchSliders();
      } else {
        toast.error("Failed to delete.");
      }
    } catch {
      toast.error("Error deleting slider.");
    }
  };

  const getImageSize = async (
    url: string
  ): Promise<number> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob.size;
  };

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader className="text-xl font-bold">
          {isEditing ? "Edit Slider" : "Add New Slider"}
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            name="title"
            value={form.title}
            onChange={handleInput}
            placeholder="Title"
          />
          <Input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleInput}
            placeholder="Image URL (max 2MB)"
          />
          <Textarea
            name="description"
            value={form.description}
            onChange={handleInput}
            placeholder="Description (optional)"
          />
          <Input
            name="link"
            value={form.link}
            onChange={handleInput}
            placeholder="Link (optional)"
          />
          <div className="flex items-center gap-2">
            <Switch
              checked={form.isActive}
              onCheckedChange={(val) =>
                setForm({ ...form, isActive: val })
              }
            />
            <span>Is Active?</span>
          </div>
          <Button onClick={handleSave}>
            {isEditing ? "Update" : "Create"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="text-xl font-bold">
          Slider List
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sliders.map((s) => (
                  <tr key={s.id} className="border-b">
                    <td>
                      <Image
                        src={s.imageUrl}
                        alt={s.title}
                        width={80}
                        height={40}
                        className="object-cover"
                      />
                    </td>
                    <td>{s.title}</td>
                    <td>
                      {s.isActive ? "Active" : "Inactive"}
                    </td>
                    <td>
                      {new Date(
                        s.createdAt
                      ).toLocaleDateString()}
                    </td>
                    <td className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleEdit(s)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(s.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
