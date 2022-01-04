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
    return result;    
}

module.exports = textCleaner
