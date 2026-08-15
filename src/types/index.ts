export type AppConfig = {
  name: string;
  url: string;
};

export const appConfig: AppConfig = {
  name: "Biotech Laboratory",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
};
