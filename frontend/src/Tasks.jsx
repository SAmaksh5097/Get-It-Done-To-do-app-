import React, { useEffect, useRef, useState } from 'react'

const Tasks = () => {
    const [taskslist,settasklist] = useState([])

    const [task,setTask] = useState("")

    const handlechange = (index,value)=>{
        const upd = [...taskslist]
        if(value===""){
        }
        else{
            upd[index] = value;
            settasklist(upd)
        }
        console.log(taskslist)
        // console.log(taskslist.toString())
    }
    const test = ()=>{
        settasklist([...taskslist,""])
    }

  return (
    <div className='bg-gray-900 border rounded-2xl p-4 border-gray-400 flex flex-col gap-3 '>
        <h3>You have {taskslist.length} tasks left</h3>
        <button className='bg-amber-200 text-black font-bold px-3 py-2 rounded-2xl cursor-pointer w-fit' onClick={test}>Add new task</button>
        {taskslist.map((task,index)=>{
            return(
            <div className='flex gap-3 items-center border-b pb-2 justify-between' key={index}>
                <div className='flex gap-3 items-center'>
                    <input type="checkbox" className='size-5 bg-amber-300 cursor-pointer' />
                    
                    <textarea className='min-h-20 min-w-135 text-justify outline-0 p-2' placeholder='Enter task' defaultValue={task} onBlur={(e)=>{handlechange(index,e.target.value)}} onChange={(e)=>{handlechange(index,e.target.value)}} ></textarea>

                </div>
                <h4 className='text-gray-300'>Due: Oct 31</h4>
            </div>
            )
        })}        
        

    </div>
  )
}

export default Tasks
