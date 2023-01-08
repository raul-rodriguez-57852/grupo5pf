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
  //Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    await this.dataApiService.findUser();
    let userType = this.dataApiService.getUserType();
    if (userType !== null && (userType === this.dataApiService.getTutorType() || userType === this.dataApiService.getAlumnoType())) {
      return true;
    }
    return false;
  }
  
}
