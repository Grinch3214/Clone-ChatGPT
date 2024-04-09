<template>
	<div class="relative">
		<textarea v-model="chatGptStore.inputData" placeholder="Message ChatGPT..." class="border border-border bg-background placeholder:text-border w-full rounded-md p-2 pr-8 resize-none text-sm max-h-[158px] outline-none focus:shadow-border focus:shadow-white" style="height: 38px;" @input="adjustTextareaHeight"></textarea>
		<button class="absolute right-1 bottom-1.5" @click="chatGptStore.sendMessage" :disabled="checkEmptyField">
			<Icon name="jam:arrow-square-up-f" size="30px" :color="changeColorIcon" />
		</button>
	</div>
</template>

<script setup lang="ts">
	import { useChatGptStore } from '~/store/index'

	const chatGptStore = useChatGptStore()

	const changeColorIcon = computed<string>(() => {
		return chatGptStore.inputData === '' ? '#5a5757' : 'white'
	})
	const checkEmptyField = computed<boolean>(() => {
		return chatGptStore.inputData === '' ? true : false
	})

	function adjustTextareaHeight(event) {
		const target = event.target
		target.style.height = `${38}px`
		target.style.height = `${target.scrollHeight + 2}px`
	}
</script>