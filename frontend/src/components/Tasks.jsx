import React, { useState } from 'react'
import Task from './Task'
import { useMainContext } from '../contexts/MainContext'

function Tasks() {
    const { tasks, completedTasks } = useMainContext()
    return (
        <div className='m-10 bg-base-200 p-4 rounded-lg'>
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">My Tasks</h2>
                <div className='h-[500px] overflow-y-scroll'>
                {tasks?.map((task) => {
                    return (
                        <Task key={task._id} task={task.task} description={task.description} date={task.date} id={task._id} startTime={task.startTime} endTime={task.endTime} status={task.status} />
                    )
                })}
                </div>
                

            </div>

            <div className="collapse collapse-arrow border border-[#5b5b5b]">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                    Completed
                </div>
                <div className="collapse-content overflow-y-scroll">
                    {completedTasks?.map((task) => {
                        return (
                            <Task key={task._id} task={task.task} description={task.description} date={task.date} id={task._id} startTime={task.startTime} endTime={task.endTime} status={task.status} />
                        )
                    })}
                </div>
            </div>



        </div>


    )

}

export default Tasks