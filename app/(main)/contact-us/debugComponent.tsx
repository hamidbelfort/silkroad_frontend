import { useEffect } from "react";
import { requestCaptcha } from "@/lib/api/captcha";
export default function DebugComponent() {
  console.log("Component render start");

  useEffect(() => {
    console.log("calling requestCaptcha...");

    requestCaptcha()
      .then((res) => {
        console.log("Captcha Response:", res);
      })
      .catch((err) => {
        console.error("Captcha Error:", err);
      });
  }, []);

  return <div>Testing requestCaptcha...</div>;
}
