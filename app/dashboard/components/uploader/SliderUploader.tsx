// components/SliderUploader.tsx
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axiosInstance from "@/lib/axios/axiosInstance";
export default function SliderUploader({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      axiosInstance
        .post("/api/upload?folder=slider", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => onUploaded(res.data.fileUrl))
        .catch((err) => console.error(err));
    },
    [onUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 2 * 1024 * 1024,
  });

  return (
    <div
      className="border-2 border-dashed p-4 text-center cursor-pointer"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p>Drop or click to upload (max 2MB)</p>
    </div>
  );
}
