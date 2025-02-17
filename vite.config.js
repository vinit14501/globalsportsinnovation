import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"
import viteCompression from "vite-plugin-compression"
import imagemin from "vite-plugin-imagemin"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const isProd = mode === "production"

  return {
    base: "/",
    resolve: {
      alias: {
        "@": "/src",
        "@components": "/src/components",
        "@assets": "/src/assets",
        "@seo": "/src/seo",
      },
    },
    plugins: [
      imagemin({
        gifsicle: { optimizationLevel: 3 },
        mozjpeg: { quality: 75 },
        pngquant: { quality: [0.8, 0.9] },
        webp: { quality: 75 },
      }),
      react({
        babel: {
          plugins: [
            ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
            isProd && ["babel-plugin-transform-remove-console"],
          ].filter(Boolean),
          parserOpts: { plugins: ["jsx"] },
        },
        jsxRuntime: "automatic",
        fastRefresh: true,
      }),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
        manifest: {
          name: "Global Sports Innovation",
          short_name: "GSI",
          description:
            "Revolutionary Sports Technology & Performance Analytics",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          icons: [
            {
              src: "/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any maskable",
            },
            {
              src: "/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
          skipWaiting: true,
          clientsClaim: true,
          maximumFileSizeToCacheInBytes: 2 * 1024 * 1024, // Reduce from 5MB to 2MB
          runtimeCaching: [
            {
              urlPattern: /\.(webp|avif|png|jpg|jpeg)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "images",
                expiration: {
                  maxEntries: 30, // Reduced from 50
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
              },
            },
          ],
        },
      }),
      viteCompression({
        algorithm: "gzip",
        ext: ".gz",
        threshold: 1024,
      }),
      viteCompression({
        algorithm: "brotliCompress",
        ext: ".br",
        threshold: 1024,
      }),
    ],
    build: {
      target: "esnext",
      minify: "terser",
      sourcemap: false,
      cssCodeSplit: false,
      assetsInlineLimit: 4096,
      modulePreload: {
        polyfill: true,
      },
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: isProd,
          pure_funcs: isProd ? ["console.log"] : [],
        },
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
            ui: ["flowbite-react"],
          },
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name.split(".")[1]
            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
              return `assets/images/[name]-[hash][extname]`
            }
            if (/woff|woff2/i.test(extType)) {
              return `assets/fonts/[name]-[hash][extname]`
            }
            return `assets/${extType}/[name]-[hash][extname]`
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
        },
      },
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "flowbite",
        "flowbite-react",
      ],
      exclude: ["@vite/client", "@vite/env"],
    },
    server: {
      port: parseInt(env.VITE_PORT || 3000),
      host: env.VITE_HOST || "localhost",
      open: env.VITE_OPEN_BROWSER === "true",
      cors: true,
      hmr: {
        overlay: true,
      },
    },
    preview: {
      port: 8080,
      host: true,
    },
    css: {
      devSourcemap: true,
      postcss: "./postcss.config.js",
    },
  }
})
