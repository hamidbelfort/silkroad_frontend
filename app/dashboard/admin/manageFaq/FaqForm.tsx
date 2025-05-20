// components/FaqForm.tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface FaqFormProps {
  formData: { question: string; answer: string };
  setFormData: (data: { question: string; answer: string }) => void;
  handleSubmit: () => void;
  isEditing: boolean;
  errors: {
    question?: string;
    answer?: string;
  };
}

export const FaqForm = ({
  formData,
  setFormData,
  handleSubmit,
  isEditing,
}: FaqFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Update FAQ" : "Add New FAQ"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Enter question or title"
          value={formData.question}
          onChange={(e) =>
            setFormData({ ...formData, question: e.target.value })
          }
        />
        <Textarea
          placeholder="Enter answer"
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
        />
        <Button
          onClick={handleSubmit}
          disabled={!formData.question || !formData.answer}
        >
          {isEditing ? "Update" : "Submit"}
        </Button>
      </CardContent>
    </Card>
  );
};
