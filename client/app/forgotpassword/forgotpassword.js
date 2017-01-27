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
var router_2 = require('@angular/router');
var forms_1 = require('@angular/forms');
var ForgotPassword = (function () {
    function ForgotPassword(router, http, route, fb) {
        var _this = this;
        this.router = router;
        this.http = http;
        this.route = route;
        this.fb = fb;
        this.route.params.subscribe(function (params) {
            _this.color = params['color']; // this.id = +params['id'] (+) converts string 'id' to a number
            _this.errorMessage = params['errorMessage'];
            // In a real app: dispatch action to load the details here.
        });
        this.forgotPasswordForm = fb.group({
            email: ['hrana564@gmail.com', [forms_1.Validators.required, ValidateEmail]],
        });
    }
    ForgotPassword.prototype.forgotPassword = function (event, email) {
        var _this = this;
        event.preventDefault();
        var body = JSON.stringify({ email: email });
        this.http.post(headers_1.hostUrl + '/forgotPassword', body, { headers: headers_1.contentHeaders })
            .subscribe(function (response) {
            localStorage.setItem('id_token', response.json().id_token);
            _this.router.navigate(['home']);
        }, function (error) {
            console.log(error.text());
            console.log(error.text());
        });
    };
    ForgotPassword.prototype.backToLogin = function (event) {
        event.preventDefault();
        this.router.navigate(['login']);
    };
    ForgotPassword = __decorate([
        core_1.Component({
            selector: 'forgotPassword',
            templateUrl: './app/forgotpassword/forgotpassword.html',
            styleUrls: ['./app/forgotpassword/forgotpassword.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, router_2.ActivatedRoute, forms_1.FormBuilder])
    ], ForgotPassword);
    return ForgotPassword;
}());
exports.ForgotPassword = ForgotPassword;
function ValidateEmail(c) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return c.value == '' || re.test(c.value) ? null : {
        ValidateEmail: {
            valid: false
        }
    };
}
//# sourceMappingURL=forgotpassword.js.map