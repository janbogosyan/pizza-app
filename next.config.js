/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.googleusercontent.com',
            // port: '',
            // pathname: '/account123/**',
          },
        ],
      },
    
}

module.exports = nextConfig


//видео: 2:57:00  - свързано е с профилната снимка на профила в app/profile/page

