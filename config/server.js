const express = require('express')
const path = require('path')

function initServer(models){
    let home_dir = global.home_dir
    console.log(`home dir ${global.corpus}`)
    const application = express()

    application.use(express.json())
    application.use(express.urlencoded({extended:true}))    

    application.set('views',path.join(home_dir,"views"))
    application.set('view engine','pug')    
    application.use(express.static('public'))

    application.get('/',function(req,res){
        res.render('home')
    })
    const server = application.listen("3000", () => {
        console.log(`Server Started :: http://localhost:${3000}/`);
    });
    return server;
}


module.exports = initServer