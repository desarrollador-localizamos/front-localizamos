import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private ubicationValue: number | undefined;

  constructor(private http: HttpClient ) {}


  private itemsSelectedSubject = new BehaviorSubject<any[]>([]);
  itemsSelected = this.itemsSelectedSubject.asObservable();

  private readonly baseUrl: string = environments.baseUrl;

  setUbicationValue(value: number) {
    this.ubicationValue = value;
  }

  getUbicationValue() {
    return this.ubicationValue;
  }

  setItemsSelected(list: any[]) {
    this.itemsSelectedSubject.next(list);
  }


   fetchData(fieldMappings: any, selectedLink: string, fieldRelations : any): Observable<any> {

    const data = fieldMappings[selectedLink] || [];
    let dataCompleta : any;
    let relations : any;
    if(fieldRelations.length = 0){
      relations= [];
    }
    else{
      relations = fieldRelations[selectedLink] || []
    }
   
    const url = `${this.baseUrl}/entities/visor`;
    const body = {
      entityName : selectedLink,
      fields : data,
      relations: relations
    } ;
    console.log('Formato del cuerpo:', JSON.stringify(body)); // Verifica el formato en consola
    
    return this.http.post(url, body); // Asegura el encabezado de Content-Type
      // .pipe(
      //   tap(response => {
      //     // Procesa la respuesta según sea necesario
          
      //     dataCompleta = response;
      //     console.log("response2",dataCompleta);
      //     //return dataCompleta;
      //   }), 
      //   catchError(error => {
      //     console.log('Error en la solicitud:', error);
      //     return throwError(() => error);
      //   })
      // ).subscribe();
     // return dataCompleta;
  }
  
}
