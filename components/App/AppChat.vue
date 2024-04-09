<template>
	<div class="flex text-sm gap-3 mb-5">
		<Icon v-if="role === 'user'" name="fontisto:travis" size="24px" />
		<Icon v-else name="simple-icons:openai" size="24px" />
		<div class="flex w-full flex-col">
			<div class="font-bold select-none">{{ role }}</div>
			<p>{{ content }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		role: string,
		content: string
	}>()
</script>