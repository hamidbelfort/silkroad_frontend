"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, RotateCcw, CloudOffIcon } from "lucide-react";
import { submitMessage } from "@/lib/api/contactMessage";
import { requestCaptcha } from "@/lib/api/captcha";
import Image from "next/image";
const ContactUsForm = () => {
  const { t } = useTranslation("common");
  const [capHash, setCaptchaHash] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");

  const schema = z.object({
    name: z.string().min(5, t("validation.required")),
    email: z.string().email(t("validation.email")),
    subject: z.string().min(3, t("validation.contact.subject")),
    message: z.string().min(5).max(200, t("validation.contact.message")),
    captchaAnswer: z.string().length(5, t("validation.contact.answer")),
    captchaHash: z.string(),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const [isLoading, setLoading] = useState(false);
  const loadCaptcha = async () => {
    try {
      setLoading(true);
      const res = await requestCaptcha();
      setLoading(false);
      if (res?.image && res?.hash) {
        setCaptchaImage(res.image);
        setCaptchaHash(res.hash);
      } else {
        setCaptchaImage("");
        setCaptchaHash("");
        //console.error("Invalid captcha response");
      }
    } catch (err) {
      toast.error("Failed to load captcha. Please reload the page");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  const onSubmit = async (values: FormValues) => {
    try {
      //console.log("hash : " + capHash);
      //console.table("values hash :" + values.captchaHash);
      const data = await submitMessage(values);
      if (data.success) {
        toast.success(t("title.success"), {
          description: "Your message has been sent successfully!",
        });
        reset();
        loadCaptcha(); // Reload captcha after submission
      } else {
        toast.error(t("title.fail"), {
          description: data.message || t("title.failMessage"),
        });
      }
    } catch (err) {
      console.log(err);
      toast(t("title.fail"), {
        description: (err as Error).message || t("title.failMessage"),
      });
    }
  };

  //show loading progress then wait 10 secs show reload message
  if (isLoading) {
    return (
      <div className="text-center py-20">
        <Loader className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>Loading contact form...</p>
      </div>
    );
  }
  if (!capHash || !captchaImage) {
    return (
      <div className="text-center py-20">
        <CloudOffIcon className="h-8 w-8 mx-auto mb-4" />
        <p>Failed to load.Please reload the page</p>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 my-4">
      {/* Name */}
      <div className="flex flex-col gap-2">
        <Label>{t("label.contact.name")}</Label>
        <Input {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label>{t("label.contact.email")}</Label>
        <Input {...register("email")} />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <Label>{t("label.contact.subject")}</Label>
        <Input {...register("subject")} />
        {errors.subject && (
          <p className="text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <Label>{t("label.contact.message")}</Label>
        <Textarea {...register("message")} rows={5} />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Captcha */}
      <div className="flex flex-col items-center justify-center">
        <Input type="hidden" {...register("captchaHash")} value={capHash} />

        <div className="flex items-center gap-3 mb-2">
          <Image
            src={captchaImage}
            width={200}
            height={80}
            alt="Captcha"
            className="rounded border"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={loadCaptcha}
            disabled={isLoading}
            className="hover:cursor-pointer"
          >
            <RotateCcw
              className={isLoading ? "h-5 w-5 animate-spin" : "h-5 w-5"}
            />
          </Button>
        </div>

        <Input
          {...register("captchaAnswer")}
          placeholder="Enter the code"
          className="my-2"
          required
        />
        {errors.captchaAnswer && (
          <p className="text-sm text-red-500">{errors.captchaAnswer.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting || !capHash}
        className="w-full hover:cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader className="animate-spin h-4 w-4 mr-2" />
            {t("common.submitting")}
          </>
        ) : (
          t("label.contact.send")
        )}
      </Button>
    </form>
  );
};

export default ContactUsForm;
