import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Todo = {
  id: number
  text: string
  completed: boolean
}

const initialTodos: Todo[] = [
  { id: 1, text: 'Review stakeholder demo flow', completed: false },
  { id: 2, text: 'Confirm the TODO interactions work smoothly', completed: true },
  { id: 3, text: 'Capture final feedback after the walkthrough', completed: false },
]

function App() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [newTask, setNewTask] = useState('')

  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedTask = newTask.trim()
    if (!trimmedTask) {
      return
    }

    setTodos((currentTodos) => [
      {
        id: Date.now(),
        text: trimmedTask,
        completed: false,
      },
      ...currentTodos,
    ])
    setNewTask('')
  }

  const toggleTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const removeTodo = (id: number) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  return (
    <main className="app-shell">
      <section className="todo-card">
        <div className="hero-copy">
          <span className="eyebrow">Stakeholder demo ready</span>
          <h1>Basic TODO app</h1>
          <p>
            Add tasks, mark them complete, and remove them with a clean interface
            that is easy to demo.
          </p>
        </div>

        <div className="todo-summary" aria-label="Todo summary">
          <div>
            <strong>{todos.length}</strong>
            <span>Total tasks</span>
          </div>
          <div>
            <strong>{remainingCount}</strong>
            <span>Remaining</span>
          </div>
          <div>
            <strong>{todos.length - remainingCount}</strong>
            <span>Completed</span>
          </div>
        </div>

        <form className="todo-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="new-task">
            Add a new task
          </label>
          <input
            id="new-task"
            name="new-task"
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />
          <button type="submit">Add task</button>
        </form>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <label className="todo-main">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
              </label>
              <button
                type="button"
                className="delete-button"
                onClick={() => removeTodo(todo.id)}
                aria-label={`Remove ${todo.text}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 ? (
          <div className="empty-state">
            <h2>All clear</h2>
            <p>Add a task above to start building the list again.</p>
          </div>
        ) : null}
      </section>
    </main>
  )
}

export default App
