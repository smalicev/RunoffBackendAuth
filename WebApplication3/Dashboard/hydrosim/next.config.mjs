/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'appl',
assetPrefix: '/Dashboard/hydrosim/appl/',
  webpack: (config, options) => {
    
  config.module.rules.push({
    test: /\.md$/,
    use: "raw-loader",
  })

  return config},  
};


/// output: 'export',
// PROD MODE - DO NOT INCLUDE DIST DIR OR ASSET PREFIX IN DEV MODE.
/// distDir: 'appl',
/// assetPrefix: '/Dashboard/hydrosim/appl/',
export default nextConfig;
