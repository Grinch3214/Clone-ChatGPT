<template>
		<p
			@click="getIndexListItem(prompt)"
			class="list text-sm md:text-xs whitespace-nowrap cursor-pointer relative p-2 before:absolute before:content-block before:top-0 before:bottom-0 before:w-60 before:-mx-1.5 before:rounded-md group"
		>
			<span class="relative">
				{{ prompt[0].content }}. 
				<span class="opacity-75">{{ prompt[1].content }}</span>
			</span>

			<button
			  @click.stop="modal = true"
			  class="opacity-70 md:opacity-0 absolute z-50 top-1/2 -translate-y-2/4 right-0 bg-accent rounded-md p-1 md:group-hover:opacity-100 hover:text-secondary/60"
			>
				<Icon name="codicon:trash" size="16px" />
			</button>

			<AppModal v-show="modal" title="Do you want to clear item?" @close="modal = false">
			<template v-slot:body>
				<div class="flex gap-4 justify-center font-light">
					<button @click="modal = false" class="px-8 pt-1 pb-1.5 border border-border rounded-md text-sm">Close</button>
					<button @click="deleteItem(prompt)" class="px-8 pt-1 pb-1.5 border border-red-400 text-red-400 rounded-md text-sm">Yes</button>
				</div>
			</template>
		</AppModal>
		</p>

</template>

<script setup lang="ts">
	import { Prompt } from '~/types/gpt.ts'
	import { GptAction, useChatGptStore } from '~/store/index'

	const props = defineProps<{
		prompt: Prompt[]
	}>()

	const chatGptStore = useChatGptStore()
	const modal = ref(false)

	const deleteItem = (item) => {
		chatGptStore.dataMessages = chatGptStore.dataMessages.filter(elem => elem !== item)
		chatGptStore[GptAction.SAVE_TO_LOCAL_STORAGE]()
		modal.value = false
	}

	const getIndexListItem = (elem) => {
		chatGptStore.chatTree = elem
		chatGptStore.toggleEvent = false
	}
</script>

<style scoped>
.list:hover::before {
	@apply bg-secondary;
}
</style>