import axiosInstance from "../axios/axiosInstance";
import {
  ContactMessage,
  ContactResponse,
} from "../types/contactMessage";
export const submitMessage = async (
  payload: ContactMessage
): Promise<ContactResponse> => {
  try {
    const res = await axiosInstance.post(
      "/api/contact",
      payload
    );
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
