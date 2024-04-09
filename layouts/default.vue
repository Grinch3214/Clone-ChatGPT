<template>
	<section class="md:grid md:grid-cols-[280px_1fr] min-h-screen">
		<Sidebar />
		<div class="relative px-5 h-screen">
			<AppHeader />

			<slot />
		</div>
	</section>
</template>