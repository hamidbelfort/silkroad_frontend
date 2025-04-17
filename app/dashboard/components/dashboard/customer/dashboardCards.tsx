"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
export function CustomerDashboardCards() {
  const { role, userId } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (role) {
      setIsReady(true);
    }
  }, [role]);

  if (!isReady) return null;
  const normalizedRole = role?.toLowerCase();
  //console.log(normalizedRole);
  if (normalizedRole !== "customer") return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.lastLogin")}</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-sm text-muted-foreground">
            User ID: {userId}
          </h3>
          <div className="text-sm mt-2">
            Login Time: 2025-04-10 22:45
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {t("dashboard.ordersHistory")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            No Orders has been placed yet
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
