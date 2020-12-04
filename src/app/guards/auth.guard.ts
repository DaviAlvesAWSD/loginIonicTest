import { Injectable } from '@angular/core';
import { CanActivate, Router ,  ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { resolve } from 'dns';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ){ }

  // para caso a pessoa não estiver logada ela não vai poder transitar 
  // pela aplicação e sim ser mandada para tela de login
    canActivate(): Promise<boolean>  {
      return new Promise(resolve => {
          this.authService.getAuth().onAuthStateChanged(user => {
              if(!user) this.router.navigate(['/home']);


              resolve(user ? true: false);
          })
      });
    }
  
}
