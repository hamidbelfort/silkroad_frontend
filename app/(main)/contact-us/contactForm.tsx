import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { submitMessage } from "@/lib/api/contactMessage";
import { requestCaptcha } from "@/lib/api/captcha";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
const ContactForm = () => {
  const { t } = useTranslation("common");
  const [captchaImg, setCaptchaImg] = useState("");
  const [captchaHash, setCaptchaHash] = useState("");
  const [isLoading, setLoading] = useState(false);
  const schema = z.object({
    name: z.string().min(5, t("validation.required")),
    email: z.string().email(t("validation.email")),
    subject: z
      .string()
      .min(3, t("validation.contact.subject")),
    message: z
      .string()
      .min(5, t("validation.contact.message"))
      .max(200, t("validation.contact.message")),
    captchaAnswer: z
      .string()
      .length(5, t("validation.contact.")),
    captchaHash: z.string(),
  });
  type FormValues = z.infer<typeof schema>;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const getCaptcha = async () => {
      setLoading(true);
      const res = await requestCaptcha();
      if (res) {
        setLoading(false);
        setCaptchaImg(res.image);
        setCaptchaHash(res.hash);
      }
    };
    getCaptcha();
  }, []);
  const onSubmit = async (values: FormValues) => {
    try {
      console.log(values);
      const data = await submitMessage(values);
      if (data.success) {
        toast.success(t("title.success"), {
          description:
            "Your message has successfully sent!",
        });
        reset();
      } else {
        toast.error(t("title.fail"), {
          description:
            data.message || t("title.failMessage"),
        });
      }
    } catch (err) {
      console.log(err);
      toast(t("title.fail"), {
        description:
          (err as Error).message || t("title.failMessage"),
      });
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 my-2"
      >
        <div className="grid lg:grid-cols-1 gap-2">
          <Label>{t("label.contact.name")}</Label>
          <Input {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="grid lg:grid-cols-1 gap-2">
          <Label>{t("label.contact.email")}</Label>
          <Input {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="grid lg:grid-cols-1 gap-2">
          <Label>{t("label.contact.subject")}</Label>
          <Input {...register("subject")} />
          {errors.subject && (
            <p className="text-sm text-red-500">
              {errors.subject.message}
            </p>
          )}
        </div>
        <div className="grid lg:grid-cols-1 gap-2">
          <Label>{t("label.contact.message")}</Label>
          <Textarea {...register("message")} rows={5} />
          {errors.message && (
            <p className="text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          {/* Hidden input for captchaHash */}
          <input
            type="hidden"
            value={captchaHash}
            {...register("captchaHash")}
          />
          {isLoading ||
            (!captchaImg && (
              <Skeleton className="w-full mx-2" />
            ))}
          {captchaImg && (
            <Image
              src={captchaImg}
              width={200}
              height={200}
              alt="Captcha"
              className="rounded border"
            />
          )}
          <Input
            {...register("captchaAnswer")}
            placeholder="Enter the code"
            className="my-2"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || !captchaImg}
          className="w-full cursor-pointer"
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
    </div>
  );
};

export default ContactForm;
