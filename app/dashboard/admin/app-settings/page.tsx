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
import { Loader } from "lucide-react";
import { useEffect } from "react";
import {
  fetchAllSettings,
  updateAppSettings,
} from "@/lib/api/settings";
import { SettingKey } from "@/lib/types/settings";

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
      profitMargin: 1,
      adminEmail: "",
      orderDisputeThreshold: 50000,
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
  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchAllSettings();
      // helper برای پیدا کردن مقدار با کلید خاص
      const get = (key: string) =>
        data.find((item) => item.key === key)?.value || "";

      // مقداردهی فرم عمومی
      generalForm.reset({
        profitMargin: parseFloat(
          get(SettingKey.PROFIT_MARGIN)
        ),
        orderDisputeThreshold: parseInt(
          get(SettingKey.ORDER_DISPUTE_THRESHOLD)
        ),
        adminEmail: get(SettingKey.ADMIN_EMAIL),
      });

      // مقداردهی فرم ایمیل
      emailForm.reset({
        adminEmail: get(SettingKey.ADMIN_EMAIL),
      });
    };

    loadSettings();
  }, [emailForm, generalForm]);

  const onSubmitGeneral = async (data: GeneralForm) => {
    const res = await updateAppSettings(data);
    if (res)
      toast.success(t("validation.settings.success"));
    //console.log("General Settings:", data);
  };

  const onSubmitEmail = async (data: EmailForm) => {
    const res = await updateAppSettings(data);
    if (res) {
      toast.success("validation.settings.success");
    }
    //console.log("Email Settings:", data);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">
        {t("title.settings.main")}
      </h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="flex gap-2 mb-4 flex-wrap">
          <TabsTrigger value="general">
            {t("title.settings.general")}
          </TabsTrigger>
          <TabsTrigger value="email">
            {t("title.settings.email")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">
                {t("title.settings.general")}
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
                  <Label>
                    {t("label.settings.profitMargin")}
                  </Label>
                  <Input
                    inputMode="numeric"
                    max={99}
                    min={1}
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
                  <Label>
                    {t(
                      "label.settings.orderDisputeThreshold"
                    )}
                  </Label>
                  <Input
                    inputMode="numeric"
                    max={100000}
                    min={100}
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

                <Button
                  type="submit"
                  disabled={
                    generalForm.formState.isSubmitting
                  }
                  className="w-full"
                >
                  {generalForm.formState.isSubmitting ? (
                    <>
                      <Loader
                        size={20}
                        className="animate-spin"
                      />
                      {t("common.submitting")}
                    </>
                  ) : (
                    t("common.saveChanges")
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">
                {t("title.settings.email")}
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
                  <Label>
                    {t("label.settings.adminEmail")}
                  </Label>
                  <Input
                    inputMode="email"
                    {...emailForm.register("adminEmail")}
                  />
                  <p className="text-sm text-red-500">
                    {
                      emailForm.formState.errors.adminEmail
                        ?.message
                    }
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={
                    emailForm.formState.isSubmitting
                  }
                  className="w-full"
                >
                  {emailForm.formState.isSubmitting ? (
                    <>
                      <Loader
                        size={20}
                        className="animate-spin"
                      />
                      {t("common.submitting")}
                    </>
                  ) : (
                    t("common.saveChanges")
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
