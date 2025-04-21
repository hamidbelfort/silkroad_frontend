import axiosInstance from "../axios/axiosInstance";
import { Profile, ProfileResponse } from "../types/profile";

export const getProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const res = await axiosInstance.get(`/api/profile/${userId}`);
    return res.data;
  } catch (err) {
    console.log("Error getting profile:" + err);
    throw err;
  }
};
export const postProfile = async (
  profile: Profile
): Promise<ProfileResponse> => {
  try {
    const res = await axiosInstance.post("/api/profile", profile);
    return res.data;
  } catch (err) {
    console.log("Error getting profile:" + err);
    throw err;
  }
};
export const deleteProfile = async (
  userId: string
): Promise<ProfileResponse> => {
  try {
    const res = await axiosInstance.delete(`/api/profile/${userId}`);
    return res.data;
  } catch (err) {
    console.log("Error getting profile:" + err);
    throw err;
  }
};
