import axiosInstance from "../axios/axiosInstance";

export const uploadImage = async (
  file: File,
  folder: string
): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosInstance.post(
    `/api/upload?folder=${folder}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data.imageUrl;
};
