import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { User } from '../../shared/user.model';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  constructor(private router: Router, private authService: AngularFireAuth, private firestore: AngularFirestore) {
    this.user$ = this.authService.authState.pipe(
      switchMap((user: User) => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));
  }

  logIn(email: string, password: string): Promise<auth.UserCredential> {
    return this.authService.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string): Promise<void> {
    return this.authService.auth.createUserWithEmailAndPassword(email, password)
      .then((result: auth.UserCredential) => {
        this.sendVerificationMail();
        this.updateUserData(result.user);
      });
  }

  sendVerificationMail(): Promise<void> {
    return this.authService.auth.currentUser.sendEmailVerification();
  }

  forgotPassword(passwordResetEmail: string): Promise<void> {
    return this.authService.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async googleSignin(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.authService.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async logOut(): Promise<boolean> {
    await this.authService.auth.signOut();
    return this.router.navigateByUrl('listings');
  }

  private updateUserData({ uid, email, displayName }): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc<User>(`users/${uid}`);
    const data = {
      uid,
      email,
      displayName
    };
    return userRef.set(data, { merge: true });
  }
}
