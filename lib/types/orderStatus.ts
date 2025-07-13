export const enum OrderStatus {
  PENDING = "PENDING", // در انتظار بررسی اپراتور
  WAITING_PAYMENT = "WAITING_PAYMENT", // در انتظار پرداخت توسط کاربر
  PAID = "PAID", // پرداخت شده
  APPROVED = "APPROVED", // تایید نهایی اپراتور
  REJECTED = "REJECTED", // رد شده توسط اپراتور
  CANCELED = "CANCELED", // لغو شده توسط کاربر
  COMPLETED = "COMPLETED", // تسویه و انجام شده
  WAITING_REVIEW = "WAITING_REVIEW", // 👈 اضافه شده: در انتظار بررسی اپراتور
}
