"use client";
import { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";

interface VideoUploadProps {
  onVideoUpload?: (video: IVideo) => void;
}

export default function VideoUpload({ onVideoUpload }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = async (res: any) => {
    if (!res?.url) {
      setError("Error: Uploaded file URL is missing.");
      return;
    }

    // Generate a thumbnail (simplified approach)
    const thumbnailUrl = res.url.replace(/\.mp4$/, '.jpg');

    const videoData = { 
      title: `Video ${new Date().toLocaleDateString()}`, 
      description: "Uploaded video", 
      videoUrl: res.url, 
      thumbnailUrl: thumbnailUrl,
      controls: true
    }; 

    setUploading(true);
    setError(null);

    try {
      const newVideo = await apiClient.createVideo(videoData);
      onVideoUpload?.(newVideo);
      setUploading(false);
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to save video.");
      setUploading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded mb-4">
      <h2 className="text-xl text-white mb-2">Upload Video</h2>
      <IKUpload
        fileName="video.mp4"
        folder="/videos"
        onSuccess={handleSuccess}
        onError={(err) => {
          console.error(err);
          setError(err.message);
        }}
      />
      {uploading && (
        <p className="text-white mt-2 flex items-center">
          <svg 
            className="animate-spin h-5 w-5 mr-2 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Uploading...
        </p>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}