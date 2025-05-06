"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
//import { Loader } from "lucide-react";
// ------------------ COMPONENT ------------------

export default function SettingsPage() {
  const { t } = useTranslation("common");
  // ------------------ SCHEMAS ------------------

  const generalSchema = z.object({
    profitMargin: z
      .number()
      .refine(
        (val) => !isNaN(+val) && val >= 1 && val <= 99,
        {
          message: t("validation.settings.profitMargin"),
        }
      ),
    adminEmail: z
      .string()
      .email(t("validation.settings.email")),
    orderDisputeThreshold: z
      .number()
      .refine((val) => !isNaN(val) && val > 0, {
        message: t(
          "validation.settings.orderDisputeThreshold"
        ),
      }),
  });

  const emailSchema = z.object({
    // smtpHost: z.string().min(3, "میزبان SMTP معتبر نیست."),
    // smtpPort: z.string().refine(val => !isNaN(+val), {
    //   message: "پورت معتبر نیست.",
    // }),
    adminEmail: z
      .string()
      .email(t("validation.settings.email")),
  });

  type GeneralForm = z.infer<typeof generalSchema>;
  type EmailForm = z.infer<typeof emailSchema>;
  const generalForm = useForm<GeneralForm>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      profitMargin: 0,
      adminEmail: "",
      orderDisputeThreshold: 5000,
    },
  });

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      // smtpHost: "",
      // smtpPort: "",
      adminEmail: "",
    },
  });

  const onSubmitGeneral = (data: GeneralForm) => {
    toast.success(t("validation.settings.success"));
    console.log("General Settings:", data);
  };

  const onSubmitEmail = (data: EmailForm) => {
    toast.success("تنظیمات ایمیل ذخیره شد");
    console.log("Email Settings:", data);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">
        تنظیمات سایت
      </h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="flex gap-2 mb-4 flex-wrap">
          <TabsTrigger value="general">عمومی</TabsTrigger>
          <TabsTrigger value="email">ایمیل</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">
                تنظیمات عمومی
              </h2>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={generalForm.handleSubmit(
                  onSubmitGeneral
                )}
                className="space-y-4"
              >
                <div>
                  <Label>درصد سود</Label>
                  <Input
                    {...generalForm.register(
                      "profitMargin"
                    )}
                  />
                  <p className="text-sm text-red-500">
                    {
                      generalForm.formState.errors
                        .profitMargin?.message
                    }
                  </p>
                </div>
                <div>
                  <Label>ایمیل مدیر</Label>
                  <Input
                    {...generalForm.register("adminEmail")}
                  />
                  <p className="text-sm text-red-500">
                    {
                      generalForm.formState.errors
                        .adminEmail?.message
                    }
                  </p>
                </div>
                <div>
                  <Label>آستانه اختلاف سفارش (ثانیه)</Label>
                  <Input
                    {...generalForm.register(
                      "orderDisputeThreshold"
                    )}
                  />
                  <p className="text-sm text-red-500">
                    {
                      generalForm.formState.errors
                        .orderDisputeThreshold?.message
                    }
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  ذخیره تنظیمات عمومی
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">
                تنظیمات ایمیل
              </h2>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={emailForm.handleSubmit(
                  onSubmitEmail
                )}
                className="space-y-4"
              >
                <div>
                  <Label>ایمیل ارسال‌کننده</Label>
                  <Input
                    {...emailForm.register("adminEmail")}
                  />
                  <p className="text-sm text-red-500">
                    {
                      emailForm.formState.errors.adminEmail
                        ?.message
                    }
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  ذخیره تنظیمات ایمیل
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
