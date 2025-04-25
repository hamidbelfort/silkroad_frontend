"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getBankAccounts, deleteBankAccount } from "@/lib/api/bankAccount";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
interface BankAccount {
  id: string;
  userId: string;
  bankName: string;
  accountOwner: string;
  accountNumber: string;
  iban?: string;
  cardNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cardImage?: string;
}

export default function BankAccountList() {
  const { userId } = useAuthStore();
  const role = useAuthStore((state) => state.role);
  const normalizedRole = role?.toLowerCase();
  const router = useRouter();
  const [accounts, setAccounts] = useState<BankAccount[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    if (normalizedRole == "operator") {
      router.replace("/dashboard");
    }
    if (userId) {
      getBankAccounts(userId)
        .then((data) => setAccounts(data))
        .finally(() => setLoading(false));
    }
    // fetch("/api/bank-accounts")
    //   .then((res) => res.json())
    //   .then(setAccounts)
    //   .catch(() => toast.error(t("error.fetchData")))
    //   .finally(() => setLoading(false));
  }, [userId]);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteBankAccount(id);
      if (res.success) {
        setAccounts((prev) => prev?.filter((a) => a.id !== id) || []);
        toast.success(t("message.bankAccountDeleteSuccess"));
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error(t("message.bankAccountDeleteError"));
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  if (!accounts || accounts.length === 0) {
    return <p>{t("message.BankAccountNoAccounts")}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {accounts.map((acc) => (
        <Card key={acc.id}>
          <CardHeader>
            <CardTitle>{acc.bankName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              {t("bankAccount.accountOwner")}: {acc.accountOwner}
            </p>
            <p>
              {t("bankAccount.accountNumber")}: {acc.accountNumber}
            </p>
            <p>
              {t("bankAccount.cardNumber")}: {acc.cardNumber}
            </p>
            <p>
              {t("bankAccount.expiryDate")}: {acc.expiryMonth}/{acc.expiryYear}
            </p>

            <div className="flex gap-2 mt-4">
              {acc.cardImage && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      {t("bankAccount.viewCard")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-4">
                    <Image
                      src={acc.cardImage}
                      alt="Card image"
                      width={400}
                      height={250}
                      className="rounded border"
                    />
                  </DialogContent>
                </Dialog>
              )}
              <Button
                onClick={() => handleDelete(acc.id)}
                variant="destructive"
              >
                {t("common.delete")}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
