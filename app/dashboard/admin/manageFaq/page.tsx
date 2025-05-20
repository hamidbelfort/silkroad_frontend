import { useState, useEffect } from "react";
import { FaqForm } from "./FaqForm";
import { FaqList } from "./FaqList";
import { z } from "zod";

const faqSchema = z.object({
  question: z.string().min(5, "Question is too short"),
  answer: z.string().min(5, "Answer is too short"),
});

const FaqManagementPage = () => {
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [errors, setErrors] = useState<{ question?: string; answer?: string }>(
    {}
  );

  useEffect(() => {
    setTimeout(() => {
      setFaqs([]); // Replace with actual fetched data
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = () => {
    const validation = faqSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors({
        question: fieldErrors.question?.[0],
        answer: fieldErrors.answer?.[0],
      });
      return;
    }

    setErrors({});

    if (editIndex !== null) {
      const updated = [...faqs];
      updated[editIndex] = formData;
      setFaqs(updated);
      setEditIndex(null);
    } else {
      setFaqs([...faqs, formData]);
    }
    setFormData({ question: "", answer: "" });
  };

  const handleEdit = (index: number) => {
    setFormData(faqs[index]);
    setEditIndex(index);
    setErrors({});
  };

  const handleDelete = (index: number) => {
    const updated = faqs.filter((_, i) => i !== index);
    setFaqs(updated);
    if (editIndex === index) {
      setFormData({ question: "", answer: "" });
      setEditIndex(null);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <FaqForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isEditing={editIndex !== null}
        errors={errors}
      />
      <FaqList
        faqs={faqs}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default FaqManagementPage;
