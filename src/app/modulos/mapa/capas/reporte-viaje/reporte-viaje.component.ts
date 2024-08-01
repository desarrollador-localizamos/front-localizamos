import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { VentanaInfoAccionComponent } from '../ventana-info-accion/ventana-info-accion.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataService } from '../../../../core/services/data.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { SelectAvanzadoComponent, data } from "../../../../shared/components/inputs/select/select-avanzado/select-avanzado.component";
import { PrimeNGConfig } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { TableAgrupacionComponent } from "../../../../shared/components/tables/table-agrupacion/table-agrupacion.component";
import { User } from '../../../../core/interfaces/user.interface';
import { Observable, Subscription, catchError, tap, throwError } from 'rxjs';
import { DataSimpleService } from '../../../../core/services/datasimple.service';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { TagModule } from 'primeng/tag';
import { TableSencillaComponent } from "../../../../shared/components/tables/table-sencilla/table-sencilla.component";

interface EstructuraData {
  id: number;
  [key: string]: any;
}

@Component({
  selector: 'app-reporte-viaje',
  standalone: true,
  imports: [TableModule, HttpClientModule, CommonModule, DividerModule, DialogModule, ButtonModule, InputTextModule, CalendarModule, FormsModule, SelectAvanzadoComponent, TableAgrupacionComponent, TableSencillaComponent],
  templateUrl: './reporte-viaje.component.html',
  styleUrl: './reporte-viaje.component.scss'
})
export class ReporteViajeComponent {

  @ViewChild(VentanaInfoAccionComponent) ventanaInfoAccion!: VentanaInfoAccionComponent;

  protected visible: boolean = false;
  protected position: string = 'center';
  protected rango: data[] = [];
  protected dateInicio: Date | undefined;
  protected dateFin: Date | undefined;
  protected seleccionarOpciones: data | undefined;
  protected rangeDates: Date[] | undefined;
  protected MostrarCalendario: boolean = false;
  protected unityId: number | undefined;
  protected bannerVisible: boolean = false;

  protected validar: boolean = true;
  private res: any[] = [];
  protected datos: data[] = [];
  private cabeceras: any = { Entities: {}, Fields: {}, Relations: {}, Joins: {}, Multiconditions: {}, Servicios: {}, DataInsert: {} };
  protected result = { clientes: this.res, }
  protected opciones = { UserScheduledEmails: this.datos }
  private user: User = { "id": 1, "email": "a@l", "customer_id": 1, };
  private condicions: any = { "idCustomer": this.user.customer_id };

  protected data: { header: any[], body: EstructuraData[] } = { header: [], body: [] };
  protected resultData: any = {};
  protected displayedColumns: string[] = [];
  protected routeSubscription!: Subscription;
  protected fieldNames: string[] = [];
  

  constructor(private dataService: DataService,private primengConfig: PrimeNGConfig, private dataSimpleService: DataSimpleService) {
   
  }

  ngOnInit() {
    this.dataService.reporteViaje$.subscribe((unityId: number) => {
      console.log("Recibido unityId:", unityId);
      this.reporteRuta(unityId);  // Pasar el `unityId` al método `reporteRuta`
    });

    if (this.condicions["idCustomer"] == 1) {
      this.validar = true;
    } else {
      this.validar = false;
    }

    this.cabeceras.Fields = {
      UserScheduledEmails: [
        { campo: "id", texto: "value" },
        { campo: "customerId", texto: "campo" },
        { campo: "unityId", texto: "campo" },
        { campo: "dataSend", texto: "campo" },
        { campo: "email", texto: "campo" },
        { campo: "status", texto: "campo" },
        { campo: "scheduledStartTime", texto: "campo" },
        { campo: "scheduledEndTime", texto: "campo" },
      ],
    };

    this.cabeceras.Entities = {
      'UserScheduledEmails': "UserScheduledEmails",
    };

    this.cabeceras.Relations = {
      UserScheduledEmails: [],
    }

    this.cabeceras.Joins = {
      'UserScheduledEmails': [],
    }

    this.cabeceras.Multiconditions = {
      'UserScheduledEmails': [
        {"ref":"status","valor":[0]},
     
      ],
    }

    this.cabeceras.Servicios = {
      'UserScheduledEmails': 'Database/visor',
    }
  }


  reporteRuta(unityId: number){
    this.position = "top";
    this.visible = true;
    this.unityId = unityId;

    this.consultas('UserScheduledEmails');

   }


   protected async consultas(entidad: string, datos?: any): Promise<void> {
    switch (entidad) {

      case 'UserScheduledEmails':
   
          await this.consultaback('UserScheduledEmails', "simple", "unityId", "", {}).toPromise();
          
      break;

      // case 'GeographicalResources':

      //   if(this.condicions["idCustomer"] == 1){
      //     this.clienteSeleccionado = this.clienteSeleccionado.id;
        
      //   }else{
      //     this.clienteSeleccionado = this.condicions["idCustomer"];
         
      //   }
      //   console.log("Geofence coordinates updated:", this.geofenceCoordinates[0]);
      //   const coordinatesString =  this.geofenceCoordinates[0];

      //   const coordinatesArray = coordinatesString.split(',').map(coord => {
      //     const [longitude, latitude] = coord.trim().split(' ').map(Number);
      //     return [longitude, latitude];
      //   });

      //     const geoJsonPolygon = {
      //       type: "Polygon",
      //       coordinates: [coordinatesArray]
      //     };
      //   const dataInsert = {
      //     name: this.nombre,
      //     type: this.tipoSeleccionado?.id,
      //     color: this.colorSeleccionado,
      //     customerId: this.clienteSeleccionado,
      //     isPrivate: this.checkedPrivado,
      //     applyForAddress: this.checkedDireccion,
      //     status: this.checkedEstado,
      //     points: this.geofenceCoordinates[0],
      //     pointsG: geoJsonPolygon
      //   };

      //   await this.consultabackInsert('GeographicalResources', dataInsert).toPromise();
      //   break;
    }
  }

  private consultaback(entidad: string, tipo: string, cabecera?: string, identif?: string, ordenar?: any): Observable<any> {
    console.log("servicio", this.cabeceras.Servicios);
    console.log("entidad", entidad);
    let id = "";
    if (identif)
      id = identif;
    else
      id = "id";
    return this.dataSimpleService.fetchData(this.cabeceras.Servicios[entidad], this.cabeceras.Entities[entidad],
      this.cabeceras.Fields[entidad], this.cabeceras.Relations[entidad], {},
      this.cabeceras.Joins[entidad], this.cabeceras.Multiconditions[entidad], ordenar)
      .pipe(
        tap(response => {
         
          this.resultData = response;
          console.log("respo", this.resultData);
         
          switch (tipo) {
            case "simple":
              this.datos = response.body.map((item: any) => ({
                id: item[`${id}`],
                name: item[`${cabecera}`],
              }));
              break;
            case "multi":
              this.datos = response.body.map((item: any) => ({
                id: item[0][`${id}`],
                name: item[0][`${cabecera}`],
              }));
              break;
            case "report":
              this.datos = response;
              break;
          }
        }),
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error)
        }));
  }



  // private consultabackInsert(entidad: string, dataInsert?: any): Observable<any> {
  //   return this.dataSimpleService.Insert(this.cabeceras.Servicios[entidad], this.cabeceras.Entities[entidad], dataInsert)
  //     .pipe(
  //       tap(response => {

  //        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha creado la geocerca exitosamente' });
  //         this.limpiar();
  //       }),
  //       catchError(error => {
  //         console.log('Error en la solicitud:', error);
  //         return throwError(() => error)
  //       }));
  // }

}
