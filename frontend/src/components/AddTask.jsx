import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar, FiTag } from 'react-icons/fi';
import { useMainContext } from '../contexts/MainContext';

function AddTask() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    task: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  const { handleAddTask } = useMainContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name, value) => {
    if (value) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } 
  };

  const handleTimeChange = (name, value) => {
    if (value) {
      const updatedDate = new Date(formData.date); // Use the existing date as the base
      updatedDate.setHours(value.getHours());
      updatedDate.setMinutes(value.getMinutes());
      const timeISOString = updatedDate.toISOString();
      setFormData((prev) => ({
        ...prev,
        [name]: timeISOString,
      }));
    }
  };

  const handleAdd = () => {
    handleAddTask(formData, setIsLoading);

    // Reset form after submission
    setFormData({
      task: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
    });
  };

  return (
    <div>
      <div className="card w-full shadow-xl rounded-lg">
        <h2 className="card-title text-center text-2xl font-semibold mb-6 text-white">Add a New Task</h2>

        <div className="space-y-5">
          <div className="relative">
            <FiTag className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              name="task"
              className="input input-bordered w-full pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Task Name"
              value={formData.task}
              onChange={handleInputChange}
            />
          </div>

          <div className="relative">
            <textarea
              name="description"
              className="textarea textarea-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Task Description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="relative">
            <FiCalendar className="absolute left-3 top-4 text-gray-400" />
            <input
              type="date"
              name="date"
              className="input input-bordered w-full pl-10 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.date}
              onChange={(e) => handleDateChange('date', e.target.value)}
            />
          </div>

          <div className="flex justify-between space-x-2">
            <div className="flex flex-col">
              <label className="text-gray-500 mb-1">From</label>
              <DatePicker
                selected={formData.startTime ? new Date(formData.startTime) : null}
                onChange={(time) => handleTimeChange('startTime', time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-500 mb-1">To</label>
              <DatePicker
                selected={formData.endTime ? new Date(formData.endTime) : null}
                onChange={(time) => handleTimeChange('endTime', time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {isLoading ? (
            <button className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200">
              <span className="loading loading-spinner"></span>
              loading
            </button>
          ) : (
            <button
              className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
              onClick={handleAdd}
            >
              Add Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddTask;
