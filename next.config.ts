import createMDX from '@next/mdx';
import type { NextConfig } from "next";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

export default withMDX(nextConfig);
