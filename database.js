const sequelize=require('sequelize');

//Defining Database
const db = new sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/tasks.db'
})

//Defining table in Database
const tasks = db.define('tasks', {
    id:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
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

    },
    note:{
        type:sequelize.STRING(300)
    }
});


