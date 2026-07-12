import { state } from "./state.js"

export function saveItemsToLocalStorage() {
	localStorage.setItem(
		'todo-items',
		JSON.stringify(state.items)
	)
}

export function getItemsFromLocalStorage() {
	const rawData = localStorage.getItem('todo-items')

	if (!rawData) {
		return []
	}

	try {
		const parsedData = JSON.parse(rawData)

		return Array.isArray(parsedData) ? parsedData : []
	} catch {
		console.error('Todo items parse error')
		return []
	}
}