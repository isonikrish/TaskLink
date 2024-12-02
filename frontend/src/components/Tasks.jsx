import React from 'react'


function Tasks({ task, description, date, startTime, endTime, status }) {
    const todos = [
        { id: 1, task: 'Complete React project', description: 'Finish building the dashboard', date: '2024-12-01', startTime: '09:00', endTime: '11:00', status: 'In Progress' },
        { id: 2, task: 'Write blog post', description: 'Write the next blog post on JavaScript', date: '2024-12-02', startTime: '10:00', endTime: '12:00', status: 'Pending' },
        { id: 3, task: 'Attend meeting', description: 'Zoom call with the team', date: '2024-12-03', startTime: '14:00', endTime: '15:00', status: 'Completed' },
    ];
    return (
        <div className='flex items-center justify-center mt-10'>
            <div className="p-4 rounded-lg shadow-sm border w-[70%]">
                
                <div className="form-control">
                    <label className="cursor-pointer label">
                        <input type="checkbox" className="checkbox checkbox-success" />
                    </label>
                </div>
            </div>
        </div>


    )

}

export default Tasks