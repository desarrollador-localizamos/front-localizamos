import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient ) {}

  private ubicationSubject = new BehaviorSubject<number[]>([]);
  ubication$ = this.ubicationSubject.asObservable();

  private reporteRutaSubject = new Subject<number>();
  reporteRuta$ = this.reporteRutaSubject.asObservable();

  private reporteViajeSubject = new Subject<number>();
  reporteViaje$ = this.reporteViajeSubject.asObservable();

  private reporteRutaDataSubject = new BehaviorSubject<any>(null);
  reporteRutaData$ = this.reporteRutaDataSubject.asObservable();

  private responseSubject = new BehaviorSubject<any>(null);
  private responseSubjectEventos = new BehaviorSubject<any>(null);

  
  private responseSubjectFiltro = new BehaviorSubject<any>(null);

  private itemsSelectedSubject = new BehaviorSubject<any[]>([]);
  itemsSelected = this.itemsSelectedSubject.asObservable();


  private colorSubject = new BehaviorSubject<string>('#5686d3'); // Color por defecto
  color$ = this.colorSubject.asObservable();

  private geofenceCoordinatesSubject = new BehaviorSubject<string[]>([]);
  geofenceCoordinates$ = this.geofenceCoordinatesSubject.asObservable();

  private mapCleanupSource = new Subject<void>();
  mapCleanup$ = this.mapCleanupSource.asObservable();

  private showModalSource = new Subject<boolean>();
  showModal$ = this.showModalSource.asObservable();

  private readonly baseUrl: string = environments.baseUrl;



  // FUNCIOENS DE CONSULTAS CRUD

   fetchData(fieldMappings: any, selectedLink: string, fieldRelations : any, condition?: any, fieldJoins?: any, multiconditions?: any, orders?:any, take?: number, funcion?: string): Observable<any> {

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
      console.log("joins2",joins);
    }
   
    const url = `${this.baseUrl}Database/visor`;
    const body = {
      entityName : selectedLink,
      fields : data,
      conditions: condition,
      relations: relations,
      joins: joins,
      multiconditions: multiconditions,
      orders:orders,
      takes:take,
      funtion:funcion
    } ;
    console.log('Formato del cuerpo:', JSON.stringify(body)); // Verifica el formato en consola
    
    return this.http.post(url, body);
  }
  
  fetchDataReportRuta(fieldMappings: any, selectedLink: string, fieldRelations : any, condition?: any, fieldJoins?: any, multiconditions?: any, orders?:any, take?: number): Observable<any> {

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
      console.log("joins2",joins);
    }
   
    const url = `${this.baseUrl}mobileUnities/report-ruta`;
    const body = {
      entityName : selectedLink,
      fields : data,
      conditions: condition,
      relations: relations,
      joins: joins,
      multiconditions: multiconditions,
      orders:orders,
      takes:take
    } ;
    console.log('Formato del cuerpo:', JSON.stringify(body)); // Verifica el formato en consola
    
    return this.http.post(url, body);
  }

  fetchDataEdit(fieldMappings: any, selectedLink: string, fieldRelations : any, condition?: any, fieldJoins?: any, multiconditions?: any, dataEdit?: any): Observable<any> {

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
      console.log("joins2",joins);
    }
   
    const url = `${this.baseUrl}Database/edit`;
    const body = {
      entityName : selectedLink,
      fields : data,
      conditions: condition,
      relations: relations,
      joins: joins,
      multiconditions: multiconditions,
      data:dataEdit,

    } ;
    console.log('Formato del cuerpo:', JSON.stringify(body)); // Verifica el formato en consola
    
    return this.http.post(url, body);
  }

  fetchDataDelete(fieldMappings: any, selectedLink: string, fieldRelations : any, condition?: any, fieldJoins?: any, multiconditions?: any): Observable<any> {

    const data = fieldMappings[selectedLink] || [];

    let relations : any;
    let joins: any[] = [];

    if(fieldRelations.length = 0){
      relations= [];
    }
    else{
      relations = fieldRelations[selectedLink] || []
    }

    if(fieldJoins.length = 0){
      joins= [];
    
    }
    else{
      joins = fieldJoins[selectedLink] || []
    }
   
    const url = `${this.baseUrl}Database/delete`;
    const body = {
      entityName : selectedLink,
      fields : data,
      conditions: condition,
      relations: relations,
      joins: joins,
      multiconditions: multiconditions,
     
    } ;
    console.log('Formato del cuerpo:', JSON.stringify(body)); // Verifica el formato en consola
    
    return this.http.post(url, body);
  }

  // FUNCIONES ENVIO DE INFORMACÓN ENTRE COMPONENTES

  setUbicationValue(value: number, isModalFilter: boolean = false) {
    if (isModalFilter) {
      // Si es el modal de filtro, limpia los valores existentes y agrega solo el nuevo
      this.ubicationSubject.next([value]);
    } else {
      // Para otros componentes, mantén el comportamiento actual
      const currentValues = this.ubicationSubject.getValue();
      if (!currentValues.includes(value)) {
        this.ubicationSubject.next([...currentValues, value]);
      }
    }
  }
 
  // Método para actualizar todos los valores
  setUbicationValues(values: number[]) {
    this.ubicationSubject.next(values);
  }

  // Método para obtener los valores
  getUbicationValue(): Observable<number[]> {
    return this.ubication$;
  }

  setItemsSelected(list: any[]) {
    this.itemsSelectedSubject.next(list);
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

  setResponseFiltro(response: any) {
    this.responseSubjectFiltro.next(response);

  }

  getResponseFiltro(): Observable<any> {
    return this.responseSubjectFiltro.asObservable();
  }

  emitReporteRuta(unityId : number) {
    this.reporteRutaSubject.next(unityId);
  }

  setReporteRutaData(data: any) {
    this.reporteRutaDataSubject.next(data);
  }

  emitReporteViaje(unityId : number) {
    this.reporteViajeSubject.next(unityId);
  }

  setColor(color: string) {
    this.colorSubject.next(color);
  }

  setGeofenceCoordinates(coordinates: string[]) {
    this.geofenceCoordinatesSubject.next(coordinates);
  }

  triggerMapCleanup() {
    this.mapCleanupSource.next();
  }

  showModal() {
    this.showModalSource.next(true);
  }

}
