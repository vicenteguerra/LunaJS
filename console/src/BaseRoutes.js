let Controller = require('./Controllers/BaseController');

module.exports = function (router) {
    router.get('/bases', Controller.find);
    router.get('/bases/:id', Controller.findOne);
    router.post('/bases', Controller.create);
    router.patch('/bases', Controller.update);
    router.delete('/bases', Controller.destroy);
    return router;
};
