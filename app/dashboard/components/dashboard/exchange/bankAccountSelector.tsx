import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BankAccount } from "@/lib/types/bankAccount";

interface Props {
  accounts: BankAccount[];
  onSelect: (account: BankAccount) => void;
}
export function BankAccountSelector({ accounts, onSelect }: Props) {
  const [selected, setSelected] = useState<BankAccount | null>(null);

  const handleSelect = (acc: BankAccount) => {
    setSelected(acc);
    onSelect(acc);
  };
  return (
    <div className="w-full max-w-sm">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full justify-between">
            {selected
              ? `${selected.bankName} - ${selected.accountNumber}`
              : "Select a bank account"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          {accounts.length > 0 ? (
            accounts.map((acc) => (
              <DropdownMenuItem
                key={acc.id}
                onClick={() => handleSelect(acc)}
                className="cursor-pointer"
              >
                {acc.bankName} - {acc.accountNumber}
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled className="text-muted-foreground">
              {"No accounts found"}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
