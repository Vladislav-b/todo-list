import { state } from '../state.js'
import { render } from '../render.js'

export function initSearch() {
	const searchInput = document.querySelector('[data-js-todo-search-task-input]')

	const clearSearch = () => {
		state.searchQuery = ''
	}

	const onSearchChange = ({ target }) => {
		const value = target.value.trim()

		if (value.length > 0) {
			state.searchQuery = value.toLowerCase()
			render()
		} else {
			clearSearch()
			render()
		}
	}

	searchInput.addEventListener('input', onSearchChange)
}