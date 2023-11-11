console.log('JS is sourced!')

async function getTodos() {
  try {
    const res = await axios({
      type: 'GET',
      url: '/todos',
    })
    console.log(res.data)
    renderTodos(res.data)
  } catch (err) {
    console.error('Error on GET /todos', err)
  }
}

function renderTodos(todos) {}

getTodos()
