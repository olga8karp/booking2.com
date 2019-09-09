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
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));
  }

  // Sign in with email/password
  signIn(email, password): Promise<void> {
    return this.authService.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.updateUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(email, password) {
    return this.authService.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.updateUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  // Send email verfificaiton when new user sign up
  sendVerificationMail(): Promise<void> {
    return this.authService.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password
  forgotPassword(passwordResetEmail): Promise<void> {
    return this.authService.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  async googleSignin(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.authService.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut(): Promise<boolean> {
    await this.authService.auth.signOut();
    return this.router.navigateByUrl('listings');
  }

  private updateUserData({ uid, email, displayName }): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${uid}`);
    const data = {
      uid,
      email,
      displayName
    };
    return userRef.set(data, { merge: true });
  }
}
