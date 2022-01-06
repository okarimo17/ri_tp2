require('./config/constants')(__dirname)


const database_init = require('./config/database')
const server_init = require('./config/server')
const helpers = require('./custom_algorithms/tools/helpers')

async function init(){
    // {stem_model,document_model,occurence_model} 
    let database = await database_init()
    server_init({
        database,
        helpers
    })
}

init()


// const createIndex = require('./custom_algorithms/create_index')
// createIndex()
