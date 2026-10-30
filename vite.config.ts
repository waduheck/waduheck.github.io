import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 用户站点（<name>.github.io）或自定义域名用 '/'；
// 项目站点（<name>.github.io/<repo>/）在 CI 里设置 BASE=/<repo>/。
export default defineConfig({
  base: process.env.BASE ?? '/',
  plugins: [react()],
});
