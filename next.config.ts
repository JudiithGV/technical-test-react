import type { NextConfig } from "next";
require('dotenv').config();

const nextConfig: NextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
    IMAGE_URL:process.env.IMAGE_URL,
    API_URL:process.env.API_URL,
  },
};

export default nextConfig;
