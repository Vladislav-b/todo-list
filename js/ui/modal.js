import { createTask, renameTask } from "../service/taskService.js"

export function initModal() {
	const listElement = document.querySelector('[data-js-todo-list]')
	const openCreateModalButton = document.querySelector('[data-js-add-task-button]')
	const modalElement = document.querySelector('[data-js-todo-modal]')	
	const titleElement = modalElement.querySelector('[data-js-todo-modal-title]')
	const applyButton = modalElement.querySelector('[data-js-todo-modal-apply]')
	const cancelButton = modalElement.querySelector('[data-js-todo-modal-cancel]')
	const inputElement = modalElement.querySelector('[data-js-todo-modal-input]')

	let editingTaskId = null

	const openModal = () => {
		document.body.classList.add('modal-open')
	}

	const closeModal = () => {
		inputElement.value = ''
		editingTaskId = null
		document.body.classList.remove('modal-open')
	}

	const onOpenModalClick = ({ target }) => {
		if (target === openCreateModalButton) {
			titleElement.textContent = 'new task'
			applyButton.textContent = 'apply'
		} else if (target.closest('.item__button--rename')) {
			titleElement.textContent = 'edit task'
			applyButton.textContent = 'save'

			const itemElement = target.closest('[data-js-todo-item]')
			const itemTitleElement = itemElement.querySelector('[data-js-todo-item-title]')
			const itemCheckboxElement = itemElement.querySelector('[data-js-todo-item-checkbox]')
			editingTaskId = itemCheckboxElement.id

			inputElement.value = itemTitleElement.textContent
		} else {
			return
		}

		openModal()
	}

	const onModalCloseClick  = ({ target }) => {
		if (target === cancelButton || target === modalElement) {
			closeModal()
		}
	}

	const onSubmit = () => {
		const title = inputElement.value.trim()

		if (!title) {
			return
		}

		if (editingTaskId) {
			renameTask(editingTaskId, title)
		} else {
			createTask(title)
		}

		closeModal()
	}

	const bindEvents = () => {
		openCreateModalButton.addEventListener('click', onOpenModalClick)
		listElement.addEventListener('click', onOpenModalClick)
		modalElement.addEventListener('click', onModalCloseClick )
		applyButton.addEventListener('click', onSubmit)
	}

	bindEvents()
}