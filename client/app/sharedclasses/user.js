"use strict";
/**
 * Created by HP PC on 15-01-2017.
 */
var User = (function () {
    function User(userName, password, cnfPassword, email, age) {
        this.userName = userName;
        this.password = password;
        this.cnfPassword = cnfPassword;
        this.email = email;
        this.age = age;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map