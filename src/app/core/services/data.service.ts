import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private ubicationSubject = new BehaviorSubject<number[]>([]);
  ubication$ = this.ubicationSubject.asObservable();
  constructor(private http: HttpClient ) {}

  private responseSubject = new BehaviorSubject<any>(null);
  private itemsSelectedSubject = new BehaviorSubject<any[]>([]);
  itemsSelected = this.itemsSelectedSubject.asObservable();

  private readonly baseUrl: string = environments.baseUrl;

  setUbicationValue(value: number) {
    const currentValues = this.ubicationSubject.getValue();
    if (!currentValues.includes(value)) {
      this.ubicationSubject.next([...currentValues, value]);
    }
  }

  getUbicationValue(): Observable<number[]> {
    return this.ubication$;
  }
  setItemsSelected(list: any[]) {
    this.itemsSelectedSubject.next(list);
  }


   fetchData(fieldMappings: any, selectedLink: string, fieldRelations : any, condition?: any, fieldJoins?: any, multiconditions?: any,): Observable<any> {

    const data = fieldMappings[selectedLink] || [];
    let dataCompleta : any;

    let relations : any;
    let joins: any[] = [];

    if(fieldRelations.length = 0){
      relations= [];
    }
    else{
      relations = fieldRelations[selectedLink] || []
      
    }
    console.log("joins",fieldJoins);
    if(fieldJoins.length = 0){
      joins= [];
    }
    else{
      joins = fieldJoins[selectedLink] || []
      
    }
   
    const url = `${this.baseUrl}visor`;
    const body = {
      entityName : selectedLink,
      fields : data,
      conditions: condition,
      relations: relations,
      joins: joins,
      multiconditions: multiconditions,
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
  

  setResponse(response: any) {
    this.responseSubject.next(response);
    //console.log("holisss",response);
  }

  getResponse(): Observable<any> {
    return this.responseSubject.asObservable();
  }
}
