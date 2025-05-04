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
      message: errorMessage || `Length must be at least ${min} characters`,
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
  return z.string().refine((val) => val === "" || val.length === length, {
    message,
  });
}
export function requiredString(message = "This field is required") {
  return z.string().min(1, message);
}
export function requiredEmail(message = "Invalid Email") {
  return z.string().email(message);
}
export function requiredMobile(message = "Invalid phone number") {
  return z.string().regex(/^09\d{9}$/, message);
}
export function optionalMobile(message = "Invalid phone number") {
  return z
    .string()
    .regex(/^09\d{9}$/, message)
    .or(z.literal(""));
}
export function optionalUrl(message = "Invalid URL") {
  return z.string().refine((value) => {
    if (value === "") return true;
    try {
      new URL(value);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, message);
}
export function requiredImage(size: number, message = "Image is required") {
  const MAX_FILE_SIZE = size * 1024 * 1024; // MB
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
  return z
    .instanceof(File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .png, and .webp formats are supported.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `File size must be max ${MAX_FILE_SIZE}`,
    });
}
export function fixedLengthString(
  length: number,
  message = `This field must be ${length} characters`
) {
  return z.string().refine((val) => val.length === length, { message });
}
