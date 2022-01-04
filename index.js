
const fs = require('fs')
const makeIndex = require('./custom_algorithms/make_index')


makeIndex()

// let natural = require('natural')
// let stemmer = require('snowball-stemmers').newStemmer('french')
// console.log(stemmer.stem("entrainer votre avis et ou notre"))

// let sw = require('./custom_algorithms/stopwords')

// let text = "entrainer etre l'art votre avis et ou notre".split(' ')

// let new_text = text.filter((word)=>{
//     if (sw.indexOf(word) == -1 )
//         return word
// })

// console.log(new_text)

// let test = `

// |	
// |	
// Cet article est une ébauche concernant une ville, commune ou localité de Suède.
// `

function cleanFile(){
    let test = fs.readFileSync('./test.txt','utf-8')
    test = test.replace(/(\d) (\d+)/g,'$1$2')
    test = test.replace('/o/','')
    test = test.replace(/<#\d>/g,'')
    let clean_regex = new RegExp('[\t+\|\t*\n|\n|\r|:|,|(|)|?|.|{|}|-|/]','gi')
    let clean_text = test.replace(clean_regex," ").toLowerCase().trim()
    clean_text = clean_text.replace(/  +/g, ' ')

    // console.log(clean_text)
    // console.log(clean_text.indexOf('\n'))
    let result = fs.writeFileSync('./test_clean.txt',clean_text,'utf-8')
    
    // console.log(`test result is ::: {${clean_text}}`)
    
}

