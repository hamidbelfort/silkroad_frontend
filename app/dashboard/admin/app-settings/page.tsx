"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAllSettings, updateAppSettings } from "@/lib/api/settings";
import { Setting, SettingKey } from "@/lib/types/settings";
import { requiredMinString } from "@/lib/validations/zodHelper";
import { formatSeconds } from "@/lib/utils/stringHelpers";

export default function SettingsPage() {
  const { t } = useTranslation("common");
  // ------------------ SCHEMAS ------------------
  const generalSchema = z.object({
    profitMargin: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z
        .number()
        .min(1, { message: t("validation.settings.profitMargin") })
        .max(99, { message: t("validation.settings.profitMargin") })
    ) as z.ZodType<number>,
    adminEmail: z.string().email(t("validation.settings.email")),
    orderDisputeThreshold: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z
        .number()
        .min(3600, {
          message: t("validation.settings.orderDisputeThreshold"),
        })
        .max(86400, {
          message: t("validation.settings.orderDisputeThreshold"),
        })
    ) as z.ZodType<number>,
  });

  const emailSchema = z.object({
    smtpUser: requiredMinString(3, "validation.settings.smtpUser"),
    smtpPass: requiredMinString(3, "validation.settings.smtpPassword"),
    adminEmail: z.string().email(t("validation.settings.email")),
  });

  type GeneralForm = z.infer<typeof generalSchema>;
  type EmailForm = z.infer<typeof emailSchema>;
  const generalForm = useForm<GeneralForm>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      profitMargin: 1,
      adminEmail: "",
      orderDisputeThreshold: 43200, //12 hours,
    },
  });

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      smtpPass: "",
      smtpUser: "",
      adminEmail: "",
    },
  });
  const [settings, setSettings] = useState<Setting[] | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchAllSettings();
      setSettings(data);

      const get = (key: SettingKey) =>
        data.find((item) => item.key === key)?.value || "";

      generalForm.reset({
        profitMargin: parseFloat(get(SettingKey.PROFIT_MARGIN)),
        orderDisputeThreshold: parseInt(
          get(SettingKey.ORDER_DISPUTE_THRESHOLD)
        ),
        adminEmail: get(SettingKey.ADMIN_EMAIL),
      });

      emailForm.reset({
        smtpUser: get(SettingKey.SMTP_USER),
        smtpPass: get(SettingKey.SMTP_PASS),
      });
    };

    loadSettings();
  }, []);

  const onSubmitGeneral = async (data: GeneralForm) => {
    const res = await updateAppSettings(data);
    if (res && res.success) toast.success(t("message.settings.success"));
    //console.log("General Settings:", data);
  };

  const onSubmitEmail = async (data: EmailForm) => {
    const res = await updateAppSettings(data);
    if (res && res.success) {
      toast.success("message.settings.success");
    }
    //console.log("Email Settings:", data);
  };

  return (
    <div className="w-full lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">{t("title.settings.main")}</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="flex gap-2 mb-4 flex-wrap">
          <TabsTrigger value="general">
            {t("title.settings.general")}
          </TabsTrigger>
          <TabsTrigger value="email">{t("title.settings.email")}</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="">
            <CardHeader>
              <h2 className="text-lg font-semibold">
                {t("title.settings.general")}
              </h2>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={generalForm.handleSubmit(onSubmitGeneral)}
                className="space-y-4"
              >
                <div className="flex flex-col gap-2">
                  <Label>{t("label.settings.profitMargin")} (%)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={99}
                    {...generalForm.register("profitMargin")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>{t("label.settings.adminEmail")}</Label>
                  <Input type="email" {...generalForm.register("adminEmail")} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="sm:col-span-2">
                    {t("label.settings.orderDisputeThreshold")}
                  </Label>
                  <Input
                    type="number"
                    min={3600}
                    max={86400}
                    {...generalForm.register("orderDisputeThreshold")}
                  />
                  {generalForm.watch("orderDisputeThreshold") > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {formatSeconds(
                        generalForm.watch("orderDisputeThreshold")
                      )}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={generalForm.formState.isSubmitting}
                  className="w-full hover:cursor-pointer"
                >
                  {generalForm.formState.isSubmitting ? (
                    <>
                      <Loader size={20} className="animate-spin" />
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
                onSubmit={emailForm.handleSubmit(onSubmitEmail)}
                className="space-y-4"
              >
                <div className="flex flex-col gap-2">
                  <Label>{t("label.settings.smtpUser")}</Label>
                  <Input type="text" {...emailForm.register("smtpUser")} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>{t("label.settings.smtpPass")}</Label>
                  <Input type="password" {...emailForm.register("smtpPass")} />
                </div>
                <Button
                  type="submit"
                  disabled={emailForm.formState.isSubmitting}
                  className="w-full hover:cursor-pointer"
                >
                  {emailForm.formState.isSubmitting ? (
                    <>
                      <Loader size={20} className="animate-spin" />
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
