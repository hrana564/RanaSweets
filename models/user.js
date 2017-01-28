/**
 * Created by HP PC on 01-01-2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    userName:{type: String,
        required: [true,'User Name is Mandatory.'],
        trim: true
    },
    password: {type :String,
        validator : {
            validate : function (v) {
                return v.length >3;
            },
            required: [true,'Password is Mandatory.'],
            message: 'Invalid Password "{VALUE}" !! IT should be greater than 3!'
        }
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    age: {type: Number, min: 18, max: 100},
    resetKey: {type : String,default : ''},
    lastUpdatedOn : {type: Date, default: Date.now()}
});

var UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;