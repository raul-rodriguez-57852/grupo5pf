import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { DataApiService } from '../services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class DocenteAuthGuard implements CanActivate {

  constructor(private dataApiService: DataApiService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userType = this.dataApiService.getUserType();
    if (userType !== null && userType === '1') {
      return true;
    }
    return false;
  }
  
}
