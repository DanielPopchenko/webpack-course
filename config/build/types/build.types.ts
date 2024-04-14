export interface IBuildPaths {
  entry: string;
  html: string;
  output: string;
  public: string;
  src: string;
}

export type BuildModes = 'production' | 'development';
export type BuildPlatform = 'desktop' | 'mobile';

export interface IBuildOptions {
  port: number;
  paths: IBuildPaths;
  mode: BuildModes;
  platform: BuildPlatform;
  analyzer?: boolean;
}
