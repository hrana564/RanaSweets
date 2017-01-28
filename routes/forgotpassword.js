var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.js');
var EmailUitlity = require('../utilities/email.js');
var commonFunctions = require('../utilities/functions.js');
var config = require('../utilities/config');

router.post('/', function(request, response) {
    UserModel.findOne({email:request.body.email}, function (err, resource) {
        if (err) {
            console.log(err);
            response.status(500).send("Internal Server Error Occcoured!!!");
        }if(! resource){
            console.log(err);
            response.status(500).send("No such email exist!!!");
        } else {
            var resetString = commonFunctions.RandomAlphaNumericStringGenerator(64, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            resource.resetKey = resetString;
            resource.save(function (error) {
                if(error){
                    console.log(err);
                    response.status(500).send("Internal server error while resetting your password!!!");
                }else{
                    try{
                        EmailUitlity.SendRetailEmail(request.body.email, '', '', 'Password Reset for '+config.AppName, '', "Hi <strong>"+resource.userName+",</strong> <br /> Your Reset Password Request for <b>"+config.AppName+" </b>have been precessed successfully.<br /> <a href = '"+config.hostName+"#/resetPassword/"+resource._id+"/"+resetString +"' >Please click here to reset your password.</a>" , function () {
                            response.status(201).send("Successfully reset your password!!!");
                        });
                    }
                    catch (ex){
                        console.log(ex);
                        response.status(500).send("Error while sending email to your account!!!");
                    }
                }
            });
        }
    });
});
module.exports = router;