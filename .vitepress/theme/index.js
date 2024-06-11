import DefaultTheme from "vitepress/theme";
import zijidUI from "zijid-ui";
export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		console.log(`app:`, app);

		app.use(zijidUI);
	},
};
