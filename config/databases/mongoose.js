let mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
let fs = require("fs");

let debug = process.env.MONGO_DEBUG && process.env.MONGO_DEBUG == "true" ? true : false;

const server = process.env.MONGO_HOST + ":27017";
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;

let url = `mongodb://${server}`;
let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGO_DATABASE,
};

module.exports = (() => {
    return new Promise((resolve, reject) => {
        mongoose.set("debug", debug);
        console.log("MONGO !");
        console.log(process.env.MONGO_HOST)

        if (["development", "production"].includes(process.env.NODE_ENV)) {
            console.log(process.env.NODE_ENV);
            options = {
                useNewUrlParser: true,
                poolSize: 10,
                bufferMaxEntries: 0,
                useUnifiedTopology: true,
            };
            //url = `mongodb://${user}:${pass}@${server}/${process.env.MONGO_DATABASE}?${mongo_extra_info}`;
            url = `mongodb+srv://${user}:${pass}@${host}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
        }

        mongoose.connect(url, options);
        mongoose.connection.on("error", (e) => {
            console.log(e);
            console.error(`Error connecting to MongoDB: ${e.message}`);
            process.exit(1);
        });

        mongoose.connection.on("connected", () => {
            console.log("CONNECTED");
            return resolve(mongoose);
        });
    });
})();
