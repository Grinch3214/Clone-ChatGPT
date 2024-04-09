<template>
  <NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
	import { GptAction, useChatGptStore } from '~/store/index'

	const chatGptStore = useChatGptStore()

	onMounted(() => {
		chatGptStore[GptAction.LOAD_FROM_LOCAL_STORAGE]()
	})
</script>
