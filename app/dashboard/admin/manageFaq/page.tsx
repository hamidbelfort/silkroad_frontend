"use client";
import { useState, useEffect } from "react";
import { FaqForm } from "./FaqForm";
import { FaqList } from "./FaqList";
import { FaqType } from "@/lib/types/faq";
import { DataState } from "@/components/ui/dataState";
import { createFaq, deleteFaq, getFaqs, updateFaq } from "@/lib/api/faq";
import { toast } from "sonner";
import Image from "next/image";
import nodataImage from "@/public/images/no-data.svg";
const FaqManagementPage = () => {
  const [faqs, setFaqs] = useState<FaqType[]>([]);
  const [isloading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqType | null>(null);
  const [submittingId, setSubmittingId] = useState<string>();
  const [isSubmitting, setSubmitting] = useState(false);

  const loadFaqs = async () => {
    try {
      setLoading(true);
      const data = await getFaqs();
      if (data && data.length > 0) {
        setFaqs(data);
        console.log(data);
        setLoading(false);
      } else {
        setLoading(false);
        setEmpty(true);
      }
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      loadFaqs();
    }, 3000);
  }, []);

  const handleSave = async (data: FaqType) => {
    try {
      if (editingFaq) {
        setSubmittingId(editingFaq.id);
        setSubmitting(true);
        const updated = await updateFaq(editingFaq.id!, data);
        if (updated && updated.success) {
          toast.success("FAQ updated successfully.");
          loadFaqs();
        }
      } else {
        setSubmitting(true);
        setSubmittingId("new");
        const created = await createFaq(data);
        if (created && created.success) {
          toast.success("FAQ created successfully.");
          loadFaqs();
        }
      }
      setSubmitting(false);
      setSubmittingId("");
      setEditingFaq(null);
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
      setSubmittingId(undefined);
    }
  };

  const handleEdit = (faq: FaqType) => {
    setEditingFaq(faq);
  };

  const handleDelete = async (id: string) => {
    try {
      setSubmittingId(id);
      console.log(`id : ${id}`);
      const res = await deleteFaq(id);
      if (res && res.success) {
        loadFaqs();
      } else {
        toast.error(res.message || "Something bad happened");
      }
    } catch (error) {
      toast.error("Error while deleting FAQ");
    } finally {
      setSubmittingId(undefined);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <FaqForm
        onSubmit={handleSave}
        initialData={editingFaq}
        submitting={isSubmitting}
      />
      {isloading || isError ? (
        <DataState isLoading={isloading} isError={isError} />
      ) : (
        <FaqList
          faqs={faqs}
          onEdit={handleEdit}
          onDelete={handleDelete}
          submittingId={submittingId}
        />
      )}
      {!isloading && isEmpty && (
        <div className="flex flex-col items-center mt-4">
          <Image alt="No Data" src={nodataImage} width={200} />
          <h3 className="text-muted-foreground mx-4 lg:text-md sm:text-sm">
            You have not added any FAQs yet
          </h3>
        </div>
      )}
    </div>
  );
};

export default FaqManagementPage;
