import { useState, useEffect } from 'react'
import Header from './components/Header'
import Button from './components/button'
import Tasks from './components/tasks'
import AddTask from './components/addtask'
import React from 'react' //not needed when not using classes

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasksArray, setTasks] = useState([]) //useState -> nameVariable, functionToUpdate
  
  useEffect(()=>{
    const getTasks = async ()=>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks() //calls getTasks as soon as page loads
  }, [])
  //fetch tasks
  const fetchTasks = async ()=>{
    const resp = await fetch('http://localhost:5000/tasks')
    const data = await resp.json()
    return data
  }
  //fetch one task
  const fetchTask = async (id)=>{
    const resp = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await resp.json()
    return data
  }
  //add task
  const addTask = async (task)=>{
    const resp = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await resp.json()
    setTasks([...tasksArray, data])
  }
  //delete task
  const deleteTask = async (id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
  }
  //toggle reminder
  const togglReminder = async (id) =>{
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const resp = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers:{
        'Content-type': 'application/JSON'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await resp.json()
    setTasks(
      tasksArray.map((task)=> task.id === id ? {...task, reminder: data.reminder} : task)

    )
  }
  return (
    <div className="container">
      <Header title='Task Tracker' onAdd={()=>setShowAddTask(!showAddTask)} showForm={showAddTask}/> {/*  when passing numbers or booleans must use curly braces*/}
      {showAddTask && <AddTask onAdd={addTask}/>}
      <Button/>
      <Button color='red' text='howlo'/>
      {tasksArray.length > 0 ? <Tasks tasks={tasksArray} onDelete={deleteTask} onToggle={togglReminder}/> : 'No tasks to show'}
    </div>
  );
}

export default App;
