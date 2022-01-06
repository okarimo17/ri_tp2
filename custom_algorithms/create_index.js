const fs = require('fs')
const {getCorpusFiles} = require('./tools/helpers')
const stemmer = require('./tools/stemmers')


async function createIndex({sequelize,models}){
    const {stem_model,document_model} = models
    let {directory,files} = getCorpusFiles(true)
    // await sequelize.sync({force:true})

    for(let i=0;i<files.length;i++){
        let file_name = files[i]
        // let data = fs.createReadStream(`${directory}${file_name}`, { highWaterMark: CHUNK_SIZE });
        let data = fs.readFileSync(`${directory}${file_name}`);
        console.log(file_name)
        // for await(const data of readStream) {
            let words = JSON.parse(data.toString())
            console.log(file_name+"-f2")
            // single_file_word_handler(words[i],stem_model,document_model)
            for(let j=0;j<words.length;j++){
                if(j%50==0)
                    console.log(file_name+" - "+j+" - "+words[j])
                let word = words[j]
                const stem_word = stemmer(word)
                let stem_object = await stem_model.findOne({where:{'stem':stem_word}})
                if(!stem_object){
                    stem_object = await stem_model.create({stem:stem_word})
                }
                document_model.create({name:file_name,stem:stem_object.id,occurence:word})
            }
        // }
    }
}



// async function single_file_word_handler(word,stem_model,document_model){
//     const stem_word = stemmer(word)
//     let stem_object = await stem_model.findOne({where:{'stem':stem_word}})
//     if(!stem_object){
//         stem_object = await stem_model.create({stem:stem_word})
//     }
//     const doc = await document_model.create({name:file_name,stem:stem_object.id,occurence:word})
// }




module.exports = createIndex