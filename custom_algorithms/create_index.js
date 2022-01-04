const fs = require('fs')
const {getCorpusFiles} = require('./tools/helpers')

// const preCleanFiles = require('./pre_clean_files')

function createIndex(){
    let {directory,files} = getCorpusFiles(true)
    if(files.length==0){
        console.log("There is no clean files, first you have to clean the corpus files")
        return "There is no clean files, first you have to clean the corpus files "
    }
    console.log(directory)
}

module.exports = createIndex