require('./config/constants')(__dirname)


const database_init = require('./config/database')
const server_init = require('./config/server')

async function init(){
    let {stem_model,document_model,occurence_model} = await database_init()
    server_init({stem_model,document_model,occurence_model})

}

init()


// const createIndex = require('./custom_algorithms/create_index')
// createIndex()
