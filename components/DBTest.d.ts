declare module "*.vue" {
	import Vue from 'vue';
	export default Vue;
  }
  
  declare module "DBTest.vue" {
	import Vue from 'vue';
  
	export default Vue;
  
	// 在这里添加组件的类型定义
	interface DBTest extends Vue {
	  // 你可以在这里定义组件的属性和方法
	}
  
	// 声明全局属性
	module "vue/types/options" {
	  interface ComponentOptions<V extends Vue> {
		myCustomOption?: string;
	  }
	}
  }