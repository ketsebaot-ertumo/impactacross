/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Content-Security-Policy",
              value: "frame-src 'self' https://www.youtube.com; object-src 'none';",
            },
          ],
        },
      ];
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', 
        },
        // {
        //   protocol: 'https',
        //   hostname: 'res.cloudinary.com',
        //   pathname: '/**',
        // },
        // {
        //   protocol: 'https',
        //   hostname: 'drive.google.com',
        //   pathname: '/**',
        // }
      ],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  export default nextConfig;
  