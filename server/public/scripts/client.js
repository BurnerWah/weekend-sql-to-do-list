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
function renderTodos(todos) {}

getTodos()
