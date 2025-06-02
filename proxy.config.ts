// proxy.config.ts
import type { ProxyOptions } from 'vite';

export const proxyConfig: Record<string, string | ProxyOptions> = {
  '/api': {
    target: 'http://10.0.1.26:7101/',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api/, ''),
  },
  '/files': {
    target: 'http://10.0.1.26:7101/',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/files/, ''),
  },
};