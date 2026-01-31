import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    // Task title (required)
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        minlength: [3, 'Task title must be at least 3 characters'],
        maxlength: [100, 'Task title cannot exceed 100 characters']
    },

    // Task description (optional)
    description: {
        type: String,
        trim: true,
        default: null,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    // Task completion flag
    completed: {
        type: Boolean,
        default: false
    },
    // Task start time (optional)
    start_time: {
        type: Date,
        default: null
    },

    // Task end time (optional)
    end_time: {
        type: Date,
        default: null
    }
});

// Export the model
const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;
