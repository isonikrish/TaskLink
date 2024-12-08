import React, { useEffect, useState } from 'react';
import { FaRegCircle, FaRegCheckCircle, FaRegStar, FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useMainContext } from '../contexts/MainContext';

function Task({ task, date, description, id, startTime, endTime, status }) {
    const [finalDate, setFinalDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const { handleTaskStatus, handleDeleteTask } = useMainContext();
    const [importantTask, setImportantTask] = useState(false);

    function updateDate() {
        const currentDate = new Date();
        if (date === currentDate.toISOString().slice(0, 10)) {
            setFinalDate("Today");
        } else {
            setFinalDate(date);
        }
    }

    useEffect(() => {
        updateDate();
    }, [date]);

    const formattedStartTime = new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedEndTime = new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const toggleStatus = async () => {
        setLoading(true);
        await handleTaskStatus(id);
        setLoading(false);
    };

    // Function to get important status from localStorage
    const getImportantTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskItem = tasks.find((task) => task.id === id);
        if (taskItem) {
            setImportantTask(taskItem.isImportant || false);
        } else {

            setImportantTask(false);
        }
    };

    useEffect(() => {
        getImportantTasks();
    }, [id]);

    // Function to toggle important status
    const toggleImportant = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskIndex = tasks.findIndex((task) => task.id === id);


        setImportantTask(prevState => !prevState);

        if (taskIndex !== -1) {

            tasks[taskIndex].isImportant = !tasks[taskIndex].isImportant;
        } else {

            const newTask = {
                id,
                task,


                isImportant: !importantTask,
            };
            tasks.push(newTask);
        }
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage
    };

    return (
        <div className="bg-base-300 shadow-lg rounded-lg p-5 flex flex-col md:flex-row md:justify-between items-start md:items-center border border-gray-700 hover:shadow-xl transition-shadow duration-300 mt-3 space-y-3 md:space-y-0">

            <div className="flex items-center space-x-4">
                <button
                    className={`task-button p-2 rounded-full transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600 text-gray-300 hover:text-white'}`}
                    onClick={toggleStatus}
                    disabled={loading}
                >
                    <span className="text-2xl">
                        {loading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : status === "Pending" ? (
                            <FaRegCircle />
                        ) : (
                            <FaRegCheckCircle />
                        )}
                    </span>
                </button>
                <div className="text-lg font-medium text-gray-200 flex flex-col space-y-1">

                    {status === "Pending" ? <span>{task}</span> : <span className='line-through'>{task}</span>}
                    <div className="md:flex md:items-center md:gap-3 md:mt-2">
                        <div className="badge badge-primary md:p-2 md:text-xs text-[10px] inline-flex items-center">
                            {finalDate}
                        </div>

                        <div className="text-sm text-gray-400">{`${formattedStartTime} - ${formattedEndTime}`}</div>
                    </div>
                </div>
            </div>

            <div className="flex space-x-4 items-center">
                <button className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white transition duration-300" onClick={() => handleDeleteTask(id)}>
                    <MdDelete className='text-2xl' />
                </button>
                <label className="swap swap-rotate">
                    {importantTask ? (
                        <FaStar className='text-2xl' onClick={toggleImportant} />
                    ) : (
                        <FaRegStar className='text-2xl' onClick={toggleImportant} />
                    )}
                </label>
            </div>
        </div>
    );
}

export default Task;
