const OpenAiKey = process.env.OPENAI_API_KEY;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
	modules: [
		'@nuxtjs/tailwindcss',
		'nuxt-icon',
		'nuxt-chatgpt',
		'@pinia/nuxt',
		['@nuxtjs/color-mode', {
			preference: 'dark',
			classSuffix: '',
		}],
		['@nuxtjs/google-fonts', {
			families: {
				Lato: {
					wght: [300, 400, 700],
					ital: [300],
				}
			}
		}],
		'nuxt3-notifications',
	],
	chatgpt: {
		apiKey: OpenAiKey,
	},
})