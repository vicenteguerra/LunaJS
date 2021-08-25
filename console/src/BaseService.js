let Base = require('../models/BaseModel');

let BaseService = function(){
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

        let bases = await Base.find(query).skip(start).limit(limit)
        return resolve(bases);
    });
};

let findOne = async function(query){
    return new Promise(async (resolve, reject) => {
        let base = await Base.findOne(query);
        return resolve(base);
    });
}

let create = async function(body){
    return new Promise(async (resolve, reject) => {
        let data = body;
        let base = await Base.create(data);
        return resolve(base);
    });
}

let update = async function(id, body){
    return new Promise(async (resolve, reject) => {
        let data = body;
        let base = await Base.updateOne({_id: id}, data)
        return resolve(base);
    });
}

let destroy = async function(id){
    return new Promise(async (resolve, reject) => {
        Base.findByIdAndDelete(id, function (err) {
            if(err) return reject(err)
            return resolve();
        });
    });
}

module.exports = new BaseService();
