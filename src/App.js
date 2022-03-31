import React, { useState } from 'react';
import './App.css'
import Todo from './Todo';

function App() {
  const [tasks, setTasks] = useState([]);
  const [todo, setTodo] = useState('');

  function updTask(tasks) {
    let newTask = tasks
    setTasks([...newTask])
  }
  const delTask = taskName => {
    tasks.splice(tasks.indexOf(taskName), 1)
    updTask(tasks)
  }

  function addTodo(e) {
    e.preventDefault();
    setTasks([...tasks, todo])
    setTodo('')
  }

  return (
    <>
      <h1 className='title' id='title'>to do app</h1>
      <form className='ip-field' autoComplete='off'>
        <input type='text' className='ip-todo' id='ip-todo' style={{ transition: 'all 300ms' }} value={todo} placeholder='write something' onChange={e => setTodo(e.target.value)} />
        <button title='click to add' className='add-btn-field' onClick={addTodo} style={{ transition: "all 300ms" }}>
          <svg fill='#38165D' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" /></svg>
        </button>
      </form>
      <div className='list-field'>
        <div className='list'>
          <table>
            <tbody>
              {tasks.map((task) => {
                return (
                  <>
                    <Todo task={task} del={delTask} />
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App