import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AdminUserId } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AddItemCanActivateGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next, state): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map(user => user.uid === AdminUserId),
      tap(loggedIn => {
        if (!loggedIn) {
          console.error('Access to the page has been denied by the route guard. Please authorize as admin.');
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
}
