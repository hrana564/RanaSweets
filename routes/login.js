/**
 * Created by HP PC on 01-01-2017.
 */
var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.js');

router.post('/', function(request, response) {
    UserModel.find({userName: request.body.username, password: request.body.password}, function (err, resource) {
        if (err) {
            response.send(err).status(501);
        } else {
            response.json(resource).status(201);
        }
    });
});
module.exports = router;