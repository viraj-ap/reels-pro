"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import VideoUpload from "./components/VideoUpload";
import { useSession } from "next-auth/react";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="p-4">
      {session && <VideoUpload onVideoUpload={(newVideo) => setVideos(prev => [newVideo, ...prev])}/>}
      <h1 className="text-2xl font-bold mb-4">Video Gallery</h1>
      {videos.length === 0 ? (
        <p className="text-gray-500">No videos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div key={video._id?.toString()} className="bg-gray-800 p-4 rounded">
              <h2 className="text-lg font-semibold">{video.title}</h2>
              <p className="text-gray-300">{video.description}</p>
              <video 
                src={video.videoUrl} 
                controls={video.controls} 
                className="mt-2 w-full rounded"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}