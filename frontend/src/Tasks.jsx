import React, { useEffect, useRef, useState } from 'react'

const Tasks = () => {

    const getdate = ()=>{
        return new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'})
    }

    const [taskslist, settasklist] = useState(() => {
        const savedTasks = localStorage.getItem("my-todo-list")
        return savedTasks ? JSON.parse(savedTasks) : []
    })

    useEffect(() => {
        localStorage.setItem("my-todo-list", JSON.stringify(taskslist))
    }, [taskslist])

    const addnewtask = ()=>{
        const newtask = {
            id: Date.now(),
            text: "",
            date: getdate(),
            completed: false
            
        }

        settasklist([newtask,...taskslist])
    }

    const handlechange = (index,value)=>{
        settasklist(prev=>prev.map(task=>
            task.id===index?{...task,text:value}:task
        ))
    }

    const handleblur = (index,value)=>{
        if(value.trim()===""){
            settasklist(prev=>prev.filter(task=>task.id!==index))
        }
    }

    const toggleComplete = (id) => {
        settasklist(prev => prev.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }

    const remaining = taskslist.filter(task=>!task.completed).length

  return (
    <div className='bg-gray-900 border rounded-2xl p-4 border-gray-400 flex flex-col gap-3 '>
        <h3>You have {remaining} tasks left</h3>
        <button className='bg-amber-200 text-black font-bold px-3 py-2 rounded-2xl cursor-pointer w-fit' onClick={addnewtask}>Add new task</button>
        {taskslist.map((task) => (
                <div className='flex gap-3 items-center border-b pb-2 justify-between' key={task.id}>
                    <div className='flex gap-3 items-center'>
                        <input type="checkbox" checked={task.completed} onChange={()=>toggleComplete(task.id)} className='size-5 bg-amber-300 cursor-pointer' />
                        
                        <textarea 
                            className='min-h-20 min-w-150 text-justify outline-0 p-2 bg-transparent text-white resize-none ' 
                            placeholder='Enter task' 
                            
                            value={task.text}
                            
                            autoFocus 

                            onChange={(e) => handlechange(task.id, e.target.value)} 
                            
                            onBlur={(e) => handleblur(task.id, e.target.value)}
                        ></textarea>
                    </div>
                    <h4 className='text-gray-300'>{task.date}</h4>
                </div>
            ))}       
    
    </div>
  )
}

export default Tasks
