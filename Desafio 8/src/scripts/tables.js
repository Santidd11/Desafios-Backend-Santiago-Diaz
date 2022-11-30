const {options} = require("../config/databaseConfig");
const knex = require("knex");

const dataMariaDB = knex(options.mariaDB);

const createTable = async() =>{
    try{
        let productosTable = await dataMariaDB.schema.hasTable("productos");
        if(productosTable){
            await dataMariaDB.schema.dropTable("productos");
        }
        await dataMariaDB.schema.createTable("productos", table=>{
            table.increments("id");
            table.string("title", 45).nullable(false);
            table.integer("price").nullable(false);
            table.string("thumbnail", 300).nullable(false);
        });
        console.log("tabla productos creada");
    }catch(error){
        console.log(error)
    }
    dataMariaDB.destroy();
}

createTable();