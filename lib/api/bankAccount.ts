import axiosInstance from "../axios/axiosInstance";
import { BankAccount, BankAccountResponse } from "../types/bankAccount";

export const getBankAccounts = async (
  userId: string
): Promise<BankAccount[]> => {
  try {
    const res = await axiosInstance.get(`/api/bankaccount/user/${userId}`);
    return res.status === 200 ? res.data : [];
  } catch (err) {
    console.log("Error getting bank accounts" + err);
    return [];
  }
};
export const createBankAccount = async (
  payload: BankAccount
): Promise<BankAccountResponse> => {
  try {
    const res = await axiosInstance.post("/api/bankaccount", payload);
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
      `/api/bankaccount/${payload.id}`,
      payload
    );
    return res.data;
  } catch (err) {
    console.log("Error creating bank account");
    throw err;
  }
};
export const deleteBankAccount = async (
  id: string
): Promise<BankAccountResponse> => {
  try {
    const res = await axiosInstance.delete(`/api/bankaccount/${id}`);
    return res.data;
  } catch (err) {
    console.log("Error creating bank account");
    throw err;
  }
};
