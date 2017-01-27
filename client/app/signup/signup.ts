import { Component,OnInit, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import {contentHeaders, hostUrl} from '../common/headers';
import {ISignup} from './signup.interface'
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';

@Component({
  selector: 'signup',
  templateUrl : './app/signup/signup.html',
  styleUrls: [ './app/signup/signup.css' ]
})
export class Signup  {
  signupForm: FormGroup;
  constructor(public router: Router, public http: Http,@Inject(FormBuilder) fb: FormBuilder) {
      this.signupForm = fb.group({
          userName:['test',[Validators.required,Validators.minLength(3)]],
          password: ['',[Validators.required,Validators.minLength(3)]],
          cnfPassword: ['',[Validators.required]],
          email: ['hrana564@gmail.com',[Validators.required,ValidateEmail]],
          age: [18,[Validators.required,ValidateAge]]
      }, {validator: PasswordMatchValidator('password', 'cnfPassword')});
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

  onSubmit({ value, valid }: { value: ISignup, valid: boolean }) {
      if(valid){
          let body = JSON.stringify({ value });
          this.http.post(hostUrl+'/signup', body, { headers: contentHeaders })
              .subscribe(
                  response => {
                      console.log(response);
                      //localStorage.setItem('id_token', response.json().id_token);
                      //this.router.navigate(['home']);
                      this.router.navigate(['login','green','Successfully Registed.']);
                  },
                  error => {
                      //alert(error.text());
                      console.log(error.text());
                      this.router.navigate(['login','red','Error Occoured!!!']);
                  }
              );
      }
  }

  OnReset (event){
      if(event) event.preventDefault();
      this.signupForm.reset({
          userName: {value: 'him', disabled: false},
          password: {value: 'test', disabled: false},
          cnfPassword: {value: 'test', disabled: false},
          email: {value: 'hrana564@gmail.com', disabled: false},
          age: {value: '22', disabled: false}
      });
  }
}

function PasswordMatchValidator (passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];

        if (password.value !== confirmPassword.value) {
            return {
                PasswordMatchValidator: true
            };
        }
    };
}


function ValidateAge(c: FormControl) {
    return c.value=='' || (c.value >= 18 && c.value<=100) ? null : {
        ValidateAge: {
            valid: false
        }
    };
}

function ValidateEmail(c: FormControl) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return c.value=='' || re.test(c.value) ? null : {
        ValidateEmail: {
            valid: false
        }
    };
}

