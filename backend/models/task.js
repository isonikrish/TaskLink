import mongoose from 'mongoose';


const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    task: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    date: {
        type: String,
    },
    startTime: {
        type: String,

    },
    endTime: {
        type: String
    },
    status:{
        type: String,
        enum: ["Completed", "Pending"],
        default: "Pending"
    },
},{timestamps: true})

const Task = mongoose.model('Task', taskSchema);
export default Task;