const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new  express.Router()

router.post('/tasks', auth, async(req, res)=>{
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,    //sending whole body along with owner property
        owner: req.user.id
    })
    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send()
    }
})

router.patch('/tasks/:id', auth, async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "status"]
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        res.status(400).send({error: 'invalid updates'})
    }
    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task){
            res.status(404).send()
        }
        updates.forEach((update)=> task[update] = req.body[update])

        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send()
    }
})

// GET/tasks?status=true
// GET/tasks?limit=10&skip=20
// GET/tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async(req, res)=>{
    // Task.find({}).then((task)=>{
    //     res.send(task)
    // }).catch(()=>{
    //     res.status(500).send()
    // })
    const match = {}
    const sort = {}
    if(req.query.status){
        match.status = req.query.status === 'true'
    }
    if(req.query.sortBy){
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1] === 'desc' ? -1 : 1
    }
    try{
        // const task = await Task.find({owner: req.user._id})  //below populate method will also do the same job
        // res.send(task)
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate() 
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async(req, res)=>{
    // Task.findById(req.params.id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch(()=>{
    //     res.status(500).send()
    // })
    try{
        const _id = req.params.id
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

router.delete('/tasks/:id', auth, async(req, res)=>{
    try{
        const task =  await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router