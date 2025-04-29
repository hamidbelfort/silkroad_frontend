import { z } from "zod";

/**
 * ساخت یک رشته اختیاری که اگر مقدار داشت، باید از نظر طول معتبر باشد.
 * اگر مقدار نداشت (رشته خالی)، قابل قبول است.
 */
export function optionalStringLength(
  min: number,
  max?: number,
  errorMessage?: string
) {
  const schema = z.string().refine(
    (val) => {
      if (val === "") return true; // اجازه رشته خالی
      if (max !== undefined) {
        return val.length >= min && val.length <= max;
      }
      return val.length >= min;
    },
    {
      message:
        errorMessage ||
        `Length must be at least ${min} characters`,
    }
  );
  return schema;
}
export function requiredStringLength(
  min: number,
  max?: number,
  errorMessage?: string
) {
  const schema = z.string().refine(
    (val) => {
      if (max !== undefined) {
        return val.length >= min && val.length <= max;
      }
      return val.length >= min;
    },
    {
      message:
        errorMessage ||
        `Length must be at between ${min} and ${max} characters`,
    }
  );
  return schema;
}
export function optionalFixedLengthString(
  length: number,
  message = `Field must be ${length} characters`
) {
  return z
    .string()
    .refine((val) => val === "" || val.length === length, {
      message,
    });
}
export function requiredString(
  message = "This field is required"
) {
  return z.string().min(1, message);
}
export function requiredEmail(message = "Invalid Email") {
  return z.string().email(message);
}
export function requiredMobile(
  message = "Invalid phone number"
) {
  return z.string().regex(/^09\d{9}$/, message);
}
export function optionalMobile(
  message = "Invalid phone number"
) {
  return z
    .string()
    .regex(/^09\d{9}$/, message)
    .or(z.literal(""));
}
export function fixedLengthString(
  length: number,
  message = `This field must be ${length} characters`
) {
  return z
    .string()
    .refine((val) => val.length === length, { message });
}
