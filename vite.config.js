import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';
export default defineConfig({base:'/venture-studio-earbuds/',build:{target:'es2022',rollupOptions:{input:{studio:fileURLToPath(new URL('./index.html',import.meta.url)),viewer:fileURLToPath(new URL('./viewer.html',import.meta.url))}}},server:{host:'127.0.0.1',port:4174}});
