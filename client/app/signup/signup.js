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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var headers_1 = require('../common/headers');
var forms_1 = require('@angular/forms');
var Signup = (function () {
    function Signup(router, http, fb) {
        this.router = router;
        this.http = http;
        this.signupForm = fb.group({
            userName: ['test', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            cnfPassword: ['', [forms_1.Validators.required]],
            email: ['hrana564@gmail.com', [forms_1.Validators.required, ValidateEmail]],
            age: [18, [forms_1.Validators.required, ValidateAge]]
        }, { validator: PasswordMatchValidator('password', 'cnfPassword') });
    }
    Signup.prototype.login = function (event) {
        event.preventDefault();
        this.router.navigate(['login']);
    };
    Signup.prototype.onSubmit = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        if (valid) {
            var body = JSON.stringify({ value: value });
            this.http.post(headers_1.hostUrl + '/signup', body, { headers: headers_1.contentHeaders })
                .subscribe(function (response) {
                console.log(response);
                //localStorage.setItem('id_token', response.json().id_token);
                //this.router.navigate(['home']);
                _this.router.navigate(['login', 'green', 'Successfully Registed.']);
            }, function (error) {
                //alert(error.text());
                console.log(error.text());
                _this.router.navigate(['login', 'red', 'Error Occoured!!!']);
            });
        }
    };
    Signup.prototype.OnReset = function (event) {
        if (event)
            event.preventDefault();
        this.signupForm.reset({
            userName: { value: 'him', disabled: false },
            password: { value: 'test', disabled: false },
            cnfPassword: { value: 'test', disabled: false },
            email: { value: 'hrana564@gmail.com', disabled: false },
            age: { value: '22', disabled: false }
        });
    };
    Signup = __decorate([
        core_1.Component({
            selector: 'signup',
            templateUrl: './app/signup/signup.html',
            styleUrls: ['./app/signup/signup.css']
        }),
        __param(2, core_1.Inject(forms_1.FormBuilder)), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, forms_1.FormBuilder])
    ], Signup);
    return Signup;
}());
exports.Signup = Signup;
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
function ValidateAge(c) {
    return c.value == '' || (c.value >= 18 && c.value <= 100) ? null : {
        ValidateAge: {
            valid: false
        }
    };
}
function ValidateEmail(c) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return c.value == '' || re.test(c.value) ? null : {
        ValidateEmail: {
            valid: false
        }
    };
}
//# sourceMappingURL=signup.js.map