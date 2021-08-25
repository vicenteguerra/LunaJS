const fs = require("fs");
const databases_path = __dirname;

module.exports = (() => {
    fs.readdirSync(databases_path)
        .forEach(function(file) {
            if(file != "index.js") {
                require(`${databases_path}/${file}`);
            }
        });
})();