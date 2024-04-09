<template>
	<div class="max-w-2xl mx-auto w-full pt-2 px-1 pb-10 h-[calc(100%-53px)] overflow-auto flex flex-col">
		<div
		  v-if="checkEmptyFieldAndTreeData"
		  class="h-full flex flex-col justify-center"
		>
			<div class="text-center">
				<Icon name="simple-icons:openai" size="2.5rem" />
				<p class="text-2xl mt-2">How can I help you today?</p>
			</div>
		</div>
		<div class="h-full overflow-auto mb-3" v-else>

			<AppChat
			  v-for="(chat, index) in chatGptStore.chatTree"
			  :key="index"
			  :content="chat.content"
			  :role="chat.role"
			/>

		</div>
		<div
		  v-if="checkEmptyFieldAndTreeData"
		  class="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 mb-3"
		>
			<AppCard
				v-for="card in cards"
				:key="card.title"
				:description="card.description"
				:title="card.title"
				class="even:hidden md:even:block"
			/>
		</div>
		<AppTextarea />
		<NuxtNotifications position="top right" :speed="500" />
	</div>
</template>

<script setup lang="ts">
import { useChatGptStore } from '~/store/index'

const chatGptStore = useChatGptStore()

const checkEmptyFieldAndTreeData = computed(() => {
	return chatGptStore.inputData === '' && chatGptStore.chatTree.length === 0 ? true : false
})
</script>

<style scoped>
	div :deep(.vue-notification) {
		@apply bg-red-400 border-0;
	}
</style>