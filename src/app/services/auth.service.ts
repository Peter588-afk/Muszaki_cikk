import { Injectable } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: firebase.default.User | null | undefined;
  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    });
   }
  

  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout(){
    return this.auth.signOut();
  }

  isUserLoggedIn(){
    return this.auth.user;
  }
}
