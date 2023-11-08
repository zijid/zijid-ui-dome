<script setup>

import { ref,reactive,computed,watch,watchEffect,onMounted,nextTick,onUnmounted} from "vue";
import {Message,IndexedDB} from "zijid-ui";

const dbName=ref("12222")
const tableName=ref("aa")
const keyData=ref("")
const data=ref("{\"a\":1,\"f\":\"1\"}")
const noKey=ref(false)
const isReloadTable=ref(false)
const findData=ref([])
const selectData=ref("")
const selectDataType=ref("String")

const dbConfig=reactive({
	keyPath:"f",
	autoIncrement:false
})
const db=ref(null)
const keyList=reactive([])
function createDB(){
	window.aaa=db.value=new IndexedDB(dbName.value)
	console.log(`db.value:`,db.value);
	Message(`数据库连接，数据库名称:${db.value.name}`)
}
createDB()
createTable()
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
async function createTableAndKey(){
	const config={...dbConfig}
	if(noKey.value){
		delete config.keyPath
	}
	if(await db.value.isCreate(tableName.value)===false){
		await db.value.createTable(tableName.value,config,keyList)
		Message(`创建表:${tableName.value}，配置:${JSON.stringify(dbConfig)}`)
	}else{
		Message.error("表已存在")
	}
}
async function createKey(){
	if(!db.value){
		Message.error("先连接数据库")
		return 
	}
	let createIndexState=await db.value.createIndex(tableName.value,keyList)
	console.log(`createIndexState:`,createIndexState);
}
function addKey(){
	keyList.push({
		name:"",
		key:"",
		config:{
			unique:false,
			multiEntry:false,
		}
	})
}
async function addData(){
	let json
	try{
		json=JSON.parse(data.value)
	}catch(err){
		json=data.value
	}
	await db.value.add(tableName.value,json,keyData.value)
}
async function findAll(){
	if(!db.value){
		Message.error("先连接数据库")
		return 
	}
	let data=await db.value.findAll(tableName.value)
	findData.value=data
}
async function select(){
	if(!db.value){
		Message.error("先连接数据库")
		return 
	}
	let data=await db.value.find(tableName.value,eval(`${selectDataType.value}(${selectData.value})`))
	console.log(`data:`,data);
	findData.value=[data]
}
async function deleteValue(){
	if(!db.value){
		Message.error("先连接数据库")
		return 
	}
	

	console.log(`selectData.value:`,eval(`${selectDataType.value}(${selectData.value})`));
	let data=await db.value.delete(tableName.value,eval(`${selectDataType.value}(${selectData.value})`))
	console.log(`data:`,data);
	findData.value=[data]
}

onUnmounted(()=>{
	if(db.value){
		db.value.close()
	}
})
</script>

<template>
<div class="DBTestBox">
	<h3>操作数据库</h3>
	<h4>new IndexedDB(表名)</h4>
	<code class="code">
		{{ `function createDB(){
	window.aaa=db.value=new IndexedDB(dbName.value)
	console.log(\`db.value:\`,db.value);
	Message(\`数据库连接，数据库名称:\${db.value.name}\`)
}` }}
	</code>
	<h3>数据库</h3>
	<div>
		<label for="dbName">数据库名称:</label>
		<input id="dbName" type="text" v-model="dbName">
	</div>
	<div>
		<label for="tableName">表名称:</label>
		<input id="tableName" type="text" v-model="tableName">
	</div>
	<button @click="createDB">创建</button>
	<hr>
	<h3>键</h3>
	<h4>db.createTable(表名,主键配置,索引配置数组)</h4>
	<code class="code">
		{{ `async function createTableAndKey(){
	const config={...dbConfig}
	if(noKey.value){
		delete config.keyPath
	}
	if(await db.value.isCreate(tableName.value)===false){
		await db.value.createTable(tableName.value,config,keyList)
		Message(\`创建表:${tableName.value}，配置:${JSON.stringify(dbConfig)}\`)
	}else{
		Message.error("表已存在")
	}
}` }}
	</code>
	<code class="code">
		{{ `async function createKey(){
	if(!db.value){
		Message.error("先连接数据库")
		return 
	}
	let createIndexState=await db.value.createIndex(tableName.value,keyList)
	console.log(\`createIndexState:\`,createIndexState);
}` }}
	</code>
	<code class="code">
		{{ `async function createTable(){
	const config={...dbConfig}
	if(noKey.value){
		delete config.keyPath
	}
	if(await db.value.isCreate(tableName.value)===false){
		await db.value.createTable(tableName.value,config)
		Message(\`创建表:\${tableName.value}，配置:\${JSON.stringify(dbConfig)}\`)
	}else{
		Message.error("表已存在")
	}
}` }}
	</code>
	<div>
		<label for="dbKey">数据库主键:</label>
		<input id="dbKey" type="text" v-model="dbConfig.keyPath">
		<span>
			<label for="noKey">主键是否为外键:</label>
			<input id="noKey" type="checkbox" v-model="noKey">
		</span>&nbsp;&nbsp;&nbsp;&nbsp;
		<span>
			<label for="autoIncrement">数据库主键是否自增:</label>
			<input id="autoIncrement" type="checkbox" v-model="dbConfig.autoIncrement">
		</span>
	</div>
	<div>
		<div v-for="key,index in keyList" :key="index">
			索引名(indexName)：<input type="text" v-model="keyList[index].name" name="" id="">
			索引键名(keyPath)：<input type="text" v-model="keyList[index].key" name="" id="">
			是否重复(unique)：<input type="checkbox" v-model="keyList[index].config.unique" name="" id="">
			multiEntry：<input type="checkbox" v-model="keyList[index].config.multiEntry" name="" id="">
		</div>
		<button @click="addKey" class="button1">新增索引</button>
	</div>
	<label for="isReloadTable">是否重新创建表</label><input type="checkbox" v-model="isReloadTable" name="" id="isReloadTable">
	<label for="isReloadTable" style="font-size: 12px; color: #666;">每次重新创建会删除原有数据</label>
	<button @click="createTableAndKey">创建索引和表</button>
	<button @click="createKey">添加索引</button>
	<button @click="createTable">创建表</button>
	<hr>
	<div>
		<h3>数据</h3>
		<h4>db.add(表名,数据,主键(主键可以放这里也可以放数据的属性里),是否更新(默认false))</h4>
		<code class="code">
			{{ `async function addData(){
	let json
	try{
		json=JSON.parse(data.value)
	}catch(err){
		json=data.value
	}
	await db.value.add(tableName.value,json,keyData.value)
}` }}
		</code>
		<div>
			<input type="text" v-model="dbName">
		</div>
	</div>
	<div>
		<label for="keyData">主键值:</label>
		<input id="keyData" type="text" v-model="keyData">
	</div>
	<div>
		<label for="data">数据值:</label>
		<input id="data" type="text" v-model="data">
	</div>
	<button @click="addData">添加数据</button>
	<hr>
	<div>
		<div v-for="item,index in findData" :key="index">
		<span style="user-select: none;pointer-events: none;">{{index}}</span>	{{ item }}
		</div>
	</div>
	
	<button @click="findAll">全部数据</button>
	搜索主键<input type="text" v-model="selectData">
	值类型
	<select v-model="selectDataType">
		<option value="String">String</option>
		<option value="Number">Number</option>
		<option value="Boolean">Boolean</option>
	</select>

	<button @click="select">搜索值</button>
	<button @click="deleteValue">删除值</button>
</div>
</template>

<style scoped>
.DBTestBox{
	padding: 1em;
}
button{
	background-color: darkorange;
	padding:.5em 3em;
	color: #fff;
	border: 0;
	font-weight: bold;
	display: block;
	margin: 1em 0;
}
button:hover{
	background-color: rgb(0, 153, 255);
}
.button1{
	background-color: rgb(4, 0, 255);
	padding: .2em .2em;
}
input[type="text"]{
	width: 10em;
    padding: 0.3em 1em;
    margin: 0.3em;
    border-radius: 10px;
    border-style: solid;
    border-width: 1px;
}
</style>