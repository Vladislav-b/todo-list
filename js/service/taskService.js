import { state } from '../state.js'
import { saveItemsToLocalStorage } from '../localStorage.js'
import { render } from '../render.js'

export function createTask(title) {
	state.items.push({
		id: Date.now().toString(),
		title,
		isChecked: false
	})

	saveItemsToLocalStorage()
	render()
}

export function renameTask(taskId, itemTitle) {
	state.items = state.items.map(item => {
		if (item.id === taskId) {
			return {
				...item,
				title: itemTitle
			}
		}

		return item
	})
	saveItemsToLocalStorage()
	render()
}

export function initTaskService() {
	const listElement = document.querySelector('[data-js-todo-list]')

	const deleteTask = (id) => {
		state.items = state.items.filter((item) => item.id !== id)
		saveItemsToLocalStorage()
		render()
	}

	const toggleCheckedState = (id) => {
		state.items = state.items.map((item) => {
			if (item.id === id) {
				return {
					...item,
					isChecked: !item.isChecked
				}
			}

			return item
		})

		saveItemsToLocalStorage()
		render()
	}

	const toggleExpandedTask = (task) => {
		task.classList.toggle('is-expanded')
	}

	const onDeleteTaskButtonClick = ({ target }) => {
		if (target.closest('.item__delete-button')) {
			const itemElement = target.closest('[data-js-todo-item]')
			const itemCheckboxElement = itemElement.querySelector('[data-js-todo-item-checkbox]')

			itemElement.classList.add('is-disappearing')

			setTimeout(() => {
			  deleteTask(itemCheckboxElement.id)
			}, 400)
		}
	}

	const onCheckedStateChange = ({ target }) => {
		if (target.matches('[data-js-todo-item-checkbox]')) {
			toggleCheckedState(target.id)
		}
	}

	const onTaskTitleClick = (event) => {
		if (event.target.closest('[data-js-todo-item-title]')) {
			event.preventDefault()

			const item = event.target.closest('[data-js-todo-item]')
			toggleExpandedTask(item)
		}
	}

	const bindEvents = () => {
		listElement.addEventListener('click', onDeleteTaskButtonClick)
		listElement.addEventListener('change', onCheckedStateChange)
		listElement.addEventListener('click', onTaskTitleClick)
	}

	bindEvents()
}