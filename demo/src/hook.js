import {ref} from "vue"
export const test=ref(0)
export default function useHook(){
	return {
		test,
		add(){
			test.value++
		}
	}
}