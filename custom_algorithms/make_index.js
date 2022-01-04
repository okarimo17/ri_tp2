const fs = require('fs')
let glob = require('glob')

const textCleaner = require('./tools/text_cleaner')
// const tokenizeText = require('./tools/tokenize')

function makeIndex(){
    const corpus_directory = global.corpus
    fs.readdir(corpus_directory,function(err,files){
        if(err){
            return "Error Reading Files";
        }
        files.map(function(file){
            fs.stat(`${corpus_directory}${file}`,function(err,stat){
            if(!stat.isFile())
                return;      
            })
            readCleanSaveFile(corpus_directory,file)
        })            
    })
}

function readCleanSaveFile(directory,file_name){
    let text = fs.readFileSync(`${directory}/${file_name}`,'utf-8')
    let clean_text = textCleaner(text)
    fs.writeFileSync(`${directory}../clean/${file_name}`,clean_text,'utf-8')
}

module.exports = makeIndex