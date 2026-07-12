import { initTheme } from "./ui/theme.js"
import { initModal } from "./ui/modal.js"
import { initTaskService } from "./service/taskService.js"
import { render } from "./render.js"
import { initSelect } from "./ui/select.js"
import { initSearch } from "./service/search.js"

initTheme()
initModal()
initTaskService()
render()
initSelect()
initSearch()