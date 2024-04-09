import { defineStore } from 'pinia'

export enum GptAction {
	SEND_MESSAGE = "sendMessage",
  SAVE_TO_LOCAL_STORAGE = "saveToLocalStorage",
  LOAD_FROM_LOCAL_STORAGE = "loadFromLocalStorage",
	LIGHT = 'light',
	DARK = 'dark',
}

export const useChatGptStore = defineStore('chatGptStore', {

	state:() => {
		return {
			toggleEvent: false,
			chatTree: [],
			inputData: '',
			dataMessages: []
		}
	},

	actions: {
		async [GptAction.SEND_MESSAGE](msg?: string) {

			const { chatCompletion } = useChatgpt();
			const { notify } = useNotification();

			let response: any;

			try {
				const message = {
					role: 'user',
					content: `${this.inputData}` || msg,
				};
	
				this.inputData = '';

				this.chatTree.push(message);
	
				response = await chatCompletion(this.chatTree);
				
				const responseMessage = {
					role: response[0].message.role,
					content: response[0].message.content
				};
				
				this.chatTree.push(responseMessage)
	
				if (this.chatTree.length > 2) {
					this.dataMessages[0].push(message)
					this.dataMessages[0].push(responseMessage)
				} else {
						this.dataMessages.unshift([message, responseMessage])
				}

				this.saveToLocalStorage();
				
			} catch(error) {
				notify({
					title: "Something went wrong",
					text: `${error}`,
				})
			}

			return response;
		},

		[GptAction.SAVE_TO_LOCAL_STORAGE]() {
			const serializedData = JSON.stringify(this.dataMessages)
			localStorage.setItem('chatData', serializedData)
		},

		[GptAction.LOAD_FROM_LOCAL_STORAGE]() {
			const storedData = localStorage.getItem('chatData')
			if(storedData) {
				this.dataMessages = JSON.parse(storedData)
			}
		},
	}
})