"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var headers_1 = require('../common/headers');
var forms_1 = require("@angular/forms");
var ResetPassword = (function () {
    function ResetPassword(router, http, route, fb) {
        this.router = router;
        this.http = http;
        this.route = route;
        this.fb = fb;
        this.userID = '';
        this.resetKey = '';
        this.resetPasswordForm = fb.group({
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            cnfpassword: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]]
        }, { validator: PasswordMatchValidator('password', 'cnfpassword') });
    }
    ResetPassword.prototype.resetPassword = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        console.log(value);
        if (valid) {
            event.preventDefault();
            var body = JSON.stringify({ value: value });
            this.http.post(window.location.href.replace("/#", ''), body, { headers: headers_1.contentHeaders })
                .subscribe(function (response) {
                //localStorage.setItem('id_token', response.json().id_token);
                _this.router.navigate(['login', 'green', 'Password was reset successufully. Please login ']);
            }, function (error) {
                alert(error.text());
                console.log(error.text());
            });
        }
    };
    ResetPassword.prototype.login = function (event) {
        event.preventDefault();
        this.router.navigate(['login']);
    };
    ResetPassword.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.userID = params['userID'];
            _this.resetKey = params['resetKey'];
        });
        var body = JSON.stringify({ userID: this.userID, password: this.resetKey });
        this.http.get(window.location.href.replace("/#", ''))
            .subscribe(function (response) {
            //localStorage.setItem('id_token', response.json().id_token);
            //this.router.navigate(['home']);
        }, function (error) {
            console.log(error.text());
            _this.router.navigate(['login', 'red', 'Invalid attempt!!!']);
        });
    };
    ResetPassword = __decorate([
        core_1.Component({
            selector: 'resetPassword',
            templateUrl: './app/resetpassword/resetpassword.html',
            styleUrls: ['./app/resetpassword/resetpassword.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, router_1.ActivatedRoute, forms_1.FormBuilder])
    ], ResetPassword);
    return ResetPassword;
}());
exports.ResetPassword = ResetPassword;
function PasswordMatchValidator(passwordKey, confirmPasswordKey) {
    return function (group) {
        var password = group.controls[passwordKey];
        var confirmPassword = group.controls[confirmPasswordKey];
        if (password.value !== confirmPassword.value) {
            return {
                PasswordMatchValidator: true
            };
        }
    };
}
//# sourceMappingURL=resetpassword.js.map