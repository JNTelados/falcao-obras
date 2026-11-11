/** @type {import('next').NextConfig} */
const isExport = process.env.EXPORT === '1';

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // `EXPORT=1` gera site 100% estático em `out/` (Netlify, Vercel, Cloudflare Pages...).
  ...(isExport ? { output: 'export' } : {}),
  // Reduz o JS enviado ao cliente (tree-shaking de ícones e libs grandes).
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // O binário nativo do sharp não é executado neste ambiente; servindo os PNGs
    // já otimizados diretamente evitamos o custo do otimizador em runtime.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
  // Cabeçalhos de segurança: não se aplicam no modo `export` (configuram-se no alojamento).
  ...(isExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: '/(.*)',
              headers: [
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                { key: 'X-DNS-Prefetch-Control', value: 'on' },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
