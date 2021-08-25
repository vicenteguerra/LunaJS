let User = require('../models/UserModel');

let UserService = function(){
    this.find = find;
    this.findOne = findOne;
    this.create = create;
    this.update = update;
    this.destroy = destroy;
};

let find = async function(query = {}) {
    return new Promise(async (resolve, reject) => {
        let start = query.start ? parseInt(query.start) : 0;
        let limit = query.limit ? parseInt(query.limit) : 30;
        delete query.start;
        delete query.limit;

        let users = await User.find(query).skip(start).limit(limit)
        return resolve(users);
    });
};

let findOne = async function(query){
    return new Promise(async (resolve, reject) => {
        let user = await User.findOne(query);
        return resolve(user);
    });
}

let create = async function(body){
    return new Promise(async (resolve, reject) => {
        let data = body;
        let user = await User.create(data);
        return resolve(user);
    });
}

let update = async function(id, body){
    return new Promise(async (resolve, reject) => {
        let data = body;
        let user = await User.updateOne({_id: id}, data)
        return resolve(user);
    });
}

let destroy = async function(id){
    return new Promise(async (resolve, reject) => {
        User.findByIdAndDelete(id, function (err) {
            if(err) return reject(err)
            return resolve();
        });
    });
}

module.exports = new UserService();
