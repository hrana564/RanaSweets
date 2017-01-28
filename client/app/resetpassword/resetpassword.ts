import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Http } from '@angular/http';
import {contentHeaders, hostUrl} from '../common/headers';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";


@Component({
  selector: 'resetPassword',
  templateUrl : './app/resetpassword/resetpassword.html',
  styleUrls: [ './app/resetpassword/resetpassword.css' ]
})
export class ResetPassword implements OnInit{
  public resetPasswordForm : FormGroup;
  userID:string = '';
  resetKey:string = '';
  constructor(public router: Router, public http: Http,private route: ActivatedRoute,private fb:FormBuilder) {
    this.resetPasswordForm = fb.group({
      password : ['',[Validators.required,Validators.minLength(3)]],
      cnfpassword : ['',[Validators.required,Validators.minLength(3)]]
    }, {validator: PasswordMatchValidator('password', 'cnfpassword')});
  }

  resetPassword({ value, valid }: { value: any, valid: boolean }) {
    console.log(value);
    if(valid){
      event.preventDefault();
      let body = JSON.stringify({ value });
      this.http.post(window.location.href.replace("/#",''), body, { headers: contentHeaders })
          .subscribe(
              response => {
                //localStorage.setItem('id_token', response.json().id_token);
                this.router.navigate(['login','green','Password was reset successufully. Please login ']);
              },
              error => {
                alert(error.text());
                console.log(error.text());
              }
          );
    }
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userID = params['userID'];
      this.resetKey = params['resetKey'];
    });
    let body = JSON.stringify({ userID : this.userID, password : this.resetKey });
    this.http.get(window.location.href.replace("/#",''))
        .subscribe(
            response => {
              //localStorage.setItem('id_token', response.json().id_token);
              //this.router.navigate(['home']);
            },
            error => {
              console.log(error.text());
              this.router.navigate(['login','red','Invalid attempt!!!']);
            }
        );
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