import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';
import { Observable, of, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { OrderByDirection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  collectionName = 'Users';

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  create(user: User){
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getAllOrderedBy(field: string, order: OrderByDirection): Observable<User[]> {
    return this.afs.collection<User>('Users', ref => ref.orderBy(field, order)).valueChanges();
  }

  getAllLimitedBy(limit: number): Observable<User[]> {
    return this.afs
      .collection<User>('Users', (ref) => ref.limit(limit))
      .valueChanges();
  }
  
  getAll() {
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).valueChanges();
  }

  update(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).delete();
  }
  getCurrentUser(): Observable<User | null | undefined> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.collection<User>(this.collectionName).doc<User>(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
}
