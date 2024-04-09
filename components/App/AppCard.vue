<template>
	<button
		@click="sendMessage(concatMessage)"
		class="p-3 border border-border rounded-md cursor-pointer hover:bg-secondary transition-colors relative outline-none focus:shadow-border"
	>
		<div class="absolute top-1/2 right-2 -translate-y-1/2 z-20 opacity-0 hover:opacity-100 group">
			<span class="tooltip group-hover:block">Send message</span>
			<Icon name="jam:arrow-square-up-f" size="26px" color="rgba(0,0,0, 0.4)" />
		</div>
		<p class="font-bold text-sm">{{ title }}</p>
		<p class="text-xs opacity-50">{{ description }}</p>
	</button>
</template>

<script setup lang="ts">
import { GptAction, useChatGptStore } from '~/store/index'

const props = defineProps<{
	title: string,
	description: string
}>()

const chatGptStore = useChatGptStore()

const concatMessage = computed<string>(() => {
	return `${props.title} ${props.description}`
})

const sendMessage = (msg: string): void => {
	chatGptStore[GptAction.SEND_MESSAGE](msg)
}
</script>

<style scoped>
.tooltip {
	@apply px-2 hidden pointer-events-none py-0.5 text-xs absolute top-1/2 -translate-y-2/4 right-8 bg-background border border-white rounded-sm whitespace-nowrap before:absolute before:top-1/2 before:-right-1 before:-translate-y-2/4 before:block before:w-2 before:h-2 before:bg-background before:border-r before:border-b before:rotate-[-45deg];
}
</style>