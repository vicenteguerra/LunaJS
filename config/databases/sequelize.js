module.exports = (() => {
   console.log("SEQUELIZE")
    "use strict";
    require('dotenv').config();
    let fs        = require("fs");
    let path      = require("path");
    let Sequelize = require("sequelize");

    let config    = {
        "logging": process.env.DB_LOGGING ? process.env.DB_LOGGING : false,
        "operatorsAliases": false,
        "dialect": "mysql",
        "omitNull": false,
        "define": {
            "freezeTableName": true,
            "paranoid": true
        }
    };

    console.log("rep", process.env.DB_REPLICATION )
    if(process.env.DB_REPLICATION == "1" && process.env.DB_REPLICATION == 1){
        console.log("REPLICATION ENABLED");
        config.replication = {
            write: {
                username: process.env.DATABSE_USERNAME,
                password: process.env.DATABASE_PASSWORD
            }
        }
        config.replication.read = [];
        let host_read_replicas = process.env.DATABASE_HOST_READ_REPLICAS.split(',');
        for (var i = 0 ; i < host_read_replicas.length ; i++){
            config.replication.read.push({
                host: host_read_replicas[i],
                username: process.env.DATABSE_USERNAME,
                password: process.env.DATABASE_PASSWORD
            })
        }
    }else{
        console.log("REPLICATION NO ENABLED");
        config.host = process.env.DATABASE_HOST;
        config.password = process.env.DATABASE_PASSWORD;
        config.username = process.env.DATABSE_USERNAME;
        config.database = process.env.DATABASE_NAME;
    }

    if (!['development', 'test'].includes(process.env.NODE_ENV)) {
        config.dialectOptions = {
            ssl: { ca : [fs.readFileSync( __dirname + '/../rds-combined-ca-bundle.pem')]}
        };
    }
    if (process.env.DATABASE_URL) {
        var sequelize = new Sequelize(process.env.DATABASE_URL,config);
    } else {
        var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }

    let db  = {};

    fs.readdirSync(__dirname)
        .filter(function(file) {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })
        .forEach(function(file) {
            var model = require(path.join(__dirname, file))
            db[model.name] = model;
        });

    Object.keys(db).forEach(function(modelName) {
        if ("associate" in db[modelName]) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    console.log("SEQUELIZE SYNC *  ** * * *  *");
    return db;
})()