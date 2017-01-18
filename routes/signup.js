/**
 * Created by HP PC on 01-01-2017.
 */
var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.js');
var EmailUitlity = require('../utilities/email.js');

router.post('/', function(request, response) {
    var user = new UserModel(request.body.value);
    user.save(function(err, resource) {
        if (err) {
            response.send(err).status(501);
        } else {
            EmailUitlity.SendRetailEmail(user.email, '', '', 'Test email from rana sweets. ✔', '', "Hi "+user.userName+", <br /> Welcome to <b>Rana Sweets</b>.", function () {
                response.json(resource).status(201);
            });
        }
    });
});

module.exports = router;