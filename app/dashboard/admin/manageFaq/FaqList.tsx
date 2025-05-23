import { FaqType } from "@/lib/types/faq";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Loader } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { truncateText } from "@/lib/utils/stringHelpers";
interface FaqListProps {
  faqs: FaqType[];
  onEdit: (faq: FaqType) => void;
  onDelete: (id: string) => void;
  submittingId: string | undefined;
}

export const FaqList = ({
  faqs,
  onEdit,
  onDelete,
  submittingId,
}: FaqListProps) => {
  if (faqs && faqs.length > 0) {
    return (
      <Card>
        <CardContent className="p-4 md:p-6 w-fit">
          <ScrollArea className="flex items-center h-fit w-fit rounded-md border">
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border rounded-lg p-4 shadow-sm bg-muted hover:bg-muted/60 transition-all"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className="text-base font-semibold mb-1">
                        {faq.question.length > 15
                          ? truncateText(faq.question, 15)
                          : faq.question}
                      </h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {faq.answer.length > 30
                          ? truncateText(faq.answer, 30)
                          : faq.answer}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2 min-w-[48px]">
                      <Button
                        size="icon"
                        variant="outline"
                        className="hover:cursor-pointer"
                        disabled={submittingId === faq.id}
                        onClick={() => onEdit(faq)}
                      >
                        {submittingId === faq.id ? (
                          <Loader className="animate-spin" />
                        ) : (
                          <Pencil className="w-4 h-4" />
                        )}
                      </Button>
                      <ConfirmDialog
                        onConfirm={() => onDelete(faq.id!)}
                        variant="destructive"
                        title="Delete FAQ"
                        description="Are you sure you want to delete this FAQ? This action cannot be undone."
                        confirmText="Delete"
                        cancelText="Cancel"
                        trigger={
                          <Button
                            size="icon"
                            variant="destructive"
                            className="hover:cursor-pointer"
                            disabled={submittingId === faq.id}
                          >
                            {submittingId === faq.id ? (
                              <Loader className="animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }
};
