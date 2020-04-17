const { Router } = require('express')
const { Todos } = require('../database')

const route = Router()

route.get('/:sort', async(req, res) => {

  const sort = req.params.sortvalue;
  const todos = await Todos.findAll({
      order: [
          [sort, 'ASC']
      ]
  })
  res.send(todos)
})

route.get('/', async (req, res) => {
  const todos = await Todos.findAll()
  res.send(todos)
})

route.get('/:id', async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send({
      error: 'todo id must be an integer',
    })
  }
  
  const todo = await Todos.findByPk(req.params.id)

  if (!todo) {
    return res.status(404).send({
      error: 'No todo found with id = ' + req.params.id,
    })
  }
  res.send(todo)
})

route.post('/', async (req, res) => {
  if (typeof req.body.title !== 'string') {
    return res.status(400).send({ error: 'Task name not provided' })
  }
  
  const newTodo = await Todos.create({
      title: req.body.title,
      description: req.body.description,
      duedate: req.body.duedate,
      status: req.body.status,
      priority: req.body.priority,
      note: req.body.note
      
  })

  res.status(201).send({ success: 'New task added', data: newTodo })
})


route.get('/:id/note',async(req,res)=>{
  if(isNaN(Number(req.params.id))){
      return res.status(400).send({
          error: 'Todo ID must be an integer'
      })
  }
  const todo = await Todos.findByPk(req.params.id)

  if(!todo){
      return res.status(404).send({
          error: " No Todo found with id = " + req.params.id
      })
  }

  res.send(todo.note)
})

route.post('/:id/note',async(req,res) => {
  if(isNaN(Number(req.params.id))){
      return res.status(400).send({
          error: 'Todo ID must be an integer'
      })
  }
  const todo = await Todos.findByPk(req.params.id)


  
  todo.notes = req.body.note
  console.log(todo.notes)
 
  console.log(typeof req.body.note)
  await todo.save()
  res.status(201).send({success: 'New Notes Added', data: todo})

})

route.post('/:id',async(req,res) => {
  if(isNaN(Number(req.params.id))){
      return res.status(400).send({
          error: 'Todo ID must be an integer'
      })
  }
  const todo = await Todos.findByPk(req.params.id)

  
  todo.duedate = req.body.update_duedate
  todo.priority = req.body.update_priority
  todo.status = req.body.update_status
 
  await todo.save()
  res.status(201).send({success: 'New Notes Added', data: todo})

})

route.patch('/:id',async (req,res)=>{
  console.log("patch hit")
  if(isNaN(Number(req.params.id))){
      return res.status(400).send({
          error: 'Todo ID must be an integer'
      })
  }

  const todo = await Todos.findByPk(req.params.id)

  if(!todo){
      return res.status(404).send({
          error: " No Todo found with id = " + req.params.id
      })
  }
      
      todo.duedate =  req.body.update_duedate
      todo.priority =  req.body.update_priority
 
      todo.status= req.body.update_status
      
           await todo.save()
  res.status(201).send({success:"Updated Successfully",data:todo})
})

module.exports = route
