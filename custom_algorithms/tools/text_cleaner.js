const s_words = require('../data/stopwords.json')

function textCleaner(text){
    // clean separated numbers with space
    let result = text.replace(/(\d) (\d+)/g,'$1$2')
    // removing useless /o/ 
    result = result.replace('/o/','')
    // removing useless <#1>,<#2>,<#3>,....
    result = result.replace(/<#\d>/g,'')
    // clean spaces tabs , new lines , and chifres (.,+-*/:|) 
    // \s[-|+|/]\s
    let clean_regex = new RegExp('[\t+\|\t*\n|\n|\r|:|,|(|)|?|;|.|{|}|-|+|/]','gi')
    result = result.replace(clean_regex," ").toLowerCase().trim()
    // replacing many consucetive spaces with one space 
    result = result.replace(/  +/g, ' ')
    // Removing l',d',a'...
    result = result.replace(/\w'(\w)+/g, '$1')
    // Now we can remove '" and these symbols
    result = result.replace(/['|"]/g, '$1')
    result = tokenizeTextAndRemoveStopWords(result)
    return result;    
}

function tokenizeTextAndRemoveStopWords(text){
    let result = text.split(/[^a-z0-9äâàéèëêïîöôùüûœç-]+/i)
    result = result.join(' ')
    // Removing void - not connected to number of text
    result= result.replace(/[\s+|\t+](-[\s+|\t+])+/g," ")
    // Remove - after text
    result= result.replace(/(\w)-[\s+|\t+]+/g,"$1 ")
    // replacing many consucetive spaces with one space remove space arount the text (begining and end)
    result = result.replace(/ +/g, ' ').trim()
    let words = result.split(" ")
    // remove words that have only one letter and aren't a stop word
    words = words.filter(word =>{
        if ( word.length>=2 && s_words.indexOf(word)==-1 ){
            return word;
        }
    })
    return words
}

module.exports = textCleaner
