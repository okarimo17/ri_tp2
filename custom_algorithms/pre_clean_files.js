const fs = require('fs')

const textCleaner = require('./tools/text_cleaner')
const {getCorpusFiles} = require('./tools/helpers')


function preCleanFiles(data){
    let {directory,files} = getCorpusFiles()
    files.map(function(file){
        readCleanSaveFile(directory,file)
    })
}

function readCleanSaveFile(directory,file_name){
    let text = fs.readFileSync(`${directory}${file_name}`,'utf-8')
    let clean_text = textCleaner(text)
    fs.writeFileSync(`${directory}../clean/${file_name}`,JSON.stringify(clean_text),'utf-8')
}

module.exports = preCleanFiles