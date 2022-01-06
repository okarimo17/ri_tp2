const fs = require('fs')

function getCorpusFiles(clean=false){
    const corpus_directory = global.corpus+(clean?"clean" :"original")+"/"
    let files = fs.readdirSync(corpus_directory)
    return {files,directory:corpus_directory};
}

function doesIndexExist(){
    const dataset_directory = global.corpus+"dataset.json"
    let exists = fs.existsSync(dataset_directory)
    return exists
}


module.exports = {getCorpusFiles,doesIndexExist}