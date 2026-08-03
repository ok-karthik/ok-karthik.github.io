/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    // Was `true`. On a portfolio repo that recruiters may actually read, a
    // build that ignores type errors is the wrong signal — and it hid real
    // errors during the redesign.
    ignoreBuildErrors: false,
  },
  images: {
    // Static export has no image optimizer, so next/image would add wrapper
    // markup without optimizing anything. Plain <img> with explicit
    // width/height is the correct call here — see ARCHITECTURE.md.
    unoptimized: true,
  },
};

export default nextConfig;
