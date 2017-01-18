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
var Login = (function () {
    function Login(router, http, route) {
        this.router = router;
        this.http = http;
        this.route = route;
    }
    Login.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.color = params['color']; // this.id = +params['id'] (+) converts string 'id' to a number
            _this.errorMessage = params['errorMessage'];
            // In a real app: dispatch action to load the details here.
        });
    };
    Login.prototype.login = function (event, username, password) {
        var _this = this;
        event.preventDefault();
        var body = JSON.stringify({ username: username, password: password });
        this.http.post(headers_1.hostUrl + '/login', body, { headers: headers_1.contentHeaders })
            .subscribe(function (response) {
            localStorage.setItem('id_token', response.json().id_token);
            _this.router.navigate(['home']);
        }, function (error) {
            alert(error.text());
            console.log(error.text());
        });
    };
    Login.prototype.signup = function (event) {
        event.preventDefault();
        this.router.navigate(['signup']);
    };
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './app/login/login.html',
            styleUrls: ['./app/login/login.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, router_2.ActivatedRoute])
    ], Login);
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=login.js.map