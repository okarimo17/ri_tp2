
const stemmer_provider = require('snowball-stemmers')
const stemmer = stemmer_provider.newStemmer('french')

module.exports = function(word){
  let stem = stemmer.stem(word)
  return stem;
}

