import { state } from './state.js'

const listElement = document.querySelector('[data-js-todo-list]')
const emptyMessageElement = document.querySelector('[data-js-todo-empty-message]')

const getVisibleTasks = () => {
	return state.items.filter(task => 
		task.title 
			.toLowerCase()
			.includes(state.searchQuery.toLowerCase())
	)	
}

export function render() {
	const tasksToRender = getVisibleTasks()

	let items = tasksToRender
	if (state.selectValue === 'complete') {
		items = items.filter((item) => item.isChecked)
	} else if (state.selectValue === 'incomplete') {
		items = items.filter((item) => !item.isChecked)
	}

	listElement.innerHTML = items.map(({ id, title, isChecked }) => `
		<li class="list__item" data-js-todo-item>
			<input id="${id}" type="checkbox" ${isChecked ? 'checked' : ''} class="item__checkbox" data-js-todo-item-checkbox>

			<label 
				for="${id}" 
				class="item__label" 
				data-js-todo-item-title
			>${title}</label>

			<div class="item__actions">
				<button class="item__button item__button--rename">
					<svg class="icon-rename-item" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12.0091 9.32736L14.4018 6.93468L14.4025 6.93398C14.7324 6.60414 14.8974 6.43916 14.9592 6.24885C15.0136 6.08133 15.0136 5.90088 14.9592 5.73337C14.8973 5.54292 14.7321 5.37769 14.4018 5.04738L12.9506 3.59625C12.6217 3.26735 12.4569 3.10257 12.2669 3.04082C12.0993 2.98639 11.9189 2.98639 11.7514 3.04082C11.5612 3.10261 11.3962 3.26759 11.0669 3.59695L11.0654 3.59837L8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736ZM8.67272 5.99106L12.0091 9.32736" stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
				<button class="item__button item__button--delete">
					<svg class="icon-delete-item" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z" stroke="#CDCDCD"/>
						<path d="M14.625 3.75H3.375" stroke="#CDCDCD" stroke-linecap="round"/>
						<path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" stroke="#CDCDCD"/>
						<path d="M10.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round"/>
						<path d="M7.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round"/>
					</svg>
				</button>
			</div> 
		</li>
	`).join('')

	if (items.length === 0) {
		emptyMessageElement.classList.add('is-active')
	} else {
		emptyMessageElement.classList.remove('is-active')
	}
}