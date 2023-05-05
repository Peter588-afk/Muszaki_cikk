import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { FormControl, FormGroup } from '@angular/forms';
import { PricePipe } from 'src/app/price.pipe';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit{
  currentUser$: Observable<User | null | undefined> | undefined;
  profileForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });
  userId: string | undefined;
   constructor(private reverseStringPipe: PricePipe, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser$ = this.userService.getCurrentUser();
    this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userId = user.id;
        console.log(this.userId);
      }
    });
  }

  saveProfile() {
    console.log(this.profileForm.value);

    let emailValue = this.reverseStringPipe.transform(this.profileForm.get('email')?.value ?? '');
    let firstnameValue = this.reverseStringPipe.transform(this.profileForm.get('name.firstname')?.value ?? '');
    let lastnameValue = this.reverseStringPipe.transform(this.profileForm.get('name.lastname')?.value ?? '');
    let userNameValue = this.reverseStringPipe.transform(this.profileForm.get('username')?.value ?? '');

    const user: User = {
      id: this.userId as string,
      email: emailValue,
      username: userNameValue,
      name: {
        firstname: firstnameValue,
        lastname: lastnameValue
      },
 
    };
    if (Object.keys(user).length === 0) {
      console.log('No changes to update.');
      return;
    }
    this.userService.update(user).then(_ => {
      console.log('User updated successfully.');
    }).catch(error => {
      console.error(error);
    })
  };
    

}
