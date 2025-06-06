/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['sonjacerovac.nenad-kozoder.rs'], // Dodaj domene sa kojih želiš da učitavaš slike
//   },
// };

// export default nextConfig;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wpres.sonjacerovac.com",
      },
    ],
  },
};

export default nextConfig;
