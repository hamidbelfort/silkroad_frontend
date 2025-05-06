"use client";
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
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import Image from "next/image";
export default function ContactForm() {
  const { t } = useTranslation("common");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const schema = z.object({
    name: z.string().min(5, t("validation.required")),
    email: z.string().email(t("validation.email")),
    subject: z
      .string()
      .min(5, t("validation.contact.subject")),
    message: z
      .string()
      .min(5, t("validation.contact.message"))
      .max(200, t("validation.contact.message")),
    token: z.string(),
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
  const onSubmit = async (values: FormValues) => {
    try {
      const _token =
        await recaptchaRef.current?.executeAsync();
      recaptchaRef.current?.reset();
      values.token = _token!;
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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-shadow-amber-100">
        {t("title.contactUs")}
      </h1>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left CTA Section */}
        <div className="md:w-1/2 bg-blue-50 p-8 flex flex-col items-center justify-center text-center">
          <Image
            src="/images/contact-illustration.png" // عکسی که آپلود کردی رو تو public بذار
            alt="Contact Illustration"
            width={200}
            height={200}
          />
          <h2 className="text-2xl font-semibold mt-6">
            Let’s get in touch!
          </h2>
          <p className="text-muted-foreground mt-2">
            We’re just one message away —<br /> we&apos;re
            here to help, collaborate, or simply say hi.
          </p>
        </div>
        <div className="md:w-1/2 p-8">
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
            <div>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={
                  process.env
                    .NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                }
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
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
      </div>
    </div>
  );
}
