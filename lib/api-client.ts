import { IVideo } from "@/models/Video";

export type VideoFormData = Omit<IVideo, "_id">;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`/api/${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getVideos(): Promise<IVideo[]> {
    return this.fetch<IVideo[]>("videos");
  }

  async getVideo(id: string): Promise<IVideo> {
    return this.fetch<IVideo>(`videos/${id}`);
  }

  async createVideo(videoData: VideoFormData): Promise<IVideo> {
    return this.fetch<IVideo>("videos", {
      method: "POST",
      body: videoData
    });
  }
}

export const apiClient = new ApiClient();