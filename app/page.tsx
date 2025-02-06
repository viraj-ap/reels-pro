import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";
export default function Home() {

const [video, setVideo] = useState<IVideo[]>([])

useEffect(() => {
  const fetchVideos = async () => {
    const fetchVideos = async () =>{
      try {
        const data = await apiClient.getVideos()
        setVideo(data);
      }catch(error){
        console.error(error);
      }
    }

    fetchVideos(); 
  }
}, [])


  return (
    <div>
      hello my name is viraj
    </div>
  );
}
