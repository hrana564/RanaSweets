/**
 * Created by HP PC on 05-01-2017.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var UserModel = require('../models/user.js');
var EmailUitlity = require('../utilities/email.js');

router.get('/:userID/:resetID', function(request, response) {
    UserModel.findOne({_id: mongoose.Types.ObjectId(request.params.userID),resetKey:request.params.resetID}, function (err, resource) {
        if (err) {
            response.send(err).status(501);
        } if(! resource){
            throw "Invalid access attempt.";
        } else {
            response.json(resource).status(201);
        }
    });
});

router.post('/:userID/:resetID', function(request, response) {
    UserModel.findOne({_id: mongoose.Types.ObjectId(request.params.userID),resetKey:request.params.resetID}, function (err, resource) {
        if (err) {
            response.send(err).status(501);
        } if(! resource){
            throw "Invalid access attempt.";
        } else {
            resource.password = request.body.password;
            resource.save(function (error,obj) {
                if(error){
                    response.send(err).status(501);
                }else{
                    response.json(obj).status(201);
                }
            });
            response.json(resource).status(201);
        }
    });
});

module.exports = router;