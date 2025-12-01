import React, { useState, useEffect } from 'react'

const Tasks = () => {
    const [taskslist, settasklist] = useState(() => {
        const savedTasks = localStorage.getItem("my-todo-list")
        return savedTasks ? JSON.parse(savedTasks) : []
    })

    useEffect(() => {
        localStorage.setItem("my-todo-list", JSON.stringify(taskslist))
    }, [taskslist])

    const addNewTask = () => {
        const newTask = { 
            id: Date.now(), 
            text: "",
            completed: false,
            priority: "Medium", 
            dueDate: new Date().toISOString().split('T')[0] 
        }
        settasklist([newTask, ...taskslist])
    }

    const updateTask = (id, field, value) => {
        settasklist(prev => prev.map(task => 
            task.id === id ? { ...task, [field]: value } : task
        ))
    }

    const handleBlur = (id, value) => {
        if (value.trim() === "") {
            settasklist(prev => prev.filter(task => task.id !== id))
        }
    }

    const toggleComplete = (id) => {
        settasklist(prev => prev.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }

    const unfinishedTasks = taskslist.filter(task => !task.completed).length

    const getPriorityColor = (priority) => {
        if (priority === "High") return "text-red-400 border-red-400";
        if (priority === "Medium") return "text-yellow-400 border-yellow-400";
        return "text-green-400 border-green-400";
    }

    const clearAll = () => {
        // Optional: Add a confirmation so users don't accidentally delete everything
        if(confirm("Are you sure you want to delete all tasks?")) {
            settasklist([]) // Resets state to empty array
        }
    }

    return (
        <div className='bg-gray-900 border rounded-2xl p-4 border-gray-400 flex flex-col gap-3'>
            <h3 className='text-gray-300'>You have {unfinishedTasks} tasks left</h3>

            {taskslist.length > 0 && (
                    <button 
                        className='text-red-400 hover:text-red-300 underline cursor-pointer w-fit self-center'
                        onClick={clearAll}
                    >
                        Clear List
                    </button>
                )}
            
            <button 
                className='bg-amber-200 text-black font-bold px-3 py-2 rounded-2xl cursor-pointer w-fit' 
                onClick={addNewTask}
            >
                Add new task
            </button>

            {taskslist.map((task) => (
                <div className='flex flex-col sm:flex-row gap-3 items-start sm:items-center border-b border-gray-700 pb-2 justify-between' key={task.id}>
                    
                    <div className='flex gap-3 items-center w-full'>
                        <input 
                            type="checkbox" 
                            className='size-5 bg-amber-300 cursor-pointer accent-amber-400'
                            checked={task.completed}
                            onChange={() => toggleComplete(task.id)}
                        />
                        
                        <textarea 
                            className={`min-h-12 w-full text-justify outline-none p-2 bg-transparent resize-none 
                                ${task.completed ? "line-through text-gray-500" : "text-white"}`}
                            placeholder='Enter task' 
                            value={task.text}
                            autoFocus={!task.completed && task.text === ""} 
                            onChange={(e) => updateTask(task.id, "text", e.target.value)} 
                            onBlur={(e) => handleBlur(task.id, e.target.value)}
                        ></textarea>
                    </div>

                    <div className='flex gap-2 items-center self-end sm:self-center'>
                        
                        <select 
                            className={`bg-gray-800 text-xs font-bold px-2 py-1 rounded border cursor-pointer outline-none ${getPriorityColor(task.priority)}`}
                            value={task.priority}
                            onChange={(e) => updateTask(task.id, "priority", e.target.value)}
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>

                        <input 
                            type="date" 
                            className='bg-gray-800 text-white text-xs px-2 py-1 rounded border border-gray-600 outline-none '
                            value={task.dueDate}
                            onChange={(e) => updateTask(task.id, "dueDate", e.target.value)}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Tasks