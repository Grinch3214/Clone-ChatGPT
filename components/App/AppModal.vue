<template>
	<Transition name="modal-animation" appear>
		<div class="flex justify-center items-center fixed inset-0 transition-opacity z-50 bg-black/20" @click="$emit('close')">
      <div class="relative w-full max-w-[400px] px-5 py-6 bg-popover transition-all rounded-md z-[100] overflow-hidden shadow-md" @click.stop>

        <div class="flex items-center justify-between mb-6">
          <span class="text-xl font-bold"> {{ title }} </span>
          <button @click="$emit('close')">
						<Icon name="ic:outline-close" size="20px" />
					</button>
        </div>

        <div class="text-center">
					<slot name="body"></slot>
				</div>
      </div>
    </div>
	</Transition>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])
const props = defineProps<{
	title: string,
}>()

onMounted(() => {
  document.body.addEventListener('keyup', e => {
		if(e.key === 'Escape') {
			emit('close')
		}
	})
})
</script>

<style>
.modal-animation-enter-active, .modal-animation-leave-active {
	opacity: 0;
}
.modal-animation-enter-active .modal__content,
.modal-animation-leave-active .modal__content {
	transform: scale(.5);
}
</style>