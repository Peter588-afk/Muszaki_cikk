import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });


  constructor(private location: Location, private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.registerForm.value);

    let emailValue = this.registerForm.get('email')?.value ?? '';
    let pwValue = this.registerForm.get('password')?.value ?? '';
    let firstnameValue = this.registerForm.get('name.firstname')?.value ?? '';
    let lastnameValue = this.registerForm.get('name.lastname')?.value ?? '';

    this.authService.signup(emailValue, pwValue).then(cred =>{
      //console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: emailValue,
        username: emailValue.split('@')[0],
        name: {
          firstname: firstnameValue,
          lastname: lastnameValue
        }
      };
      this.userService.create(user).then(_ => {
        console.log('User added successfully.');
        this.router.navigateByUrl('/home');
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    });
  }

  goBack() {
    this.location.back();
  }

}
