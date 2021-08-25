let UserService = require('../services/UserService');

let UserController = function(){
    this.find = find;
    this.findOne = findOne;
    this.create = create;
    this.update = update;
    this.destroy = destroy;
};

let find = async function(req, res) {
    let users = await UserService.find(req.query)
    return res.status(200).json(users);
};

let findOne = async function(req, res){
    let user = await UserService.findOne({_id: req.params.id})
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json(user);
}

let create = async function(req, res){
    let user = await UserService.create(req.body)
    if(!user){
        res.status(404).json({message: "User not created"});
    }
    return res.status(200).json(user);
}

let update = async function(req, res){
    let user = await UserService.update(req.params.id, req.body)
    if(!user){
        res.status(404).json({message: "User not found"});
    }
    return res.status(200).json(user);
}

let destroy = async function(req, res){
    UserService.destroy(req.params.id).then(() => {
        return res.status(200).json({message: `User with id ${req.params.id} deleted successfuly`});
    }).catch(err => {
        return res.status(400).json({error: err});
    });
}

module.exports = new UserController();
