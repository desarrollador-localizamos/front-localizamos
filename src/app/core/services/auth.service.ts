import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //Se pone publico para poder utilizarlo en otro lado pero se inicializa en private para que nadie pueda cambiar la señal  y el estado de autentificacion
  public currentUser = computed( () => this._currentUser);
  public authStatus = computed( () => this._authStatus);

  private characters = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean>{
    console.log("hola");
    const url = `${ this.baseUrl}/login`;
    const body = {email, password};

    return this.http.post<LoginResponse>(url,body)
      .pipe(
        tap( ({user, token}) => {
          this._currentUser.set(user);
          //De esta manera se van a cambiar automaticamente en las variables computadas y en todo lado y se va saber que el usuario esta autenticado
          this._authStatus.set( AuthStatus.authenticated); 
          sessionStorage.setItem('sid', token);
          
      }),
      map( () => true),

      catchError( err => {
        console.log(err)
        return throwError( () => 'Algo no sucedio como no se esperaba');

      })
    );
  }


  generateToken(rawToken: string): string {

    let text = "";
    for (let i = 0; i < 4; i++) {
      text += this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    }
    return 'ey' + text + rawToken;
  }
}
