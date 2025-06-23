// proxy.config.ts
const REPORT_SERVER =
  process.env.VITE_REPORT_SERVER ||
  (process.env.NODE_ENV === "production"
    ? "http://recruitment.intellismartinc.com:7111"
    : "http://localhost:1371");

export const proxyConfig = {
  "/api": {
    target: "http://10.0.1.26:7101/",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ""),
  },
  "/files": {
    target: "http://10.0.1.26:7101/",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/files/, ""),
  },
  '/proxy/pdf': {
    target: 'http://10.0.1.246:7111',
    changeOrigin: true,
    rewrite: p => p.replace(/^\/proxy\/pdf/, '')
  }
};
