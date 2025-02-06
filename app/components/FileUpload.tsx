"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType: "image" | "video";
}

// const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
// const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    console.log("Success", response);
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleProgress = (progressEvent: ProgressEvent) => {
    if (onProgress) {
      const progress = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      onProgress(progress);
    }
  };

  // Upload Start Handler
  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Only video files are allowed");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("File size should be less than 100MB");
        return false;
      }
    } else if (fileType === "image") {
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return false;
      }
      if (!validTypes.includes(file.type)) {
        setError("Only image files are allowed");
        return false;
      }
    }
    setError("");
    return true;
  };

  return (
    <div className="space-y-4">
      <IKUpload
        fileName={fileType === "image" ? "image.jpg" : "video.mp4"}
        useUniqueFileName={true}
        validateFile={validateFile}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        onUploadStart={handleStartUpload}
        folder={fileType === "image" ? "/images" : "/videos"}
      />

      {uploading && (
        <div className="flex items-center gap-2 text-primary">
          <Loader2 className="animate-spin w-4 h-4" />
          <span>uploading... </span>
        </div>
      )}
      {error && <div className="text-error text-sm">{error}</div>}
    </div>
  );
}
