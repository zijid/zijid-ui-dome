<script setup>
import {ref,onMounted,reactive, nextTick } from "vue"
import { Message} from "zijid-ui";
import icon from "./demoVue/icon.vue"
import DBTest from "./DBTest.vue"
const data=[
	{
		title:"组件",
		isGroup:true,
		icon:"zj-modular",
		children:[
			{
				title:"安装1",
				icon:"zj-direction-down",
				children:[
			{
				title:"安装2",
				icon:"zj-direction-down",
				children:[
			{
				title:"安装3",
				icon:"zj-direction-down",
				children:[
			{
				title:"安装",
				icon:"zj-direction-down",
				children:[
				],
				path:"/groups/1",
				handle:function(title, children,event){
					location.hash=""
					location.hash="#install"
				}
			},
				],
				path:"/groups/1",
				handle:function(title, children,event){
					location.hash=""
					location.hash="#install"
				}
			},
				],
				path:"/groups/1",
				handle:function(title, children,event){
					location.hash=""
					location.hash="#install"
				}
			},
				],
				path:"/groups/1",
				handle:function(title, children,event){
					location.hash=""
					location.hash="#install"
				}
			},
			{
				title:"目录",
				icon:"zj-column-vertical",
				children:[
				],
				path:"/groups/1",
				handle:function(title, children,event){
					location.hash=""
					location.hash="#dir"
				}
			},
			{
				title:"文件目录",
				icon:"zj-file",
				children:[
					
				],
				path:"",
				handle:function(title, children,event){
					location.hash=""
					location.hash="#fileDir"
				}
			},
			{
				title:"icon",
				icon:"zj-layers",
				children:[
					
				],
				handle:function(title, children){
					location.hash="#icon"

				}
			},
			{
				title:"加载动画",
				icon:"zj-loading",
				children:[
					
				],
				handle:function(title, children,event){
					location.hash=""
					location.hash="#loading"
				}
			},
			{
				title:"按钮",
				icon:"zj-operation",
				children:[
					
				],
				handle:function(title, children,event){
					location.hash=""
					location.hash="#button"
				}
			},
			{
				title:"提示信息",
				icon:"zj-notification-filling",
				children:[
					
				],
				handle:function(title, children,event){
					location.hash=""
					location.hash="#message"
				}
			},
			{
				title:"头部组件",
				icon:"zj-layout",
				children:[
					
				],
				handle:function(title, children,event){
					location.hash=""
					location.hash="#header"
				}
			},
			{
				title:"缩放",
				icon:"zj-menu",
				children:[
					
				],
				handle:function(title, children,event){
					location.hash=""
					location.hash="#zoom"
				}
			},
			{
				title:"indexedDB数据库",
				icon:"zj-layers",
				children:[
					
				],
				handle:function(title, children,event){
					location.hash=""
					location.hash="#indexedDB"
				}
			}
		],
		// handle:function(title, children){
		// 	console.log("title:",title);
		// }
	},
	
	// {
	// 	isGroup:true,
	// 	title:"2F1asd23qwe2F1asd23qwe2F1asd23qwe2F1asd23qwe",
	// 	children:[
	// 		{
	// 			isGroup:true,
	// 			title:"2-1",
	// 			icon:"zj-file",
	// 			children:[
					
	// 			],
	// 			handle:function(title, children){
	// 				console.log("title:",title);
	// 			}
	// 		}
	// 	],
	// 	handle:function(title, children){
	// 		console.log("title222222:",title);
	// 	}
	// }

]
function action(e){
	console.log("点击了:",e);
}
function top(){
	location.hash=''
	location.hash='#top'
}
function onSt(t){
	console.log("t:",t);
}
const isLoading=ref(false)
function show(){
	isLoading.value=true
	Message.warn('3秒后自动隐藏')
	setTimeout(()=>{
		isLoading.value=false
	},3000)
}
const dirData=reactive({
	value:[]
})
const dirData1=[
	{
		title:"文件夹",
		children:[
			{
				isGroup:true,
				title:"文件222",
				data:"文件222",
				handle:function(title, children){
					console.log("title:",title);
				}
			}
		],
		handle:function(title, children){
			console.log("title:",title);
		}
	},
	{
		title:"空文件夹",
		children:[],
		handle:function(title, children){
			console.log("title:",title);
		}
	},
	{
		isGroup:true,
		title:"文件1",
		data:"文件1",
		handle:function(title, children){
			console.log("title:",title);
		}
	},
	{
		isGroup:true,
		title:"文件2",
		data:"文件2",
		handle:function(title, children){
			console.log("title:",title);
		}
	}
]
const openDir=(e)=>{
	Message.succeed("打开了:"+e)
}
const position=reactive({
	x:0,y:0
})
</script>

<template>

<zi-header>
	<template #logo>
		<div>logo</div>
	</template>
	<template #default>
		
	<zi-zoom v-slot="scope" offset="-1em">
		<div :class="scope.class">
			<div>
				首页
			</div>
			<div>
				我的
			</div>
			<div>
				作品
			</div>
			<div>
				资讯
			</div>
			<div>
				关于本站
			</div>
		</div>
	</zi-zoom>
	</template>
</zi-header>

<div class="box">
	<div class="left">
			<zi-dir :data="data" default-active="按钮" 
				@action="action"
				action-key="title"
				:default-openeds="['2-1','按钮']"
				dirIcon="zj-arrow-down-bold"
				dirIconOpen="zj-arrow-up-bold"
				:isZoom="true"
			></zi-dir>
	</div>
	<div class="right">
		<i id="top"></i>


		
		<h1 id="install">安装</h1>
		cmd
		<code class="code">
			{{ `npm i zijid-ui` }}
		</code>
		
		main.js
		<code class="code">
			{{ `import z,{ Message} from "zijid-ui";
import App from "./App.vue";
const app=createApp(App)
app.use(z)` }}
		</code>
		<h1 id="dir">目录</h1>
		<code class="code">
			
{{ `<zi-dir :data="data" default-active="按钮" 
	@action="action"
	action-key="title"
	:default-openeds="['2-1','按钮']"
	dirIcon="zj-arrow-down-bold"
	dirIconOpen="zj-arrow-up-bold"
	:isZoom="true"
></zi-dir>` }}

		</code>

		<div style="height: 300px;">
			<zi-dir :data="data" default-active="按钮" 
			@action="action"
			action-key="title"
			:default-openeds="['2-1','按钮']"
			dirIcon="zj-arrow-down-bold"
			dirIconOpen="zj-arrow-up-bold"
			:isZoom="true"
			></zi-dir>
		</div>
		<h1 id="fileDir">文件目录</h1>
		
		<code class="code">
			
			{{ `const dirData1=[
	{
		title:"文件夹",
		children:[
			{
				isGroup:true,
				title:"文件222",
				data:"文件222",
				handle:function(title, children){
					console.log("title:",title);
				}
			}
		],
		handle:function(title, children){
			console.log("title:",title);
		}
	},
	{
		title:"空文件夹",
		children:[],
		handle:function(title, children){
			console.log("title:",title);
		}
	},
	{
		isGroup:true,
		title:"文件1",
		data:"文件1",
		handle:function(title, children){
			console.log("title:",title);
		}
	},
	{
		isGroup:true,
		title:"文件2",
		data:"文件2",
		handle:function(title, children){
			console.log("title:",title);
		}
	}
]
const openDir=(e)=>{
	Message.succeed("打开了:"+e)
}
			<zi-dir @open="openDir" :data="dirData1"></zi-dir>` }}

		</code>
		<div style="height: 100px;">
			<zi-file-dir @open="openDir" :data="dirData1"></zi-file-dir>
		</div>
		<div class="top" @click="top">
			<zi-icon name="direction-up" color="#fff"></zi-icon>
		</div>
		<h1 id="icon">icon</h1>
		<icon></icon>
		<h1 id="loading">加载动画</h1>
		<button @click="show" style="padding: 10px;background-color: rgb(0, 81, 255);color: #fff;border: 0;">显示</button>
		<zi-loading fixed :isLoading="isLoading" @click="Message.warn('1')" :fixed="false"></zi-loading>
		<code class="code">
			{{ 	` <zi-loading fixed :isLoading="true" @click="Message.warn('1')" :fixed="false"></zi-loading>` }}
		</code>

		
		<h1 id="button">按钮</h1>
		<div>按钮类型 default|affirm|delete</div>
		<zi-button type="default">默认按钮</zi-button>
		<zi-button type="affirm">确认按钮</zi-button>
		<zi-button type="delete">删除按钮</zi-button>
		<br />
		<div>按钮背景变淡 plain</div>
		<zi-button type="default" plain>默认按钮</zi-button>
		<zi-button type="affirm" plain>确认按钮</zi-button>
		<zi-button type="delete" plain>删除按钮</zi-button>
		<br />
		<div>圆角round</div>
		<zi-button type="default" round>默认按钮</zi-button>
		<zi-button type="affirm" round>确认按钮</zi-button>
		<zi-button type="delete" round>删除按钮</zi-button>
		<br />
		<div>变淡加圆角round</div>
		<zi-button type="default" plain round>确认按钮</zi-button>
		<zi-button type="affirm" plain round>确认按钮</zi-button>
		<zi-button type="delete" plain round>删除按钮</zi-button>
		<br />
		<code class="code">
			{{ 	`<zi-button type="delete" plain round>删除按钮</zi-button>` }}
		</code>

		<h1 id="message">提示信息</h1>
		
		<zi-button type="default" @click='Message.info("info")'>info信息</zi-button>
		<zi-button type="affirm" @click='Message.succeed("succeed")'>succeed成功信息</zi-button>
		<zi-button type="delete" @click='Message.error("error")'>error失败信息</zi-button>
		<zi-button type="default" @click='Message.warn("warn")'>warn提示信息</zi-button>
		<code class="code">{{ 	`import {Message} from "@/components/message/index.js"
console.log("Message:",Message);
Message.succeed("succeed")
Message.info("info")
Message.error("error")
Message.warn("warn")
Message({
	title:"ssssssss",
	type:"info",
	close:false,
	time:4000
});
Message({
	title:"<h1>h1</h1>",//内容
	html:true//使用html
	type:"info",//类型
	close:false,//是否可关闭
	time:4000//自动关闭时间
});` }}
		</code>
		
		<h1 id="header">头部</h1>
		<code class="code">{{ `<zi-header>
	<template #logo>
		<div>logo</div>
	</template>
	<template #default>
	<zi-zoom v-slot="scope">
		<div :class="scope.class">
			<div>
				首页
			</div>
			<div>
				我的
			</div>
			<div>
				作品
			</div>
			<div>
				资讯
			</div>
			<div>
				关于本站
			</div>
		</div>
	</zi-zoom>
	</template>
</zi-header>` }}

		</code>
		<div style="height: 100px;">
			
			<zi-header>
				<template #logo>
					<div>logo</div>
				</template>
				<template #default>
					
				<zi-zoom v-slot="scope" offset="calc(-1em + -16px)">
					<!-- noZoom="con" zoom="conNo" -->
					<div :class="scope.class">
						<div>
							首页
						</div>
						<div>
							我的
						</div>
						<div>
							作品
						</div>
						<div>
							资讯
						</div>
						<div>
							关于本站
						</div>
					</div>
				</zi-zoom>
				</template>
			</zi-header>
		</div>
		<h1 id="zoom">缩放</h1>
		<code class="code">{{ `<zi-zoom v-slot="scope">
	<div :class="scope.class">
		<div>
			首页
		</div>
		<div>
			我的
		</div>
		<div>
			作品
		</div>
		<div>
			资讯
		</div>
		<div>
			关于本站
		</div>
	</div>
</zi-zoom>` }}

		</code>
		<div style="height: 100px;">
			<zi-zoom v-slot="scope" offset="-16px">
				<!-- noZoom="con" zoom="conNo" -->
				<div :class="scope.class">
					<div>
						首页
					</div>
					<div>
						我的
					</div>
					<div>
						作品
					</div>
					<div>
						资讯
					</div>
					<div>
						关于本站
					</div>
				</div>
			</zi-zoom>
		</div>
		
		<h1 id="indexedDB">indexedDB数据库</h1>
		<Suspense>
			<DBTest></DBTest>
		</Suspense>


	</div>
</div>
</template>

<style>
.box{
	display: flex;
	flex-direction: row;
	height: calc( 100vh - 50px );
}
:root{
	--width:300px;
}
.left{
}
.right{
	overflow: auto;
	min-width: calc( 100% - 200px - 2em);
	max-width: 100%;
	padding: 1em;
}
.left,.right{
	height: 100%;
	box-sizing: border-box;
	float: left;
}
.top{
	position: fixed;
    bottom: 2em;
    right: 2em;
    width: 4em;
    height: 4em;
    background: #0051ff;
    z-index: 9999;
	display: flex;
    justify-content: center;
    align-items: center;
}
.top:active{
	background-color: #2167ff;
}
.code{
	padding: 1em;
	color: #fff;
	background-color: #000;
	font-size: 12px;
	white-space: pre;
	display: block;
	font-family: 微软雅黑;
    line-height: 2em;
	margin-bottom: 1em;
}
</style>