import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatGptStore = defineStore('chatGptStore', () => {

	const { chatCompletion } = useChatgpt()
	const { notify } = useNotification();

	const toggleEvent = ref(false)

	const chatTree = ref([])
	const inputData = ref('')
	const dataMessages = ref([])

	async function sendMessage(msg) {
		try {
			const message = {
				role: 'user',
				content: `${inputData.value}` || msg,
			}

			inputData.value = ''

			chatTree.value.push(message)

			const response = await chatCompletion(chatTree.value)
			
			const responseMessage = {
				role: response[0].message.role,
				content: response[0].message.content
			}
			
			chatTree.value.push(responseMessage)

			if (chatTree.value.length > 2) {
				const lastIndex = dataMessages.value.length - 1
				dataMessages.value[lastIndex].push(message)
				dataMessages.value[lastIndex].push(responseMessage)
			} else {
					dataMessages.value.unshift([message, responseMessage])
			}

			saveToLocalStorage()

			
		} catch(error) {
			callNotification(error)
		}
	}

	const callNotification =(err) => {
    notify({
      title: "Something went wrong",
      text: `${err}`,
    })
  }

	const saveToLocalStorage = () => {
		const serializedData = JSON.stringify(dataMessages.value)
		localStorage.setItem('chatData', serializedData)
	}

	const loadFromLocalStorage = () => {
		const storedData = localStorage.getItem('chatData')
		if(storedData) {
			dataMessages.value = JSON.parse(storedData)
		}
	}

	const openNeewChat = () => {
		chatTree.value = []
		toggleEvent.value = false
	}

	const getIndexListItem = (e) => {
		chatTree.value = e
		toggleEvent.value = false
	}

	const deleteAlldataMessages = () => {
		dataMessages.value = []
		chatTree.value = []
		saveToLocalStorage()
	}

	const deleteMessage = (item) => {
		dataMessages.value = dataMessages.value.filter((elem) => elem !== item)
		saveToLocalStorage()
	}


	return {
		inputData,
		sendMessage,
		chatTree,
		dataMessages,
		loadFromLocalStorage,
		getIndexListItem,
		openNeewChat,
		toggleEvent,
		deleteAlldataMessages,
		deleteMessage
	}
})