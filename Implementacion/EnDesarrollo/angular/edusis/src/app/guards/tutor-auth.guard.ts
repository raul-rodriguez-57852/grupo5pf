import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataApiService } from '../services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class TutorAuthGuard implements CanActivate {

  constructor(private dataApiService: DataApiService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userType = this.dataApiService.getUserType();
    console.log(userType);
    if (userType !== null && (userType === '0' || userType === '2')) {
      return true;
    }
    return false;
  }
  
}
