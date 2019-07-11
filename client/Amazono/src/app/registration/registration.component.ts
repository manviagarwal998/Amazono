import { Component, OnInit } from '@angular/core';

import {RestApiService} from '../rest-api.service';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  name='';
  password='';
  password1='';
  email='';
  isSeller=false;
  btnDisabled=false;

  constructor( private data:DataService,private rest:RestApiService,private router:Router) { }

  ngOnInit() {
  }

  validate(){
    if(this.name){
      if(this.email){
        if(this.password){
          if(this.password1){
            if(this.password1==this.password){
                 return true;
            }else{
              this.data.error("Password Mismatch")
            }
          }else{
            this.data.error("Confirmation Password is")
          }
        }else{
          this.data.error("Password not entered")
        }
      }else{
        this.data.error("Email is not entered")
      }
    }else{
      this.data.error("Name is Not Entered");
    }
  }

  async register(){
    this.btnDisabled = true;
    try {
      if(this.validate()){
        const data = await this.rest.post(
          'http://localhost:3030/api/accounts/signup',
          {
            email:this.email,
            name:this.name,
            password:this.password,
            isSeller:this.isSeller
          }
        );
        if (data['success']){
          localStorage.setItem('token' , data['token']);
          await this.data.getProfile();
          this.router.navigate(['profile/address'])
          .then(() => {
            this.data.success(
              'Registration Successfull ! Please enter your shipping address.'
            );
          }).catch(error => this.data.error(error));
        }else{
          this.data.error(data['message']);
        }
      }
    }catch(error){
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }
}
