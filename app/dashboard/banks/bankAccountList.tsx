"use client";
import Image from "next/image";
import { BankAccount } from "@/lib/types/bankAccount";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Pencil, WalletCards } from "lucide-react";
import { TruncatedText } from "@/components/ui/truncated-text";

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
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4">
      {accounts.length === 0 && <p>No accounts found</p>}
      {accounts.map((acc) => (
        <Card key={acc.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {acc.bankName || "Unknown Bank"}
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:cursor-pointer"
                  onClick={() => onEdit(acc)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="hover:cursor-pointer"
                  onClick={() => onDelete(acc.id!)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Owner:</strong> {acc.accountOwner || "---"}
            </p>
            <p>
              <strong>Account Number:</strong> {acc.accountNumber || "---"}
            </p>
            <p>
              <strong>Card Number:</strong>{" "}
              {acc.cardNumber && acc.cardNumber !== "NaN"
                ? acc.cardNumber
                : "---"}
            </p>
            {/* <p className="w-40 truncate" title={acc.iban}>
              <strong>IBAN:</strong> {truncateText(acc.iban, 14)}
            </p> */}
            {/* <TruncatedText text={acc.iban} maxLength={14} /> */}
            <p>Hello IBAN</p>
            {acc.cardImage && acc.cardImage !== "NaN" ? (
              <div className="pt-2">
                <Image
                  src={acc.cardImage}
                  alt="Bank card image"
                  width={150}
                  height={100}
                  className="rounded border"
                />
              </div>
            ) : (
              <WalletCards size={20} />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
