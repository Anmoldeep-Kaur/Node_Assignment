const express=require('express');
const app=express();
const tasks=require('./database');

const bodyParser=require('body-parser');

app.use(express.json());
app.use('/',express.static(__dirname +'/public'));
app.use(bodyParser.json());

//app.use('/tasks',taskRoute);
app.get('/',function(req,res){
    res.sendFile("index.html");
})
app.post('/tasks',async (req,res)=>{
    console.log("post called")
    tasks.write(req.body).then( res.status(201).send({ success: 'New task added'}));
 });

app.listen(3434);
module.exports={app,tasks};