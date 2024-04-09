<template>
	<aside
	  :class="[ chatGptStore.toggleEvent ? 'left-0' : '-left-full']"
	  class="px-5 py-8 bg-sidebar h-full absolute top-0 z-40 md:static w-[268px] md:w-full shadow-md transition-all"
	  ref="elementToDetectOutsideClick"
	>
		<button
		  :class="[chatGptStore.toggleEvent ? 'opacity-0' : 'opacity-100']"
		  @click="chatGptStore.toggleEvent = true "
		  class="md:hidden fixed top-2.5 left-4 transition-opacity"
		>
			<Icon name="bx:menu-alt-left" size="26px" />
		</button>

		<button
		  @click="openNewChat"
		  class="mb-10 flex w-full gap-2 items-center text-sm hover:bg-secondary px-2 py-1 rounded-md transition-colors outline-none focus:shadow-border focus:shadow-border"
		>
			<Icon name="simple-icons:openai" size="1.5rem" />
			<span>New chat</span>
			<div class="relative ml-auto group">
				<span class="tooltip group-hover:block">New chat</span>
				<Icon name="material-symbols:add" size="22px" />
			</div>
		</button>

		<button
		  @click="modal = true"
		  class="text-sm px-2 border border-border rounded-md w-full text-center py-2 mb-4 hover:bg-secondary transition-colors outline-none focus:shadow-border focus:shadow-border"
		>
			Clear history
		</button>

		<div class="overflow-x-hidden overflow-y-auto h-[calc(100vh-190px)] relative before:content-block before:absolute before:right-0 before:top-0 before:z-10 before:bottom-0 before:w-8 before:bg-gradient-to-l before:from-sidebar before:pointer-events-none">
			<AppList
			  v-for="(list, index) in chatGptStore.dataMessages"
			  :key="index"
			  :prompt="list"
			/>
		</div>

		<AppModal
		  v-show="modal"
		  @close="modal = false"
		  title="Do you want to clear all history?"
		>
			<template v-slot:body>
				<div class="flex gap-4 justify-center font-light">
					<button @click="modal = false" class="px-8 pt-1 pb-1.5 border border-border rounded-md text-sm">Close</button>
					<button @click="deleteAllMessages" class="px-8 pt-1 pb-1.5 border border-red-400 text-red-400 rounded-md text-sm">Yes</button>
				</div>
			</template>
		</AppModal>

	</aside>
</template>

<script setup lang="ts">
	import { GptAction, useChatGptStore } from '~/store/index'

	const chatGptStore = useChatGptStore()

	const elementToDetectOutsideClick = ref(null)
	const modal = ref(false)

	const openNewChat = () => {
		chatGptStore.chatTree = []
		chatGptStore.toggleEvent = false
	}

	const deleteAllMessages = () => {
		chatGptStore.dataMessages = []
		chatGptStore.chatTree = []
		chatGptStore[GptAction.SAVE_TO_LOCAL_STORAGE]()
		modal.value = false
	}

	const handleClickOutside = (event) => {
		clickOutsideHandler(event, elementToDetectOutsideClick.value, () => {
			chatGptStore.toggleEvent = false
		})
	}

	onMounted(() => {
		document.addEventListener('click', handleClickOutside)
	})

	onBeforeUnmount(() => {
		document.removeEventListener('click', handleClickOutside)
	})
</script>

<style scoped>
.tooltip {
	@apply px-2 hidden pointer-events-none py-0.5 text-xs absolute top-1/2 -translate-y-2/4 left-6 bg-background border border-border rounded-sm whitespace-nowrap before:absolute before:top-1/2 before:-left-1 before:-translate-y-2/4 before:block before:w-2 before:h-2 before:bg-background before:border-r before:border-b before:border-border before:rotate-[135deg];
}
</style>