import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserInfo } from "@/lib/api/auth";
import { useEffect, useState } from "react";
export function SidebarHeader({
  isCollapsed,
}: {
  isCollapsed: boolean;
}) {
  const { userId } = useAuthStore();
  const [user, setUser] = useState<{
    fullname: string;
    avatar?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const data = await getUserInfo(userId);
        setUser({
          fullname: data.fullname || "User Fullname",
          avatar: data.avatar,
        });
      } catch (err) {
        console.error("Error fetching user info", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);
  return (
    <div className="flex flex-col items-center py-4 border-b">
      {/* <Avatar className={isCollapsed ? "w-8 h-8" : "w-12 h-12"}>
        <AvatarFallback>{role.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      {!isCollapsed && (
        <span className="text-sm font-semibold text-center my-2">{userId}</span>
      )} */}
      {loading ? (
        <>
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="w-24 h-4 mt-2" />
        </>
      ) : (
        <>
          <Avatar className="w-12 h-12">
            {user?.avatar && (
              <AvatarImage
                src={user.avatar}
                alt={user.fullname}
              />
            )}
            <AvatarFallback>
              {user?.fullname?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <span className="text-sm font-medium mt-2">
              {user?.fullname}
            </span>
          )}
        </>
      )}
    </div>
  );
}
