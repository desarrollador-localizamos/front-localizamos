import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, LoginResponse, User } from '../interfaces';
import { CheckTokenResponse } from '../interfaces/check-token.response';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;
  private router = inject (Router);

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //Se pone publico para poder utilizarlo en otro lado pero se inicializa en private para que nadie pueda cambiar la señal  y el estado de autentificacion
  public currentUser = computed( () => this._currentUser());
  public authStatus = computed( () => this._authStatus());


  private characters = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";

  constructor(private http: HttpClient) {
    //this.checkAuthStatus().subscribe();
   }

   private setAuthentication(user: User, token:string): boolean {
    
        this._currentUser.set( user );
        console.log(user);
        this._authStatus.set( AuthStatus.authenticated );
    console.log('status en private', this._authStatus());
        sessionStorage.setItem('sid', token);
    
        return true;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map((response) => {
          if (response.status_code === 401) {
          
            throw new Error(response.message); 
            return false;
          }

          this.setAuthentication(response.user, response.token);
          return true; // Indicate successful login
        }),
        catchError((error) => throwError(() => error))
      );
  }


  // checkAuthStatus(): Observable<boolean> {

  //   const url = `${this.baseUrl}/checkToken`;
  //   const token = sessionStorage.getItem('sid');
    
  //   if (!token) {
  //     this.logout();
  //     return of(false);
  //   }
  
  //   const headers = new HttpHeaders()
  //     .set('Authorization', `Bearer ${token}`);

  //     console.log(headers);
  
  //   return this.http.post<CheckTokenResponse>(url, { headers })
  //   .pipe(
  //     map(({ user, token }) =>  this.setAuthentication(user, token)),
  //     catchError(() => {
  //       this._authStatus.set(AuthStatus.notAuthenticated);
  //       console.log("error entro en el catch");
  //       return of(false);
  //     })
  //   );
  // }


  logout() {
    sessionStorage.removeItem('sid');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
    this.router.navigateByUrl('/')

  }
}
