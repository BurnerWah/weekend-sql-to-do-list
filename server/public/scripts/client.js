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
  li.setAttribute('data-id', todo.id)

  const text = document.createElement('span')
  text.textContent = todo.text
  li.appendChild(text)

  const completeButton = document.createElement('button')
  completeButton.setAttribute('data-testid', 'completeButton')
  completeButton.textContent = 'Complete'
  // TODO: Add event listener to complete todo item
  li.appendChild(completeButton)

  const deleteButton = document.createElement('button')
  deleteButton.setAttribute('data-testid', 'deleteButton')
  deleteButton.textContent = 'Delete'
  // TODO: Add event listener to delete todo item
  li.appendChild(deleteButton)

  return li
}

getTodos()
