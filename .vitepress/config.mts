import { defineConfig } from 'vitepress'
import commonjs from '@rollup/plugin-commonjs';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "zijid-ui",
	description: "一个ui库",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: '首页', link: '/' },
			{ text: '例子', link: '/api' }
		],

		sidebar: [
			// {
			// 	text: 'Examples',
			// 	items: [
			// 		{ text: 'Markdown Examples', link: '/markdown-examples' },
			// 		{ text: 'Runtime API Examples', link: '/api-examples' }
			// 	]
			// }
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/zijid/zijid-ui-dome' }
		]
	},
	outDir: 'docs',
	base:"/zijid-ui-dome/",
	vite: {
		ssr: {
			noExternal: ['zijid-ui'],  // 不将zijid-ui外部化
		},
	}

})
