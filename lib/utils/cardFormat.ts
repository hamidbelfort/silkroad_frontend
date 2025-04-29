export function formatCardNumber(value: string): string {
  return value
    .replace(/\D/g, "") // فقط عددها رو نگه می‌داره
    .substring(0, 16) // حداکثر 16 رقم
    .replace(/(.{4})/g, "$1-") // هر 4 رقم یک خط فاصله
    .replace(/-$/, ""); // حذف خط فاصله آخر
}
