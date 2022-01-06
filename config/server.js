const express = require('express')
const path = require('path')

const preCleanFiles = require('../custom_algorithms/pre_clean_files')
const create_index = require('../custom_algorithms/create_index')



function initServer({database, helpers}){
    let home_dir = global.home_dir
    let {getCorpusFiles} = helpers
    let {sequelize,models} = database
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

    application.get('/clean',function(req,res){
        preCleanFiles({models})
        res.render('result',{result:'Corpus Cleaned successfully'})
    })

    application.get('/create_index',async function(req,res){
        let original_count = getCorpusFiles().files.length
        let clean_count = getCorpusFiles(true).files.length
        let message = {result:'Index Created Successfully'}
        if (clean_count<original_count){
            message = {result:'Clean files are less than corpus original fiels you have to clean them first',type:"warning "}
        }else {
            await create_index(database)
        }
        res.render('result',message)
    })


    const server = application.listen("3000", () => {
        console.log(`Server Started :: http://localhost:${3000}/`);
    });
    return server;
}


module.exports = initServer