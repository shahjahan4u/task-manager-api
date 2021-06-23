const express = require('express')
require('./db/mongoose')
const app = express()
const userRouter = require('./Routers/user')
const taskRouter = require('./Routers/task')

const port = process.env.PORT

// app.use((req,res,next)=>{
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled')
//     }
//     else{
//         next()
//     }
// })
// app.use((req, res, next)=>{
//     res.status(503).send('Site is temporarily down. Check back soon')
// })

const multer = require('multer')
const upload = multer({dest: 'images'})
app.post('/upload', upload.single('upload'), (req, res)=>{
    res.send()
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, ()=>{
    console.log('Server is up on port '+ port)
})
// const bcrypt = require('bcryptjs')   //just for testing
// const myFunc = async()=>{
//     const password = "Shahu@123"
//     const hashedPassword = await bcrypt.hash(password,8)

//     console.log(password)
//     console.log(hashedPassword)
//     const isMatch = await bcrypt.compare('shahu@123',hashedPassword)
//     console.log(isMatch)
// }
// const jwt = require('jsonwebtoken')  //Testing
// const myFunc = async()=>{
//     const token = jwt.sign({id: 'abc123'},'thisisfortesting', {expiresIn: '7 days'})
//     console.log(token)
//     const data = jwt.verify(token, 'thisisfortesting')
//     console.log(data)
// }
// myFunc()

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async ()=>{
//     const task = await Task.findById('60cd3bffac637892895bacb6')
//     //await task.populate('owner').execPopulate()

//     const user = await User.findById('60cd3b96584ea391abc39ed7')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()
