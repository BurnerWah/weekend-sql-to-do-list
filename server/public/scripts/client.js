console.log('JS is sourced!')

async function getTodos() {
  try {
    const res = await axios({
      type: 'GET',
      url: '/todos',
    })

    /** @type {TodoServerItem[]} */
    const { data } = res
    console.log(data)
    renderTodos(data)
  } catch (err) {
    console.error('Error on GET /todos', err)
  }
}

/**
 * Refreshes to do list items on the DOM
 * @param {TodoServerItem[]} todos
 */
function renderTodos(todos) {
  const ul = document.querySelector('ul#tasks')
  ul.innerHTML = ''
  for (const todo of todos) {
    ul.appendChild(createTodoItem(todo))
  }
}

/**
 * Component to render a todo item
 * @param {TodoServerItem} todo
 * @returns {HTMLLIElement}
 */
function createTodoItem(todo) {
  const li = document.createElement('li')
  li.setAttribute('data-testid', 'toDoItem')
  // in retrospect using addEventListener makes this unnecessary
  li.setAttribute('data-id', todo.id)
  if (todo.isComplete) {
    li.classList.add('completed', 'disabled')
    li.setAttribute('aria-disabled', 'true')
  }
  li.classList.add('list-group-item')

  const text = document.createElement('span')
  text.textContent = `${todo.text} `
  li.appendChild(text)

  const buttonGroup = document.createElement('div')
  buttonGroup.classList.add('btn-group')

  const completeButton = document.createElement('button')
  completeButton.setAttribute('data-testid', 'completeButton')
  completeButton.classList.add('btn', 'btn-success')
  completeButton.textContent = 'Complete'
  completeButton.addEventListener('click', async (e) => {
    try {
      await axios({ method: 'PUT', url: `/todos/${todo.id}` })
      getTodos()
    } catch (err) {
      console.error('Error on PUT /todos', err)
    }
  })
  if (todo.isComplete) {
    completeButton.setAttribute('disabled', 'true')
  }
  buttonGroup.appendChild(completeButton)
  // li.appendChild(completeButton)

  const deleteButton = document.createElement('button')
  deleteButton.setAttribute('data-testid', 'deleteButton')
  deleteButton.classList.add('btn', 'btn-danger')
  deleteButton.textContent = 'Delete'
  deleteButton.addEventListener('click', async (e) => {
    try {
      await axios({ method: 'DELETE', url: `/todos/${todo.id}` })
      getTodos()
    } catch (err) {
      console.error('Error on DELETE /todos', err)
    }
  })
  buttonGroup.appendChild(deleteButton)
  // li.appendChild(deleteButton)

  li.appendChild(buttonGroup)

  return li
}

/** @type {HTMLFormElement} */
const form = document.querySelector('form#addTask')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const formData = new FormData(form)
  const text = formData.get('text')
  addTodo(text)
})

/**
 * Adds a to do item to the database and refreshes the DOM
 * @param {string} text
 */
async function addTodo(text) {
  try {
    await axios({
      method: 'POST',
      url: '/todos',
      data: {
        text,
      },
    })
    getTodos()
  } catch (err) {
    console.error('Error on POST /todos', err)
  }
}

getTodos()
