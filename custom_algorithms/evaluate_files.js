const fs = require('fs')

const corpus_directory =    global.corpus
const clean_corpus_directory =    global.corpus+ "clean/"


// evaluateTwoFiles('split_fileaa','split_fileab')

function evaluateTwoFiles(file_name1,file_name2){
    let file1_vector= []
    let file2_vector= []

    let file1 = JSON.parse(fs.readFileSync(`${clean_corpus_directory}${file_name1}`))
    let file2 = JSON.parse(fs.readFileSync(`${clean_corpus_directory}${file_name2}`))
    // concatenate file1 and file 2 array
    const words = file1.concat(file2.filter((item) => file1.indexOf(item) < 0))

    let max_1 = file1.length
    let max_2 = file2.length

    words.map(function(word){
        file1_vector.push(file1.filter(x => x === word).length/max_1 )
        file2_vector.push(file2.filter(x => x === word).length/max_2 )
    })
    return calculateCosin(file1_vector,file2_vector)
}



function calculateCosin(array1,array2){
    let upper = 0;
    for(let i=0;i < array1.length;i++){
        upper += array1[i]*array2[i]
    }
    let lower_1 = 0
    let lower_2 = 0
    for(let i=0;i < array1.length;i++){
        lower_1 += array1[i]*array1[i]
        lower_2 += array2[i]*array2[i]
    }
    let result = upper / Math.sqrt(lower_1*lower_2)
    return result
}


module.exports = function (files){

    let pairs = []
    let max = files.length
    for(let i=0;i<max;i++){
        for(let j=i+1;j<max;j++){
            pairs.push([files[i],files[j]])
        }    
    }
    let string = "Cosin Result is :: \n"
    for(let i=0;i<pairs.length;i++){ 
        let pair = pairs[i]
        let cosin = evaluateTwoFiles(pair[0],pair[1])
        string += `${pair[0]},${pair[1]}  ===  ${cosin} <br>`
    }
    return string    
}