import { state } from '../state.js'
import { render } from '../render.js'

export function initSelect() {
	const selectContainer = document.querySelector('[data-js-todo-select]')
	const selectInputElement = selectContainer.querySelector('[data-js-todo-select-input]')
	const selectButton = selectContainer.querySelector('[data-js-todo-select-button]')
	const selectButtonValueElement = selectContainer.querySelector('[data-js-todo-select-button-value]')
	const dropdownElement = selectContainer.querySelector('[data-js-todo-select-dropdown]')

	const openSelect = () => {
		selectContainer.classList.add('is-open')
	}

	const closeSelect = () => {
		selectContainer.classList.remove('is-open')
	}

	const setSelectedFilter = (value) => {
		selectButtonValueElement.dataset.jsTodoSelectButtonValue = value
		selectButtonValueElement.textContent = value
		state.selectValue = value
	}

	const onSelectClick = () => {
		if (selectContainer.classList.contains('is-open')) {
			closeSelect()
		} else {
			openSelect()
		}
	}

	const onDropdownClick = ({ target }) => {
		const value = target.dataset.jsTodoSelectOption
		if (value === selectButtonValueElement.dataset.jsTodoSelectButtonValue) {
			closeSelect()
			return
		}
		
		setSelectedFilter(value)
		closeSelect()
		render()
	}

	const onDocumentClick = ({ target }) => {
		if (!selectContainer.classList.contains('is-open')) {
			return
		}
		
		if (!selectContainer.contains(target)) {
			closeSelect()
		}
	}

	const bindEvents = () => {
		selectButton.addEventListener('click', onSelectClick)
		dropdownElement.addEventListener('click', onDropdownClick)
		document.addEventListener('click', onDocumentClick)
	}
	
	bindEvents()
}