require('./constants')
const createIndex = require('./custom_algorithms/create_index')


createIndex()

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


