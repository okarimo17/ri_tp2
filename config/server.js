const express = require('express')
const path = require('path')

function initServer({models, helpers}){
    let home_dir = global.home_dir
    let {getCorpusFiles} = helpers

    const application = express()

    application.use(express.json())
    application.use(express.urlencoded({extended:true}))    

    application.set('views',path.join(home_dir,"views"))
    application.set('view engine','pug')    
    application.use(express.static('public'))

    application.get('/',function(req,res){
        let original_count = getCorpusFiles().files.length
        let clean_count = getCorpusFiles(true).files.length
        res.render('home',{
            original_count,
            clean_count
        })
    })
    const server = application.listen("3000", () => {
        console.log(`Server Started :: http://localhost:${3000}/`);
    });
    return server;
}


module.exports = initServer