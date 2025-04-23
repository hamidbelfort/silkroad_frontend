// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cookieLang = request.cookies.get("language")?.value;
  const headerLang = request.headers
    .get("accept-language")
    ?.split(",")[0]
    .split("-")[0];
  const lang = cookieLang || headerLang || "en";

  const response = NextResponse.next();

  // اگر کوکی نبود، یکی ست می‌کنیم
  if (!cookieLang) {
    response.cookies.set("language", lang, {
      path: "/",
      httpOnly: false,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"], // همه صفحات به جز api و static
};
