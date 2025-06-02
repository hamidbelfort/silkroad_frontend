import axiosInstance from "../axios/axiosInstance";

type FolderType = "slide" | "profile" | "card";

export async function uploadToServer(
  folder: FolderType,
  file: File,
  userId?: string
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", folder);
  if (userId) {
    formData.append("userId", userId);
  }
  try {
    const response = await axiosInstance.post(
      "/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.imageUrl; // شامل path و bucket و غیره
  } catch (error) {
    console.error("Upload error:", error);
    return "";
  }
}
