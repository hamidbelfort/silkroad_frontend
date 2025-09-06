import axiosInstance from "../axios/axiosInstance";
import { User } from "../types/user";
import { ExchangeOrder } from "../types/exchangeOrder"; // Assuming you have this type
import { ROLE } from "../types/user";
import { OrderStatus } from "../types/orderStatus";

// --- User Management ---

/**
 * Fetches a list of all users for the admin panel.
 */
export const getAllUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get("/api/admin/users");
  return response.data;
};

/**
 * Updates a user's active status.
 * @param userId - The ID of the user to update.
 * @param isActive - The new status.
 */
export const updateUserStatus = async (userId: string, isActive: boolean) => {
  const response = await axiosInstance.put(
    `/api/admin/users/${userId}/status`,
    { isActive }
  );
  return response.data;
};

/**
 * Updates a user's role.
 * @param userId - The ID of the user to update.
 * @param role - The new role.
 */
export const updateUserRole = async (userId: string, role: ROLE) => {
  const response = await axiosInstance.put(`/api/admin/users/${userId}/role`, {
    role,
  });
  return response.data;
};

/**
 * Resets a user's password and returns the new temporary password.
 * @param userId - The ID of the user.
 */
export const resetUserPassword = async (
  userId: string
): Promise<{
  success: boolean;
  message: string;
  newPassword?: string;
}> => {
  const response = await axiosInstance.post(
    `/api/admin/users/${userId}/reset-password`
  );
  return response.data;
};

// --- Order Management ---

/**
 * Fetches exchange orders based on their status.
 * @param status - The status of the orders to fetch.
 */
export const getOrdersByStatus = async (
  status: OrderStatus
): Promise<ExchangeOrder[]> => {
  // The endpoint needs to be created in your backend routes.
  // Example: router.get("/orders/:status", getOrdersByStatus);
  const response = await axiosInstance.get(`/api/admin/orders/${status}`);
  return response.data;
};
