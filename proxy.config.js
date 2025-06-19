// proxy.config.ts
// import type { ProxyOptions } from 'vite';

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
    target: 'http://recruitment.intellismartinc.com:7111',
    changeOrigin: true,
    rewrite: p => p.replace(/^\/proxy\/pdf/, '')
  }
};
