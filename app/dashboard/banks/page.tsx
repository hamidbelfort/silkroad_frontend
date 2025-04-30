"use client";
import { useEffect, useState } from "react";
import { getBankAccounts } from "@/lib/api/bankAccount";
import { BankAccountForm } from "../components/dashboard/customer/bankAccountForm";
import { BankAccountList } from "../components/dashboard/customer/bankAccountList";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";
import { BankAccount } from "@/lib/types/bankAccount";
import { useTranslation } from "react-i18next";

export default function BankAccountsPage() {
  const { t } = useTranslation("common");
  const { userId } = useAuthStore();
  const [accounts, setAccounts] = useState<
    BankAccount[] | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await getBankAccounts(userId);
        if (!rawData) return;

        const cleaned = rawData.map((item) => {
          const cleanedItem: Partial<BankAccount> = {};
          for (const key of Object.keys(
            item
          ) as (keyof BankAccount)[]) {
            const value = item[key];
            cleanedItem[key] =
              value === undefined ||
              value === null ||
              value === ""
                ? "NaN"
                : value;
          }
          return cleanedItem as BankAccount;
        });

        setAccounts(cleaned);
      } catch (error) {
        console.error("Error loading accounts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="space-y-6">
      <BankAccountForm
        onSuccess={(newAccount) =>
          setAccounts((prev) =>
            prev ? [...prev, newAccount] : [newAccount]
          )
        }
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : accounts && accounts.length > 0 ? (
        <BankAccountList
          accounts={accounts}
          onDelete={(id) =>
            setAccounts(
              (prev) =>
                prev?.filter((acc) => acc.id !== id) || []
            )
          }
          onEdit={(updated) =>
            setAccounts(
              (prev) =>
                prev?.map((acc) =>
                  acc.id === updated.id ? updated : acc
                ) || []
            )
          }
        />
      ) : (
        t("bankAccount.BankAccountNoAccounts")
      )}
    </div>
  );
}
