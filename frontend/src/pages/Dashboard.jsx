import React from 'react';
import Topbar from '../components/Topbar';
import { useParams } from 'react-router-dom';
import AddTask from '../components/AddTask';
import Tasks from '../components/Tasks';
import { FaPlus, FaFilter } from 'react-icons/fa';

function Dashboard() {
    const { menu } = useParams();

    return (
        <div>
            <Topbar />

            <div className='flex gap-3 m-10'>
                <button
                    className="btn bg-base-200"
                    onClick={() => document.getElementById('my_modal_3').showModal()}
                >
                    <FaPlus /> New Task
                </button>

                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box relative w-full h-auto max-h-full overflow-y-auto shadow-2xl rounded-lg">
                        <form method="dialog" className="h-full" onSubmit={(e) => e.preventDefault()}>
                            <div className="h-full flex flex-col">
                                <AddTask />

                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-white" onClick={() => document.getElementById('my_modal_3').close()}>
                                    ✕
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>


                {/* Filter Button */}
                <button className="btn btn-active bg-white text-black hover:bg-white">
                    <FaFilter />
                    Filter
                </button>
            </div>

            {/* Tasks Component */}
            <Tasks />
        </div>
    );
}

export default Dashboard;
