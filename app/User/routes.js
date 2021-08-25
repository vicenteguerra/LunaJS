let Controller = require('./Controllers/UserController');

module.exports = function (router) {
    router.get('/users', Controller.find);
    router.get('/users/:id', Controller.findOne);
    router.post('/users', Controller.create);
    router.patch('/users', Controller.update);
    router.delete('/users', Controller.destroy);
    return router;
};
