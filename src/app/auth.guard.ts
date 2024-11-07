import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  router = inject(Router)
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuthenticated = this.checkUserAuthentication(); // Replace with your own authentication logic
      if (!isAuthenticated) {
        // If not authenticated, redirect to a specific route (e.g., login)
        this.router.navigate(['/home']);
        return false; // Prevent routing
      }
      return true; 
  }

  checkUserAuthentication(): boolean {
    const isActive = localStorage.getItem('adminToken');
    if(isActive == 'active'){
      return true;
    } else {
      return false;
    }
  }
  
}
