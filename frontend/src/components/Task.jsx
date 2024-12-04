import React, { useEffect, useState } from 'react';
import { FaRegCircle, FaRegCheckCircle, FaRegStar, FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Task({ task, date, description, id, startTime, endTime, status }) {
    const [finalDate, setFinalDate] = useState(null);

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

    return (
        <div className="bg-base-300 shadow-lg rounded-lg p-5 flex justify-between items-center border border-gray-700 hover:shadow-xl transition-shadow duration-300 mt-3">
            <div className="flex items-center space-x-4">
                <button className="task-button p-2 rounded-full hover:bg-green-600 text-gray-300 hover:text-white transition duration-300">
                    <span className="text-2xl">
                        <FaRegCircle />
                    </span>
                </button>
                <div className="text-lg font-medium text-gray-200 flex flex-col">
                    <span>{task}</span>
                    <div className="flex items-center gap-3 mt-2">
                        <div className="badge badge-primary p-2 text-xs">{finalDate}</div>
                        <div className="text-sm text-gray-400">{`${formattedStartTime} - ${formattedEndTime}`}</div>
                    </div>
                </div>
            </div>

            <div className="flex space-x-4 items-center">
                <button className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white transition duration-300">
                    <MdDelete className='text-2xl' />
                </button>
                <label className="swap swap-rotate">
                    <input type="checkbox" />
                    <FaRegStar className='swap-on text-2xl' />
                    <FaStar className='swap-off text-2xl' />
                </label>
            </div>
        </div>
    );
}

export default Task;
