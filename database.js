const sequelize=require('sequelize');

//Defining Database
const db = new sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/tasks.db'
})

//Defining table in Database
const tasks = db.define('tasks', {
    
    title: {
        type: sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    dueDate: {
        type: sequelize.DATEONLY,
        allowNull: false,

    },
    status: {
        type: sequelize.BOOLEAN,
        defaultValue: false
    },
    priority: {
        type: sequelize.STRING

    }
});

async function write(body){
       console.log("write called");
       await db.sync({alter:true})
       await tasks.create({
           title:`${body.title}`,
           description:`${body.description}`,
           dueDate:`${body.dueDate}`,
           status:`${body.status}`,
           priority:`${body.priority}`

       })
    }
    module.exports={
        db,tasks,write
    }