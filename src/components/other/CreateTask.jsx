import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { setLocalStorage } from '../utils/localStorage'


const CreateTask = () => {

    const {userData, setUserData,setEmployees, setTest} = useContext(AuthContext)

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')

    const [newTask, setNewTask] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()

        setNewTask({ taskTitle, taskDescription, taskDate, category, active: false, newTask: true, failed: false, completed: false })

        const data = userData

        data.forEach(function (elem) {
            if (asignTo == elem.firstName) {
                elem.tasks.push(newTask)
                elem.taskCounts.newTask = elem.taskCounts.newTask + 1
            }
        })

        setUserData(data)

        const new_emp= {
            "id": 5,
            "firstName": asignTo,
            "email": `${asignTo}@gmail.com`,
            "password": "123",
            "taskCounts": {
                "active": 2,
                "newTask": 1,
                "completed": 1,
                "failed": 0
            },
            "tasks": [
                {
                    "active": true,
                    "newTask": true,
                    "completed": false,
                    "failed": false,
                    "taskTitle": "Update website",
                    "taskDescription": "Revamp the homepage design",
                    "taskDate": "2024-10-12",
                    "category": "Design" 
                },
                {
                    "active": false,
                    "newTask": false,
                    "completed": true,
                    "failed": false,
                    "taskTitle": "Client meeting",
                    "taskDescription": "Discuss project requirements",
                    "taskDate": "2024-10-10",
                    "category": "Meeting"
                },
                {
                    "active": true,
                    "newTask": false,
                    "completed": false,
                    "failed": false,
                    "taskTitle": "Fix bugs",
                    "taskDescription": "Resolve bugs reported in issue tracker",
                    "taskDate": "2024-10-14",
                    "category": "Development"
                }
            ]
        }

        data.push(new_emp);
        setEmployees(data);
        setLocalStorage(new_emp);
        setTest(true);


        setTaskTitle('')
        setCategory('')
        setAsignTo('')
        setTaskDate('')
        setTaskDescription('')

    }


    useEffect(()=>{
        console.log("newTask ---------------> ",newTask)
    },[newTask])
    return (
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            <form onSubmit={(e) => {
                submitHandler(e)
            }}
                className='flex flex-wrap w-full items-start justify-between'
            >
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => {
                                setTaskTitle(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='Make a UI design'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => {
                                setTaskDate(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="date" />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Asign to</h3>
                        <input
                            value={asignTo}
                            onChange={(e) => {
                                setAsignTo(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='employee name' />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                        <input
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='design, dev, etc' />
                    </div>
                </div>

                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                    <textarea value={taskDescription}
                        onChange={(e) => {
                            setTaskDescription(e.target.value)
                        }} className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400' name="" id=""></textarea>
                    <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full'>Create Task</button>
                </div>

            </form>
        </div>
    )
}

export default CreateTask