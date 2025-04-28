"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { uploadImage } from "@/lib/api/upload";
import { ImageUploader } from "@/components/ui/imageUploader";
import { useAuthStore } from "@/store/authStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WalletCards } from "lucide-react";
export default function BankAccountForm() {
  const [accounts, setAccounts] = useState<
    BankAccount[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] =
    useState<BankAccount | null>(null);
  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);
  const { t } = useTranslation("common");
  const { userId } = useAuthStore();
  const bankAccountSchema = z.object({
    bankName: z.string().min(2, t("valiation.bankName")),
    accountOwner: z
      .string()
      .min(6, t("validation.accountOwner")),
    accountNumber: z
      .string()
      .min(6, t("validation.accountNumber"))
      .max(15, t("validation.accountNumber")),
    iban: z
      .string()
      .min(26, t("validation.ibanInvalid"))
      .optional(),
    cardNumber: z
      .string()
      .min(16, t("validation.cardNumber"))
      .optional(),
    cardImage: z.string().optional(),
  });

  type BankAccountFormValues = z.infer<
    typeof bankAccountSchema
  >;
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
    const fetchData = async () => {
      try {
        const data = await getBankAccounts(userId);
        if (data && data.length > 0) setAccounts(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [accounts, userId]);
  const openEdit = (data: BankAccount) => {
    setSelected(data);
    reset(data);
  };

  const onSubmit = async (data: BankAccountFormValues) => {
    try {
      // فراخوانی API برای ذخیره
      if (selectedImage) {
        data.cardImage = await uploadImage(
          selectedImage,
          "bankAccount"
        );
      }
      const accountData = { ...data, id: "", userId: "" };
      const res = await createBankAccount(accountData);
      if (res.success) {
        toast.success(
          t("message.bankAccountCreateSuccess")
        );
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
      setAccounts(
        (prev) => prev?.filter((a) => a.id !== id) || []
      );
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
        <DialogTrigger asChild className="flex justify-end">
          <Button
            onClick={() => setSelected({} as BankAccount)}
          >
            {t("bankAccount.add")}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {selected != null
                ? t("bankAccount.update")
                : t("bankAccount.add")}
            </DialogTitle>
          </DialogHeader>
          <Accordion type="single" collapsible>
            <AccordionItem value="card">
              <AccordionTrigger>
                Bank Account Info
              </AccordionTrigger>
              <AccordionContent>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div>
                    <Label className="my-2">
                      {t("bankAccount.bankName")}
                    </Label>
                    <Input
                      {...register("bankName")}
                      placeholder="eg:Melli Bank"
                    />
                    {errors.bankName && (
                      <p className="text-sm text-red-500">
                        {errors.bankName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="my-2">
                      {t("bankAccount.accountOwner")}
                    </Label>
                    <Input
                      {...register("accountOwner")}
                      placeholder="eg:John Doe"
                    />
                  </div>
                  <div>
                    <Label className="my-2">
                      {t("bankAccount.accountNumber")}
                    </Label>
                    <Input
                      {...register("accountNumber")}
                      placeholder="eg:123456789"
                    />
                  </div>
                  <div>
                    <Label className="my-2">
                      {t("bankAccount.iban")}
                    </Label>
                    <Input
                      {...register("iban")}
                      placeholder="eg:IR12345678900000000 max:26"
                    />
                  </div>
                  <div>
                    <Label className="my-2">
                      {t("bankAccount.cardNumber")}
                    </Label>
                    <Input
                      {...register("cardNumber")}
                      placeholder="eg:1234-1234-1234-1234"
                    />
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="image">
                      <AccordionTrigger className="flex justify-center hover:cursor-pointer">
                        {t("upload.cardQuestion")}
                        <WalletCards size={20} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="my-2">
                          <ImageUploader
                            label={t("upload.cardImage")}
                            onFileSelect={(file) => {
                              setSelectedImage(file);
                            }}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {selected?.id
                      ? t("label.update")
                      : t("add")}
                  </Button>
                </form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DialogContent>
      </Dialog>

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
                  {t("bank.accountNumber")}:{" "}
                  {acc.accountNumber}
                </p>
                <div className="flex gap-2 mt-4 flex-wrap">
                  <Button
                    variant="secondary"
                    onClick={() => openEdit(acc)}
                  >
                    ویرایش
                  </Button>
                  {acc.cardImage && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          مشاهده تصویر
                        </Button>
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
        <p>{t("message.BankAccountNoAccounts")}</p>
      )}
    </div>
  );
}
