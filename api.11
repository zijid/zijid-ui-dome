<script setup>
import {ref } from "vue"
import { Message} from "zijid-ui";
import icon from "./components/icon.vue"
import DBTest from "./components/DBTest.vue"
const data=[
	{
		title:"组件",
		isGroup:true,
		icon:"zj-modular",
		children:[
			{
				title:"安装",
				icon:"zj-direction-down",
				children:[
				],
				path:"/groups/1",
				handle:function(){
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
				handle:function(){
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
				handle:function(){
					location.hash=""
					location.hash="#fileDir"
				}
			},
			{
				title:"icon",
				icon:"zj-layers",
				children:[
					
				],
				handle:function(){
					location.hash="#icon"

				}
			},
			{
				title:"加载动画",
				icon:"zj-loading",
				children:[
					
				],
				handle:function(){
					location.hash=""
					location.hash="#loading"
				}
			},
			{
				title:"按钮",
				icon:"zj-operation",
				children:[
					
				],
				handle:function(){
					location.hash=""
					location.hash="#button"
				}
			},
			{
				title:"提示信息",
				icon:"zj-notification-filling",
				children:[
					
				],
				handle:function(){
					location.hash=""
					location.hash="#message"
				}
			},
			{
				title:"头部组件",
				icon:"zj-layout",
				children:[
					
				],
				handle:function(){
					location.hash=""
					location.hash="#header"
				}
			},
			{
				title:"缩放",
				icon:"zj-menu",
				children:[
					
				],
				handle:function(){
					location.hash=""
					location.hash="#zoom"
				}
			},
			{
				title:"indexedDB数据库",
				icon:"zj-layers",
				children:[
					
				],
				handle:function(){
					location.hash=""
					location.hash="#indexedDB"
				}
			}
		]
	}
]
function action(e){
	console.log("点击了:",e);
}
function top(){
	location.hash=''
	location.hash='#top'
}
const isLoading=ref(false)
function show(){
	isLoading.value=true
	Message.warn('3秒后自动隐藏')
	setTimeout(()=>{
		isLoading.value=false
	},3000)
}
const dirData1=[
	{
		title:"文件夹",
		children:[
			{
				isGroup:true,
				title:"文件222",
				data:"文件222",
				handle:function(title){
					console.log("title:",title);
				}
			}
		],
		handle:function(title){
			console.log("title:",title);
		}
	},
	{
		title:"空文件夹",
		children:[],
		handle:function(title){
			console.log("title:",title);
		}
	},
	{
		isGroup:true,
		title:"文件1",
		data:"文件1",
		handle:function(title){
			console.log("title:",title);
		}
	},
	{
		isGroup:true,
		title:"文件2",
		data:"文件2",
		handle:function(title){
			console.log("title:",title);
		}
	}
]
const openDir=(e)=>{
	Message.succeed("打开了:"+e)
}
</script>

# zijid-ui

这里展示了zijid-ui的组件和一些方法
！！！贼垃圾的库 库和源文档应该更新过 对不上了 等以后想写再重写吧
## 开始使用

```cmd
npm i zijid-ui
```
```js
import z,{ Message} from "zijid-ui";
import App from "./App.vue";
const app=createApp(App)
app.use(z)
```


## 仿vscode目录

```vue
<zi-dir @open="openDir" :data="dirData1"></zi-dir>
```

<div style="height:200px;line-height:1em;">
	<zi-dir @open="openDir" :data="dirData1"></zi-dir>
</div>

## 菜单

```js

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
```


```vue
<zi-dir @open="openDir" :data="dirData1"></zi-dir>
```

<div style="height: 300px;line-height:2em;">
	<zi-file-dir :data="data" default-active="按钮" 
	@action="action"
	action-key="title"
	:default-openeds="['2-1','按钮']"
	dirIcon="zj-arrow-down-bold"
	dirIconOpen="zj-arrow-up-bold"
	:isZoom="true"
	></zi-file-dir>
</div>

## zijid-ui 图标库

感觉没什么用 就仿着做

```vue
<zi-icon color="#000" name="edit"></zi-icon>
<i class="zijid-ui zj-3column"></i>
<i class="zijid-ui zj-bottom"></i>
<i class="zijid-ui zj-export"></i>
```

<icon></icon>
## 加载动画

```vue
<zi-loading fixed :isLoading="true" @click="Message.warn('1')" :fixed="false"></zi-loading>
```

<h1 id="loading">加载动画</h1>
<button @click="show" style="padding: 10px;background-color: rgb(0, 81, 255);color: #fff;border: 0;">显示</button>
<zi-loading fixed :isLoading="isLoading" @click="Message.warn('1')"></zi-loading>

## 按钮

按钮类型 default|affirm|delete  
按钮背景变淡 plain  
圆角round  
变淡加圆角round  

```vue
<zi-button type="delete" plain round>删除按钮</zi-button>

```
## 提示信息

按钮类型 default|affirm|delete  
按钮背景变淡 plain  
圆角round  
变淡加圆角round  

```js
import {Message} from "@/components/message/index.js"
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
});
```


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

## 头部

```vue
<zi-header>
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
</zi-header>
```

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

## 缩放

```vue
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
```
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

## indexedDB数据库

操作数据库  
new IndexedDB(表名)  
```js
function createDB(){
	window.aaa=db.value=new IndexedDB(dbName.value)
	console.log(`db.value:`,db.value);
	Message(`数据库连接，数据库名称:${db.value.name}`)
}
```
db.createTable(表名,主键配置,索引配置数组)

```js
async function createTableAndKey(){
	const config={...dbConfig}
	if(noKey.value){
		delete config.keyPath
	}
	if(await db.value.isCreate(tableName.value)===false){
		await db.value.createTable(tableName.value,config,keyList)
		Message(`创建表:undefined，配置:{"keyPath":"f","autoIncrement":false}`)
	}else{
		Message.error("表已存在")
	}
}
```

```js
async function createKey(){
	if(!db.value){
		Message.error("先连接数据库")
		return 
	}
	let createIndexState=await db.value.createIndex(tableName.value,keyList)
	console.log(`createIndexState:`,createIndexState);
}
```

```js
async function createTable(){
	const config={...dbConfig}
	if(noKey.value){
		delete config.keyPath
	}
	if(await db.value.isCreate(tableName.value)===false){
		await db.value.createTable(tableName.value,config)
		Message(`创建表:${tableName.value}，配置:${JSON.stringify(dbConfig)}`)
	}else{
		Message.error("表已存在")
	}
}
```
db.add(表名,数据,主键(主键可以放这里也可以放数据的属性里),是否更新(默认false))

```js 
async function addData(){
	let json
	try{
		json=JSON.parse(data.value)
	}catch(err){
		json=data.value
	}
	await db.value.add(tableName.value,json,keyData.value)
}
```