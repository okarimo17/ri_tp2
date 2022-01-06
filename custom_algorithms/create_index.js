const fs = require('fs')
const {getCorpusFiles} = require('./tools/helpers')
const stemmer = require('./tools/stemmers')




function split_files_into_chunks(inputArray,perChunk=1){
    var result = inputArray.reduce((resultArray, item, index) => { 
        const chunkIndex = Math.floor(index/perChunk)
        if(!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] 
        }
        resultArray[chunkIndex].push(item)
        return resultArray
    }, [])
    return (result); 
}


async function createIndex(){
    const data_set = {}
    const data_set_info = []

    let {directory,files} = getCorpusFiles(true)
    for(let i=0;i<files.length;i++){
        let file_name = files[i]
        console.log('indexing:'+file_name)
        let words = JSON.parse(fs.readFileSync(`${directory}${file_name}`))
        for(let j=0;j<words.length;j++){
            let word = words[j]
            const stem_word = stemmer(word)
            if(!data_set[stem_word]){
                data_set[stem_word] =[]
                data_set_info.push(stem_word)
            }
            data_set[stem_word].push({document:file_name,occurence:word})
        }
    }
    fs.writeFileSync(`${directory}../dataset.json`,JSON.stringify(data_set),'utf-8')
    fs.writeFileSync(`${directory}../dataset_info.json`,JSON.stringify(data_set_info),'utf-8')

}



module.exports = createIndex