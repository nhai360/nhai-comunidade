export interface ICourses {
  _id: string;
  name: string;
  order: number;
  modules: ICourseModule[];
  watchedPercent: number;
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICourseModule {
  _id: string;
  name: string;
  order: number;
  bannerUrl: string;
  episodes: ICourseEpisode[];
  watchedPercent: number;
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ICourseEpisode {
  name: string;
  order: number;
  videoId: string;
  thumbUrl: string;
  watched: boolean;
  public: boolean;
}
