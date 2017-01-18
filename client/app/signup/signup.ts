import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import {contentHeaders, hostUrl} from '../common/headers';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import {ISignup} from './signup.interface'

@Component({
  selector: 'signup',
  templateUrl : './app/signup/signup.html',
  styleUrls: [ './app/signup/signup.css' ]
})
export class Signup  implements OnInit {
  signupForm: FormGroup;
  constructor(public router: Router, public http: Http) {

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
                      localStorage.setItem('id_token', response.json().id_token);
                      this.router.navigate(['home']);
                      this.router.navigate(['login','green','Successfully Registed.']);
                  },
                  error => {
                      alert(error.text());
                      console.log(error.text());
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

  ngOnInit() {
      this.signupForm = new FormGroup({
          userName: new FormControl('', [Validators.required, Validators.minLength(2)]),
          password: new FormControl('', [Validators.required, Validators.minLength(2)]),
          cnfPassword: new FormControl('', [Validators.required, PasswordMatchValidator]),
          email: new FormControl('', [Validators.required, ValidateEmail]),
          age: new FormControl('' , [Validators.required,ValidateAge] )
      });

  }

}

function PasswordMatchValidator (c: FormControl) {
    return c.value=='' || (c.value == c.root.get('password').value) ? null : {
        PasswordMatchValidator: {
            valid: false
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

