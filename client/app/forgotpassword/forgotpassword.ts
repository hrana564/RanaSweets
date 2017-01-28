import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import {contentHeaders, hostUrl} from '../common/headers';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';


@Component({
  selector: 'forgotPassword',
  templateUrl : './app/forgotpassword/forgotpassword.html',
  styleUrls: [ './app/forgotpassword/forgotpassword.css' ]
})
export class ForgotPassword {
  color: string;
  errorMessage : string;
  successMessage : string;
  forgotPasswordForm : FormGroup;
  constructor(public router: Router, public http: Http,private route: ActivatedRoute,private fb:FormBuilder) {
    this.route.params.subscribe(params => {
      this.color = params['color']; // this.id = +params['id'] (+) converts string 'id' to a number
      this.errorMessage = params['errorMessage'];
      // In a real app: dispatch action to load the details here.
    });
    this.forgotPasswordForm =  fb.group({
      email: ['hrana564@gmail.com',[Validators.required,this.ValidateEmail]],
    });
  }

  forgotPassword(event, email) {
    event.preventDefault();
    let body = JSON.stringify({ email});
    this.http.post(hostUrl+'/forgotPassword', body, { headers: contentHeaders })
      .subscribe(
        response => {
          this.successMessage = response.text();
          // localStorage.setItem('id_token', response.json().id_token);
          // this.router.navigate(['home']);
        },
        error => {
          console.log(error.text());
          if(error.text() == "No such email exist!!!"){
            this.errorMessage =error.text();
          }else{
            this.router.navigate(['login','red','Error occoured while resetting your password!!!']);
          }
        }
      );
  }

  backToLogin(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

  ValidateEmail(c: FormControl) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return c.value=='' || re.test(c.value) ? null : {
      ValidateEmail: {
        valid: false
      }
    };
  }
}