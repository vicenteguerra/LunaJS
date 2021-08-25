
let PaginationMiddleware = function(){
    this.before =before;
};

let before = function (req, res, next) {
    if(!req.query.limit || isNaN(req.query.limit)){
        req.query.limit = 50;
    }
    if(!req.query.start || isNaN(req.query.start)){
        req.query.start = 0;
    }
    if(req.query.start < 0){
        return res.status(400).json({
            success: false,
            error: "Page should be greater than zero"
        });
    }
    next();
};

module.exports = new PaginationMiddleware();
