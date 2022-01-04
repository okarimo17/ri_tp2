function tokenizeText(text){
    let result = text.split(/[^a-z0-9äâàéèëêïîöôùüûœç-]+/i)
    result = result.join(' ')
    // Removing void - not connected to number of text
    result= result.replace(/[\s+|\t+](-[\s+|\t+])+/g," ")
    // Remove - after text
    result= result.replace(/(\w)-[\s+|\t+]+/g,"$1 ")
    // replacing many consucetive spaces with one space remove space arount the text (begining and end)
    result = result.replace(/ +/g, ' ').trim()
    return result
}

module.exports = tokenizeText