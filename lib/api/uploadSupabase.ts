import axiosInstance from "../axios/axiosInstance";

type FolderType = "slider" | "profile" | "bankCard";

export async function uploadToServer(
  folder: FolderType,
  file: File,
  userId?: string
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);
  if (userId) {
    formData.append("userId", userId);
  }

  try {
    const response = await axiosInstance.post("/api/upload2", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // شامل path و bucket و غیره
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}
