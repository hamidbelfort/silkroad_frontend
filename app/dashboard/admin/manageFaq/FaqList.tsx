// components/FaqList.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

interface FaqListProps {
  faqs: { question: string; answer: string }[];
  loading: boolean;
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
}

export const FaqList = ({
  faqs,
  loading,
  handleEdit,
  handleDelete,
}: FaqListProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4 mt-8">
        <Image
          src="/images/no-data.svg"
          alt="No data"
          width={200}
          height={200}
        />
        <p className="text-muted-foreground">No FAQs added yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">{faq.question}</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleEdit(index)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDelete(index)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{faq.answer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
