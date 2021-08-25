const express = require('express');
const router = express.Router();
const pjson = require('../package.json');
const fs = require("fs");
const app_path = __dirname + '/../app';

fs.readdirSync(app_path)
    .forEach(function(domain) {
        require(`${app_path}/${domain}/routes.js`)(router);
    });

/* GET Health Check. */
router.get('/status', function(req, res, next) {
    return res.json({
        "health": 1,
        "subject": `${pjson.name}: v${pjson.version} is Healthy`
    })
});


module.exports = router;

