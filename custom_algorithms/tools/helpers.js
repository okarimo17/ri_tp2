const fs = require('fs')

function getCorpusFiles(clean=false){
    const corpus_directory = global.corpus+(clean?"clean" :"original")+"/"
    let files = fs.readdirSync(corpus_directory)
    return {files,directory:corpus_directory};
}


module.exports = {getCorpusFiles}