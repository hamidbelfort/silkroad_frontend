"use client";

import { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUserStatus,
  updateUserRole,
  resetUserPassword,
} from "@/lib/api/admin";
import { User } from "@/lib/types/user"; // Adjust this import path if needed
import { ROLE } from "@/lib/types/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Shield,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    } catch {
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (
    userId: string,
    isActive: boolean
  ) => {
    try {
      await updateUserStatus(userId, isActive);
      toast.success(`User status updated successfully.`);
      // Update local state to reflect the change immediately
      setUsers(
        users.map((u) =>
          u.id === userId ? { ...u, isActive } : u
        )
      );
    } catch {
      toast.error("Failed to update user status.");
    }
  };

  const handleRoleChange = async (
    userId: string,
    role: ROLE
  ) => {
    try {
      await updateUserRole(userId, role);
      toast.success(`User role updated successfully.`);
      setUsers(
        users.map((u) =>
          u.id === userId ? { ...u, role } : u
        )
      );
    } catch {
      toast.error("Failed to update user role.");
    }
  };

  const handleResetPassword = async (userId: string) => {
    try {
      const result = await resetUserPassword(userId);
      if (result.success && result.newPassword) {
        toast.success(
          <div className="flex flex-col gap-2">
            <span>Password reset successfully!</span>
            <p className="text-xs">
              New temporary password:
            </p>
            <strong className="text-sm font-mono bg-gray-200 text-black p-1 rounded">
              {result.newPassword}
            </strong>
          </div>,
          { duration: 15000 }
        );
      }
    } catch {
      toast.error("Failed to reset password.");
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        User Management
      </h1>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.fullname}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.role === "ADMIN"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={user.isActive}
                    onCheckedChange={(checked) =>
                      handleStatusChange(user.id, checked)
                    }
                  />
                </TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">
                            Open menu
                          </span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            handleRoleChange(
                              user.id,
                              ROLE.ADMIN
                            )
                          }
                        >
                          <Shield className="mr-2 h-4 w-4" />{" "}
                          Make Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleRoleChange(
                              user.id,
                              ROLE.OPERATOR
                            )
                          }
                        >
                          <Shield className="mr-2 h-4 w-4" />{" "}
                          Make Operator
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleRoleChange(
                              user.id,
                              ROLE.CUSTOMER
                            )
                          }
                        >
                          <UserIcon className="mr-2 h-4 w-4" />{" "}
                          Make User
                        </DropdownMenuItem>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) =>
                              e.preventDefault()
                            }
                          >
                            Reset Password
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will generate a new random
                          password for the user. The new
                          password will be displayed for you
                          to share with them.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            handleResetPassword(user.id)
                          }
                        >
                          Yes, Reset Password
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
