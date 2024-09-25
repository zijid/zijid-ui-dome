import DefaultTheme from "vitepress/theme";
export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		if (typeof window !== 'undefined') {
			import('zijid-ui').then((module) => {
			  // 使用模块
			  console.log(`module:`,module)
				app.use(module.default);
			})
			.catch((error) => {
			  console.error(`Failed to load zijid-ui:`, error);
			});
		  }
	},
};
