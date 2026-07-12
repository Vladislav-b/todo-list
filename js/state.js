import { getItemsFromLocalStorage } from "./localStorage.js"

export const state = {
	items: getItemsFromLocalStorage(),
	searchQuery: '',
	selectValue: 'all'
}