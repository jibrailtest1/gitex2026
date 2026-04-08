import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Task = {
  id: number
  title: string
  completed: boolean
}

const initialTasks: Task[] = [
  { id: 1, title: 'Review homepage layout', completed: true },
  { id: 2, title: 'Confirm stakeholder demo talking points', completed: false },
  { id: 3, title: 'Prepare one extra example task', completed: false },
]

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks],
  )

  const remainingCount = tasks.length - completedCount

  const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const title = newTaskTitle.trim()

    if (!title) {
      return
    }

    setTasks((currentTasks) => [
      {
        id: Date.now(),
        title,
        completed: false,
      },
      ...currentTasks,
    ])
    setNewTaskTitle('')
  }

  const handleToggleTask = (taskId: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task,
      ),
    )
  }

  const handleRemoveTask = (taskId: number) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }

  return (
    <main className="app-shell">
      <section className="todo-card" aria-labelledby="todo-heading">
        <div className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Stakeholder demo</p>
            <h1>Simple TODO app, ready to click through</h1>
            <p>
              Add tasks, mark them complete, and remove them with a clean,
              presentation-friendly interface.
            </p>
          </div>

          <div className="summary-panel" aria-label="Task summary">
            <article>
              <span className="summary-label">Total tasks</span>
              <strong>{tasks.length}</strong>
            </article>
            <article>
              <span className="summary-label">Completed</span>
              <strong>{completedCount}</strong>
            </article>
            <article>
              <span className="summary-label">Remaining</span>
              <strong>{remainingCount}</strong>
            </article>
          </div>
        </div>

        <section className="task-section" aria-labelledby="todo-heading">
          <div className="task-section-header">
            <div>
              <p className="eyebrow">Today&apos;s plan</p>
              <h2 id="todo-heading">TODO list</h2>
            </div>
          </div>

          <form className="task-form" onSubmit={handleAddTask}>
            <label className="sr-only" htmlFor="new-task">
              Add a new task
            </label>
            <input
              id="new-task"
              name="new-task"
              type="text"
              placeholder="Enter a task for the demo"
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.target.value)}
            />
            <button type="submit">Add task</button>
          </form>

          {tasks.length === 0 ? (
            <div className="empty-state" role="status" aria-live="polite">
              <h3>No tasks yet</h3>
              <p>Add a task above to get the demo list started again.</p>
            </div>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`task-item ${task.completed ? 'is-complete' : ''}`}
                >
                  <label className="task-toggle">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                    />
                    <span className="task-copy">{task.title}</span>
                  </label>

                  <button
                    className="remove-button"
                    type="button"
                    onClick={() => handleRemoveTask(task.id)}
                    aria-label={`Remove ${task.title}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  )
}

export default App
