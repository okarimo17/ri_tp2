const fs = require('fs')

const textCleaner = require('./text_cleaner')
const tokenizeText = require('./tokenize')

function makeIndex(){
    let text = fs.readFileSync('./test.txt','utf-8')
    let clean_text = textCleaner(text)
    let result = tokenizeText(clean_text)
    fs.writeFileSync('./test_clean.txt',result,'utf-8')
}

module.exports = makeIndex