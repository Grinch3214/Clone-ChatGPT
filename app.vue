<template>
  <NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
	import { useChatGptStore } from '~/store/index'
	import { onMounted } from 'vue'

	const chatGptStore = useChatGptStore()
	const colorMode = useColorMode()

	onMounted(() => {
		chatGptStore.loadFromLocalStorage()
	})

	colorMode.value = 'dark'
</script>
