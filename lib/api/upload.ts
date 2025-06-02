import axiosInstance from "../axios/axiosInstance";

export const uploadImage = async (
  file: File,
  folder: string
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", folder);

  const response = await axiosInstance.post(
    `/api/upload`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data.imageUrl;
};
