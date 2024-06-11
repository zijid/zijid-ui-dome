import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
	server: {
	  host: "0.0.0.0",
	  port:5176
	},
	plugins: [
		vue(),
	],
	base:"./",
	esbuild: {
		jsxFactory: 'h',
		jsxFragment: 'Fragment',
		// target: 'es20015'
	},
	// optimizeDeps:{
	// 	entries:[
	// 		"/node_modules/zijid-ui",
	// 		"/src/App.vue",
	// 		"/src/main.js"
	// 	]
	// }
	// build: {
	// 	outDir: 'docs'
	// }
	// build:{
	// 	rollupOptions:{
	// 		external:[
	// 			/@babel/,
	// 			"/src/main.js"
	// 		],
	// 	}
	// }
})