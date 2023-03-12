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

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    await this.dataApiService.findUser();
    let userType = this.dataApiService.getUserType();
    if (userType !== null && userType === this.dataApiService.getProfesorType()) {
      return true;
    }
    return false;
  }
  
}
