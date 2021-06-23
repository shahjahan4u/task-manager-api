const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {
    timestamps: true
})
const Task = mongoose.model('Task', taskSchema)
// const task = new Task({
//     description: 'To complete this section by today',
//     status: false
// })
// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log('Error!'+error)
// })
module.exports = Task