
const {Sequelize,DataTypes} = require('sequelize');

console.log('Creating database')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database/database.sqlite',
    logging: false,
    define: {
      freezeTableName: true,
      timestamps: false,
    }
})

async function connectToDatabase(callback){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return createDBModels()
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

async function createDBModels(){
    let stem_model = await sequelize.define("stem", {
        stem: {
            type: DataTypes.STRING,
        },
    });
    let document_model = await sequelize.define("document", {
        name: {
            type: DataTypes.STRING,
        },
        occurence: {
            type: DataTypes.STRING,
        },
    });
    stem_model.hasMany(document_model, {
        foreignKey: "stem",
    });  


    await sequelize.sync({})
    return {
        models:{stem_model,document_model},
        sequelize:sequelize
    }

}

module.exports = connectToDatabase