import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApirestService {

  private apiUrl = 'http://apiservicios.localizamos.co/api/v1'; // Reemplaza esto con la URL real de tu API
  // public apiUrl: string ='http://localhost/Localizamos/back-postgres/public/api/v1';


  constructor(private http: HttpClient) { }

  queryGet(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${endpoint}`);
  }


  queryPostRegular(route: string, body: any): Observable<any> {
    const url = `${this.apiUrl}/${route}`;
    const headers = new HttpHeaders({
   
    });

    return this.http.post<any>(url, body, { headers });
  }


  queryPost(route: string, body: any): Observable<any> {
    let token = 'Bearer';

    if (null != sessionStorage.getItem('sid') && undefined != sessionStorage.getItem('sid') && 'null' != sessionStorage.getItem('sid')) {
      token += sessionStorage.getItem('sid')?.substring(6);
    } else {
      token = '';
    }

    const headers = new HttpHeaders({ 'Authorization': token });
    const url = `${this.apiUrl}/${route}`;
    let result = this.http.post<any>(url, body, { headers: headers });

    return result;
  }
    
}

  

  
