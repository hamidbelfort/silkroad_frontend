import { Button } from "@/components/ui/button";

// لیستی از مبالغ پیشنهادی
const SUGGESTED_AMOUNTS = [100, 500, 1000, 5000];

interface QuickAmountSelectorProps {
  onSelectAmount: (amount: number) => void;
}

export function QuickAmountSelector({
  onSelectAmount,
}: QuickAmountSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {SUGGESTED_AMOUNTS.map((amount) => (
        <Button
          key={amount}
          type="button" // این نوع دکمه از ارسال فرم جلوگیری می‌کند
          variant="outline"
          size="sm"
          onClick={() => onSelectAmount(amount)}
          className="flex-grow"
        >
          ¥{amount.toLocaleString()}
        </Button>
      ))}
    </div>
  );
}
