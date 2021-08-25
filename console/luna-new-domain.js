const chalk = require("chalk");
const boxen = require("boxen");
const commandLineArgs = require('command-line-args')
const packaje = require('../package.json');

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "blue"
};

const optionDefinitions = [
    { name: 'name', alias: 'n', type: String }
]

const options = commandLineArgs(optionDefinitions);
if(!options.name){
    console.error("--name option is required");
    return ;
}
let name = `${options.name[0].toUpperCase()}${options.name.substring(1)}`;

const greeting = chalk.white.blueBright(
`Luna JS
${packaje.name} 
version: ${packaje.version}
Creating new domain structure: ${name}`);

const msgBox = boxen( greeting, boxenOptions);

console.log(msgBox);

let fs = require('fs');
let dir = `./app/${name}`;

if (fs.existsSync(dir)){
    console.error(`${dir} dir already exist`);
    return ;
}

const BaseController = fs.readFileSync(process.cwd() + '/console/src/BaseController.js', 'utf8').replace(/Base/g, name).replace(/base/g, name.toLowerCase());
const BaseModel = fs.readFileSync(process.cwd() + '/console/src/BaseModel.js', 'utf8').replace(/Base/g, name).replace(/base/g, name.toLowerCase());
const BaseService = fs.readFileSync(process.cwd() + '/console/src/BaseService.js', 'utf8').replace(/Base/g, name).replace(/base/g, name.toLowerCase());
const BaseRoutes = fs.readFileSync(process.cwd() + '/console/src/BaseRoutes.js', 'utf8').replace(/Base/g, name).replace(/base/g, name.toLowerCase());



fs.mkdirSync(dir);
fs.mkdirSync(`${dir}/Controllers`);
fs.writeFileSync(`${dir}/Controllers/${name}Controller.js`, BaseController);

fs.mkdirSync(`${dir}/Models`);
fs.writeFileSync(`${dir}/Models/${name}Model.js`, BaseModel);
fs.mkdirSync(`${dir}/Services`);
fs.writeFileSync(`${dir}/Services/${name}Service.js`, BaseService);

/* Routes */
fs.writeFileSync(`${dir}/routes.js`, BaseRoutes);