import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { filter, map, Observable, tap } from 'rxjs';
import { UserService } from '../data-acces/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {

  constructor(private userService : UserService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.userService.getUserUpdateListener().pipe(
        filter((user) => user != undefined),
        map((user) => !!user.isStaff),
      );
  }
  
}
