const express = require('express')
const path = require('path')

const preCleanFiles = require('../custom_algorithms/pre_clean_files')
const create_index = require('../custom_algorithms/create_index')
const fs = require('fs')
const { json } = require('express/lib/response')
const EvaluateFiles = require('../custom_algorithms/evaluate_files')


function initServer({ helpers}){
    let home_dir = global.home_dir
    let {getCorpusFiles,doesIndexExist} = helpers
    // let {sequelize,models} = database
    const application = express()

    application.use(express.json())
    application.use(express.urlencoded({extended:true}))    

    application.set('views',path.join(home_dir,"views"))
    application.set('view engine','pug')    
    application.use(express.static('public'))

    application.get('/',function(req,res){
        let original_count = getCorpusFiles().files.length
        let clean_count = getCorpusFiles(true).files.length
        let indexExists = doesIndexExist()
        res.render('home',{
            original_count,
            clean_count,
            indexExists
        })
    })

    application.get('/clean',function(req,res){
        preCleanFiles()
        res.render('result',{result:'Corpus Cleaned successfully'})
    })

    application.get('/create_index',async function(req,res){
        let original_count = getCorpusFiles().files.length
        let clean_count = getCorpusFiles(true).files.length
        let message = {result:'Index Created Successfully'}
        if (clean_count<original_count){
            message = {result:'Clean files are less than corpus original fiels you have to clean them first',type:"warning "}
        }else {
            await create_index()
        }
        res.render('result',message)
    })


    application.get('/index',function(req,res){
        let index = require(path.join(home_dir,'corpus/dataset_info.json'))
        res.render('index',{index})
    })

    application.get('/index/:index_item',function(req,res){
        let {index_item} = req.params
        let path_index = path.join(home_dir,`corpus/dataset.json`)

        let index = require(path_index)[index_item]
        let data = {}
        index.map(function(item){
            let {document,occurence:word} = item
            if(!data[document])
                data[document] = []
            if(data[document].indexOf(word)==-1)
                data[document].push(word)
        })
        res.render('index_item',{index:data,index_item})
    })

    application.get('/evaluate',function(req,res){
        let {files,directory}= getCorpusFiles(true)
        res.render('evaluate',{files})
    })

    application.get('/mergeevaluate',function(req,res){
        let result = merge_and_evaluate()
        res.render('merge_evaluate',{result});

    })

    application.post('/evaluate',function(req,res){
        let {files } = req.body
        let result = EvaluateFiles(files)
        res.json({result})
    })


    const server = application.listen("3004", () => {
        console.log(`Server Started :: http://localhost:${3004}/`);
    });
    return server;
}


module.exports = initServer