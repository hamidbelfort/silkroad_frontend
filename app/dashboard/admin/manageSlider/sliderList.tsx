"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { deleteSlider, getSliders } from "@/lib/api/slider";
import { Slider } from "@/lib/types/slider";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
type SliderListProps = {
  refreshFlag: boolean;
};
const SliderList = ({ refreshFlag }: SliderListProps) => {
  const [sliders, setSliders] = useState<Slider[]>([]);
  useEffect(() => {
    fetchSliders();
  }, [refreshFlag]);

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
  const onDelete = async (id: string) => {
    try {
      await deleteSlider(id);
      toast.success("Slider deleted!");
      fetchSliders();
    } catch {
      toast.error("Delete failed.");
    }
  };
  return (
    <div className="lg:max-w-6xl sm:w-fit mx-auto space-y-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Slider List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sliders.map((slider) => (
              <div
                key={slider.id}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={slider.imageUrl!}
                    alt={slider.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{slider.title}</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(slider.createdAt), "yyyy-MM-dd")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <ConfirmDialog
                    trigger={<Button variant="destructive"></Button>}
                    title="Delete slider?"
                    description="Are you sure you want to delete this slider? This action is irreversible."
                    confirmText="Yes, Delete"
                    cancelText="Cancel"
                    variant="destructive"
                    onConfirm={() => onDelete(slider.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SliderList;
