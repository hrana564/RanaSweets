var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.js');
var EmailUitlity = require('../utilities/email.js');
var commonFunctions = require('../utilities/functions.js');

router.post('/', function(request, response) {
    UserModel.findOne({email:request.body.email}, function (err, resource) {
        if (err) {
            console.log(err);
            return response.status(400).send({
                message: 'Internal Server Error Occoured! Please try again later.'
            });
        }if(! resource){
            return response.status(400).send({
                message: 'No such email exists.'
            });
        } else {
            var resetString = commonFunctions.RandomAlphaNumericStringGenerator(64, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            resource.resetKey = resetString;
            resource.save(function (error) {
                if(error){
                    console.log(error);
                    response.send(error).status(501);
                }else{
                    try{
                        EmailUitlity.SendRetailEmail(request.body.email, '', '', 'Password Reset for Rana Sweets Online', '', "Hi "+resource.userName+", <br /> Your Reset Password Request for <b>Rana Sweets Online </b>have been precessed successfully. User ID = "+resource._id+" Reset string :  "+resetString , function () {
                        response.json(resource).status(201);
                        });
                    }
                    catch (ex){
                        console.log(ex);
                        //response.send(err).status(501);
                        return response.status(400).send({
                            message: 'Internal Server Error Occoured! Please try again later.'
                        });
                    }
                }
            });
        }
    });
});
module.exports = router;