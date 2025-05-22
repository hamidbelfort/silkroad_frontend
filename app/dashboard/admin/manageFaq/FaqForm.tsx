import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaqType } from "@/lib/types/faq";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z.object({
  question: z.string().min(5, "Question is required."),
  answer: z.string().min(5, "Answer is required."),
});

type FaqFormValues = z.infer<typeof schema>;

interface FaqFormProps {
  onSubmit: (data: FaqType) => void;
  initialData: FaqType | null;
  submitting: boolean;
}

export const FaqForm = ({
  onSubmit,
  initialData,
  submitting,
}: FaqFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FaqFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        question: initialData.question,
        answer: initialData.answer,
      });
    } else {
      reset({ question: "", answer: "" });
    }
  }, [initialData, reset]);

  const onValid = (values: FaqFormValues) => {
    const id = initialData?.id || "";
    onSubmit({ ...values, id });
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit FAQ" : "Add New FAQ"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onValid)}
          className="lg:min-w-3xl md:min-w-md sm:min-w-sm space-y-4"
        >
          <div className="flex flex-col gap-2">
            <Label className="block text-sm font-medium mb-1">Question</Label>
            <Input
              className="min-w-fit"
              {...register("question")}
              placeholder="Enter the question"
              maxLength={100}
            />
            {errors.question && (
              <p className="text-red-500 text-sm mt-1">
                {errors.question.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label className="block text-sm font-medium mb-1">Answer</Label>
            <Textarea
              {...register("answer")}
              placeholder="Enter the answer"
              className="min-h-40"
              rows={6}
            />
            {errors.answer && (
              <p className="text-red-500 text-sm mt-1">
                {errors.answer.message}
              </p>
            )}
          </div>
          <div className="text-end">
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <Loader className="animate-spin" />
              ) : initialData ? (
                "Update FAQ"
              ) : (
                "Add FAQ"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
