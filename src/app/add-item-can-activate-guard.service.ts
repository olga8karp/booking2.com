import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddItemCanActivateGuardService {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next, state): Observable<boolean>{
    return this.authService.user$.pipe(
      take(1),
      map(user => user.uid === 'VWqVCnFHnKTNTKVuYYexx4e5mCf2'),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('Access to the page has been denied by the route guard. Please authorize as admin.');
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
}
