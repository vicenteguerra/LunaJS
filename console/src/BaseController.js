let BaseService = require('../services/BaseService');

let BaseController = function(){
    this.find = find;
    this.findOne = findOne;
    this.create = create;
    this.update = update;
    this.destroy = destroy;
};

let find = async function(req, res) {
    let bases = await BaseService.find(req.query)
    return res.status(200).json(bases);
};

let findOne = async function(req, res){
    let base = await BaseService.findOne({_id: req.params.id})
    if(!base){
        return res.status(404).json({message: "Base not found"});
    }
    return res.status(200).json(base);
}

let create = async function(req, res){
    let base = await BaseService.create(req.body)
    if(!base){
        res.status(404).json({message: "Base not created"});
    }
    return res.status(200).json(base);
}

let update = async function(req, res){
    let base = await BaseService.update(req.params.id, req.body)
    if(!base){
        res.status(404).json({message: "Base not found"});
    }
    return res.status(200).json(base);
}

let destroy = async function(req, res){
    BaseService.destroy(req.params.id).then(() => {
        return res.status(200).json({message: `Base with id ${req.params.id} deleted successfuly`});
    }).catch(err => {
        return res.status(400).json({error: err});
    });
}

module.exports = new BaseController();
