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
export default function ContactForm() {
  const { t } = useTranslation("common");
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
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t("title.contactUs")}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <Label htmlFor="name">
            {t("label.contact.name")}
          </Label>
          <Input {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="email">
            {t("label.contact.email")}
          </Label>
          <Input {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="subject">
            {t("label.contact.subject")}
          </Label>
          <Input {...register("subject")} />
          {errors.subject && (
            <p className="text-sm text-red-500">
              {errors.subject.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="message">
            {t("label.contact.message")}
          </Label>
          <Textarea {...register("message")} rows={5} />
          {errors.message && (
            <p className="text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
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
  );
}
