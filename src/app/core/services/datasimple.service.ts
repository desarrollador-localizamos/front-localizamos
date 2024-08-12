import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class DataSimpleService {

  private ubicationSubject = new BehaviorSubject<number[]>([]);
  ubication$ = this.ubicationSubject.asObservable();
  constructor(private http: HttpClient ) {}

  private responseSubject = new BehaviorSubject<any>(null);
  private responseSubjectEventos = new BehaviorSubject<any>(null);

  private itemsSelectedSubject = new BehaviorSubject<any[]>([]);
  itemsSelected = this.itemsSelectedSubject.asObservable();

  private bannerVisibleSubject = new BehaviorSubject<boolean>(false);
  bannerVisible$ = this.bannerVisibleSubject.asObservable();

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

  fetchData(urlservice: string, entity: string, fields: any[], fieldsrelations: any[], 
    conditions?: {}, fieldJoins?: any[], multiconditions?: any[], orders?:string, 
    take?: number): Observable<any> {            
    let url = `${this.baseUrl}${urlservice}`;
    const body = {
      entityName : entity,
      fields : fields,
      conditions: conditions,
      relations: fieldsrelations,
      joins: fieldJoins,
      multiconditions: multiconditions,
      orders:orders,
      takes:take
    } ;
    console.log(body);
    
    
    return this.http.post(url, body); // Asegura el encabezado de Content-Type
  }

  Insert(urlservice: string, entity: string,dataInsert?: []): Observable<any> {

    let url = `${this.baseUrl}Database/Insert`;
    const body = {
      entityName : entity,
      data: dataInsert,

    } ;

    console.log(body);
    
    
    return this.http.post(url, body); // Asegura el encabezado de Content-Type
  }

  Edit(urlservice: string,  entity: string, conditions: any,dataInsert?: []): Observable<any> {

    let url = `${this.baseUrl}${urlservice}`;
    const body = {
      entityName : entity,
      conditions: conditions,
      data: dataInsert

    } ;
    console.log('Formato del cuerpo:', JSON.stringify(body)); // Verifica el formato en consola
    
    return this.http.post(url, body); // Asegura el encabezado de Content-Type
  }
  
  /**
   * Se reciben datos para actualiza registro de una entidad.
   * @param urlservice URL de API para actualizar datos
   * @param entity Entidad que se quiere actualizar
   * @param dataInsert Información a actualizar
   * @param conditions Trae el id del registro a actualizar
   * @param identifier Campos de identificación unicos en base de datos
   * @param fieldsrelations Relaciones con otras entidades
   * @param fieldJoins Joinas con otras entidades
   * @returns json con el resultado de la operación
   */
  actualizarDatos(urlservice: string, entity: string, dataInsert:{}, conditions: {},  identifier?: {},  fieldsrelations?: [], fieldJoins?: []): Observable<any> {

    let url = `${this.baseUrl}${urlservice}`;
    const body = {
      // ---
      entityName: entity,
      data: dataInsert,
      conditions: conditions,
      identifier: identifier,
      relations: fieldsrelations,
      joins: fieldJoins,
    } ;
    // return [{ "message": "Inserción exitosa" }, { "message": "Error en la inserción" }, {"estatus": "200"}];
    return this.http.post(url, body); // Asegura el encabezado de Content-Type
  }

  setResponse(response: any) {
    this.responseSubject.next(response);
  }

  getResponse(): Observable<any> {
    return this.responseSubject.asObservable();
  }

  
  setResponseUltimosEventos(response: any) {
    this.responseSubjectEventos.next(response);

  }

  getResponseUltimosEventos(): Observable<any> {
    return this.responseSubjectEventos.asObservable();
  }
  

   
  setBannerVisible(visible: boolean) {
    this.bannerVisibleSubject.next(visible);
  }
}
