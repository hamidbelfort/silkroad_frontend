import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";

export function SidebarHeader({ isCollapsed }: { isCollapsed: boolean }) {
  const { userId, role } = useAuthStore();

  return (
    <div className="flex flex-col items-center py-4 border-b">
      <Avatar className={isCollapsed ? "w-8 h-8" : "w-12 h-12"}>
        <AvatarFallback>{role.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      {!isCollapsed && (
        <span className="text-sm font-semibold text-center my-2">{userId}</span>
      )}
    </div>
  );
}
