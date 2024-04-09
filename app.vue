<template>
  <NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
	import { useChatGptStore } from '~/store/index'

	const chatGptStore = useChatGptStore()

	onMounted(() => {
		chatGptStore.loadFromLocalStorage()
	})
</script>
