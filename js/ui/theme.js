export function initTheme() {
	const themeButton = document.querySelector('[data-js-todo-theme-button]')

	const savedTheme = localStorage.getItem('theme')
	if (savedTheme === 'dark') {
		document.body.classList.add('dark')
	} else {
		document.body.classList.remove('dark')
	}

	const onThemeButtonClick = () => {
		document.body.classList.toggle('dark')

		const isDark = document.body.classList.contains('dark')
		localStorage.setItem('theme', isDark ? 'dark' : 'light')
	}

	themeButton.addEventListener('click', onThemeButtonClick)
}