"use client";

import Image from "next/image";
import { BankAccount } from "@/lib/types/bankAccount";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, Pencil } from "lucide-react";

interface BankAccountListProps {
  accounts: BankAccount[];
  onDelete: (id: string) => void;
  onEdit: (account: BankAccount) => void;
}

export function BankAccountList({
  accounts,
  onDelete,
  onEdit,
}: BankAccountListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {accounts.map((acc) => (
        <Card key={acc.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {acc.bankName || "Unknown Bank"}
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(acc)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onDelete(acc.id!)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Owner:</strong>{" "}
              {acc.accountOwner || "---"}
            </p>
            <p>
              <strong>Account Number:</strong>{" "}
              {acc.accountNumber || "---"}
            </p>
            <p>
              <strong>Card Number:</strong>{" "}
              {acc.cardNumber || "---"}
            </p>
            <p>
              <strong>IBAN:</strong> {acc.iban || "---"}
            </p>
            {acc.cardImage && (
              <div className="pt-2">
                <Image
                  src={acc.cardImage}
                  alt="Bank card image"
                  width={300}
                  height={200}
                  className="rounded border"
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
