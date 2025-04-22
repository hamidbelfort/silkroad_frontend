import axiosInstance from "../axios/axiosInstance";
import {
  BankAccount,
  BankAccountResponse,
} from "../types/bankAccount";

export const getBankAccounts = async (
  userId: string
): Promise<BankAccount[]> => {
  try {
    const res = await axiosInstance.get(
      `/api/bankAccount/user/${userId}`
    );
    return res.data;
  } catch (err) {
    console.log("Error getting bank accounts");
    throw err;
  }
};
export const createBankAccount = async (
  payload: BankAccount
): Promise<BankAccountResponse> => {
  try {
    const res = await axiosInstance.post(
      "/api/bankAccount",
      payload
    );
    return res.data;
  } catch (err) {
    console.log("Error creating bank account");
    throw err;
  }
};
export const updateBankAccount = async (
  payload: BankAccount
): Promise<BankAccountResponse> => {
  try {
    const res = await axiosInstance.put(
      `/api/bankAccount/${payload.id}`,
      payload
    );
    return res.data;
  } catch (err) {
    console.log("Error creating bank account");
    throw err;
  }
};
export const deleteBankAccount = async (
  payload: BankAccount
): Promise<BankAccountResponse> => {
  try {
    const res = await axiosInstance.delete(
      `/api/bankAccount/${payload.id}`
    );
    return res.data;
  } catch (err) {
    console.log("Error creating bank account");
    throw err;
  }
};
