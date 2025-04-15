"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

export function CustomerDashboardCards() {
  const { role, userId } = useAuthStore();
  const [lastLogin, setLastLogin] = useState<string>("2025-04-10 22:45");
  const [orders, setOrders] = useState<string[]>([]); // فرضی
  const normalizedRole = role?.toLowerCase();
  if (normalizedRole !== "customer") return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* کارت آخرین ورود */}
      <Card>
        <CardHeader>
          <CardTitle>آخرین ورود</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">User: {userId}</p>
          <p className="text-sm mt-2">Last Login : {lastLogin}</p>
        </CardContent>
      </Card>

      {/* کارت سفارشات اخیر */}
      <Card>
        <CardHeader>
          <CardTitle>Orders History</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You have not placed any orders yet.
            </p>
          ) : (
            <ul className="text-sm list-disc ps-4 space-y-1">
              {orders.map((order, idx) => (
                <li key={idx}>{order}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
