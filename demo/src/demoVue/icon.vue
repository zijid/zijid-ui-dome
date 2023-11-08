<script setup>
import { ref,reactive,computed,watch,watchEffect,onMounted,nextTick} from "vue";
import { Message} from "zijid-ui/dev";

const props=defineProps({
})
const emits=defineEmits([])
const names=[
    "3column",
    "column-4",
    "add",
    "add-circle",
    "adjust",
    "arrow-up-circle",
    "arrow-right-circle",
    "arrow-down",
    "ashbin",
    "arrow-right",
    "browse",
    "bottom",
    "back",
    "bad",
    "arrow-double-left",
    "arrow-left-circle",
    "arrow-double-right",
    "caps-lock",
    "camera",
    "chart-bar",
    "attachment",
    "code",
    "close",
    "check-item",
    "calendar",
    "comment",
    "column-vertical",
    "column-horizontal",
    "complete",
    "chart-pie",
    "cry",
    "customer-service",
    "delete",
    "direction-down",
    "copy",
    "cut",
    "data-view",
    "direction-right",
    "direction-up",
    "discount",
    "direction-left",
    "download",
    "electronics",
    "drag",
    "elipsis",
    "export",
    "explain",
    "edit",
    "eye-close",
    "email",
    "error",
    "favorite",
    "file-common",
    "file-delete",
    "file-add",
    "film",
    "fabulous",
    "file",
    "folder-close",
    "filter",
    "good",
    "hide",
    "home",
    "history",
    "file-open",
    "forward",
    "import",
    "image-text",
    "keyboard-26",
    "keyboard-9",
    "link",
    "layout",
    "fullscreen-shrink",
    "layers",
    "lock",
    "fullscreen-expand",
    "map",
    "meh",
    "menu",
    "loading",
    "help",
    "minus-circle",
    "modular",
    "notification",
    "mic",
    "more",
    "pad",
    "operation",
    "play",
    "print",
    "mobile-phone",
    "minus",
    "navigation",
    "pdf",
    "prompt",
    "move",
    "refresh",
    "run-up",
    "picture",
    "run-in",
    "pin",
    "save",
    "search",
    "share",
    "scanning",
    "security",
    "sign-out",
    "select",
    "stop",
    "success",
    "smile",
    "switch",
    "setting",
    "survey",
    "task",
    "skip",
    "text",
    "time",
    "telephone-out",
    "toggle-left",
    "toggle-right",
    "telephone",
    "top",
    "unlock",
    "user",
    "upload",
    "work",
    "training",
    "warning",
    "zoom-in",
    "zoom-out",
    "add-bold",
    "arrow-left-bold",
    "arrow-up-bold",
    "close-bold",
    "arrow-down-bold",
    "minus-bold",
    "arrow-right-bold",
    "select-bold",
    "arrow-up-filling",
    "arrow-down-filling",
    "arrow-left-filling",
    "arrow-right-filling",
    "caps-unlock-filling",
    "comment-filling",
    "check-item-filling",
    "clock-filling",
    "delete-filling",
    "decline-filling",
    "dynamic-filling",
    "intermediate-filling",
    "favorite-filling",
    "layout-filling",
    "help-filling",
    "history-filling",
    "filter-filling",
    "file-common-filling",
    "news-filling",
    "edit-filling",
    "fullscreen-expand-filling",
    "smile-filling",
    "rise-filling",
    "picture-filling",
    "notification-filling",
    "user-filling",
    "setting-filling",
    "switch-filling",
    "work-filling",
    "task-filling",
    "success-filling",
    "warning-filling",
    "folder-filling",
    "map-filling",
    "prompt-filling",
    "meh-filling",
    "cry-filling",
    "top-filling",
    "home-filling",
    "sorting"
]

function copy(val){
	let oInput = document.createElement('input')
	oInput.value = val
	document.body.appendChild(oInput)
	oInput.select() // 选择对象;
	document.execCommand('Copy') // 执行浏览器复制命令
	Message({
		title: '复制成功'+oInput.value,
		message:"Success",
		type: 'success',
		// html:'复制成功'+oInput.value,
	})
      oInput.remove()
}

function copyIcon(val,type){
	switch(type){
		case 0:
			copy(`<i class="zijid-ui zj-${val}"></i>`)
		break;
		case 1:
			copy(`<zi-icon name="${val}"></zi-icon>`)
		break;
		case 2:
		copy("zj-"+val)
		break;
		default:
			copy(val)
			Message({
			title: '复制成功'+oInput.value,
			message:"Success",
			type: 'error',
		})
		// html:'复制成功'+oInput.value,
	}
}
</script>

<template>
	<div>
		<h1>zijid-ui 图标库</h1>
		<h3>使用方法</h3>
		<code class="code">
			{{`<zi-icon color="#000" name="edit"></zi-icon>
				<i class="zijid-ui zj-3column"></i>
				<i class="zijid-ui zj-bottom"></i>
				<i class="zijid-ui zj-export"></i>
			`}}
		</code>
	</div>
	<div class="icon-box">
		<div v-for="item in names" class="icon-box-border" >
			<div class="mask">
				<span @click="copyIcon(item,0)">复制i</span>
				<span @click="copyIcon(item,1)">复制组件</span>
				<span @click="copyIcon(item,2)">复制类名</span>
			</div>
			<zi-icon color="#606266" :name="item"></zi-icon>
		</div>
	</div>
</template>


<style scoped>
.icon-box{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
}
.icon-box-border{
	padding: 1em;
	text-align: center;
	width:100px;
	border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
	position: relative;
	font-size: 22px;
}
.mask{
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
    bottom:0;
	background-color: #000000c0;
	color: #fff;
	display: flex;
	flex-direction: column;
	display: none;
	font-size: 12px;
	align-items: center;
	justify-content: center;
}
.mask span{
	display: inline-block;
	width: 100%;
	line-height: 1.5em;
}
.mask span:hover{
	background-color: red;
	cursor: pointer;
}
.icon-box-border:hover .mask{
	display: flex;
}
.code{
	box-sizing: border-box;
	width:100%;
	border: 1px solid #000;
    background: #000;
    color: #fff;
    padding: 1em;
	display: inline-block;
	white-space: pre-line;
}

.copy{
	cursor: pointer;
}
.copy::after{
	content: "点击复制";
	margin-bottom: 1em;
	display: inline-block;
	text-align: right;
}
.copy:active::after{
	text-decoration:#fff underline;
}
</style>