"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import {
  createBankAccount,
  deleteBankAccount,
  getBankAccounts,
} from "@/lib/api/bankAccount";
import { ImageUploader } from "@/components/ui/imageUploader";

export default function BankAccountForm() {
  const [accounts, setAccounts] = useState<BankAccount[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BankAccount | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { t } = useTranslation("common");
  const bankAccountSchema = z.object({
    bankName: z.string().min(2, t("valiation.bankName")),
    accountOwner: z.string().min(2, t("validation.accountOwner")),
    accountNumber: z.string().min(6, t("validation.accountNumber")),
    iban: z.string().min(10, t("validation.ibanInvalid")).optional(),
    cardNumber: z.string().min(16, t("validation.cardNumber")).optional(),
    expiryMonth: z
      .string()
      .min(2, t("validation.expiryDateInvalid"))
      .optional(),
    expiryYear: z.string().min(2, t("validation.expiryDateInvalid")),
    cvv2: z.string().min(3, t("validation.cvv2Invalid")).optional(),
    cardImage: z.string().optional(),
  });

  type BankAccountFormValues = z.infer<typeof bankAccountSchema>;
  interface BankAccount extends BankAccountFormValues {
    id: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountSchema),
  });

  useEffect(() => {
    fetch("/api/bank-accounts")
      .then((res) => res.json())
      .then(setAccounts)
      .catch(() => toast.error("خطا در دریافت داده‌ها"))
      .finally(() => setLoading(false));
  }, []);

  const openEdit = (data: BankAccount) => {
    setSelected(data);
    reset(data);
  };

  const onSubmit = async (data: BankAccountFormValues) => {
    try {
      // فراخوانی API برای ذخیره
      const accountData = { ...data, id: "", userId: "" };
      const res = await createBankAccount(accountData);
      if (res.success) {
        toast.success(t("message.bankAccountCreateSuccess"));
        setSelected(null);
        reset();
        window.location.reload();
      }
    } catch {
      toast.error(t("message.bankAccountCreateError"));
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteBankAccount(id);
      setAccounts((prev) => prev?.filter((a) => a.id !== id) || []);
      toast.success("Card Image deleted✅");
    } catch {
      toast.error(t("message.bankAccountDeleteError"));
    }
  };

  return (
    <div className="space-y-6">
      <Dialog
        open={selected !== null}
        onOpenChange={(v) => {
          if (!v) {
            setSelected(null);
            reset();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <h2 className="text-lg font-semibold">
              {selected ? "ویرایش حساب بانکی" : "افزودن حساب بانکی"}
            </h2>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>نام بانک</Label>
              <Input {...register("bankName")} />
              {errors.bankName && (
                <p className="text-sm text-red-500">
                  {errors.bankName.message}
                </p>
              )}
            </div>
            <div>
              <Label>نام صاحب حساب</Label>
              <Input {...register("accountOwner")} />
            </div>
            <div>
              <Label>شماره حساب</Label>
              <Input {...register("accountNumber")} />
            </div>
            <div>
              <Label>شبا</Label>
              <Input {...register("iban")} />
            </div>
            <div>
              <Label>شماره کارت</Label>
              <Input {...register("cardNumber")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>ماه انقضا</Label>
                <Input {...register("expiryMonth")} />
              </div>
              <div>
                <Label>سال انقضا</Label>
                <Input {...register("expiryYear")} />
              </div>
            </div>
            <div>
              <Label>CVV2</Label>
              <Input {...register("cvv2")} />
            </div>
            <div>
              <Label>تصویر کارت</Label>
              <ImageUploader
                onFileSelect={(file) => {
                  setSelectedImage(file);
                }}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {selected?.id ? "ویرایش اطلاعات" : "ثبت حساب"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button onClick={() => setSelected({} as BankAccount)}>
            افزودن حساب
          </Button>
        </DialogTrigger>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : accounts && accounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((acc) => (
            <Card key={acc.id}>
              <CardHeader>
                <CardTitle>{acc.bankName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  {t("bank.holder")}: {acc.accountOwner}
                </p>
                <p>
                  {t("bank.accountNumber")}: {acc.accountNumber}
                </p>
                <p>
                  {t("bank.cardNumber")}: {acc.cardNumber}
                </p>
                <p>
                  {t("bank.expiryDate")}: {acc.expiryMonth}/{acc.expiryYear}
                </p>

                <div className="flex gap-2 mt-4 flex-wrap">
                  <Button variant="secondary" onClick={() => openEdit(acc)}>
                    ویرایش
                  </Button>
                  {acc.cardImage && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">مشاهده تصویر</Button>
                      </DialogTrigger>
                      <DialogContent>
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
                    حذف
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>هیچ حسابی ثبت نشده</p>
      )}
    </div>
  );
}
