import type { NextConfig } from "next";
require('dotenv').config();

const nextConfig: NextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;
