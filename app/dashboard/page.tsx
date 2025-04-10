import React from "react";
import { useAuthStore } from "@/store/authStore";
const Dashboard = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      {user.role === "admin" && <p>Welcome admin</p>}
      {user.role === "operator" && <p>Welcome operator</p>}
      {user.role === "customer" && <p>Welcome customer</p>}
    </div>
  );
};

export default Dashboard;
