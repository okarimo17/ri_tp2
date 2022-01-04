
const stopwords = require('./stopwords')
const Tokenizer = require('../tokenizers/aggressive_tokenizer_fr')

module.exports = function () {
  const stemmer = this

  stemmer.stem = function (token) {
    return token
  }

  stemmer.tokenizeAndStem = function (text, keepStops) {
    const stemmedTokens = []

    new Tokenizer().tokenize(text).forEach(function (token) {
      let resultToken = token.toLowerCase()
      if (keepStops || stopwords.words.indexOf(resultToken) === -1) {
        // var resultToken = token.toLowerCase();
        if (resultToken.match(/[a-zâàëéêèïîôûùç0-9]/gi)) {
          resultToken = stemmer.stem(resultToken)
        }
        stemmedTokens.push(resultToken)
      }
    })

    return stemmedTokens
  }

  /*
  stemmer.attach = function () {
    String.prototype.stem = function () {
      return stemmer.stem(this)
    }

    String.prototype.tokenizeAndStem = function (keepStops) {
      return stemmer.tokenizeAndStem(this, keepStops)
    }
  }
  */
}
