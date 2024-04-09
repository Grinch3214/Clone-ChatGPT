<template>
	<button @click="toggleMode" title="change theme">
		<Icon name="wi:moon-alt-third-quarter" size="26px" />
	</button>
</template>

<script setup type="ts">
	import { GptAction } from '~/store'
	const colorMode = useColorMode()

	const modes = [
		GptAction.LIGHT,
		GptAction.DARK
	]

	const nextMode = computed(() => {
		const currentModeIndex = modes.indexOf(colorMode.preference)
		let nextModeIndex = null
		if(currentModeIndex + 1 === modes.length) {
			nextModeIndex = 0
		} else {
			nextModeIndex = currentModeIndex + 1
		}

		return modes[nextModeIndex]
	})

	const toggleMode = () => {
		colorMode.preference = nextMode.value
	}
</script>