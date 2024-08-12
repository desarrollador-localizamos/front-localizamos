import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { VentanaInfoAccionComponent } from '../ventana-info-accion/ventana-info-accion.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataService } from '../../../../core/services/data.service';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SelectAvanzadoComponent, data } from "../../../../shared/components/inputs/select/select-avanzado/select-avanzado.component";
import { MessageService,ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { TableAgrupacionComponent } from "../../../../shared/components/tables/table-agrupacion/table-agrupacion.component";
import { User } from '../../../../core/interfaces/user.interface';
import { Observable, Subscription, catchError, tap, throwError } from 'rxjs';
import { DataSimpleService } from '../../../../core/services/datasimple.service';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { TableSencillaComponent } from "../../../../shared/components/tables/table-sencilla/table-sencilla.component";
import { format } from 'date-fns';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

interface EstructuraData {
  id: number;
  [key: string]: any;
}

@Component({
  selector: 'app-reporte-viaje',
  standalone: true,
  imports: [DropdownModule,TableModule,ConfirmDialogModule ,ToastModule, HttpClientModule, CommonModule, DividerModule, DialogModule, ButtonModule, InputTextModule, CalendarModule, FormsModule, SelectAvanzadoComponent, TableAgrupacionComponent, TableSencillaComponent],
  providers: [ConfirmationService, MessageService],
  templateUrl: './reporte-viaje.component.html',
  styleUrl: './reporte-viaje.component.scss'
})
export class ReporteViajeComponent implements AfterViewInit {

  @ViewChild(VentanaInfoAccionComponent) ventanaInfoAccion!: VentanaInfoAccionComponent;

  protected visible: boolean = false;
  protected position: string = 'center';
  protected rango: data[] = [];
  protected dateInicio: Date | undefined;
  protected dateFin: Date | undefined;
  protected seleccionarOpciones: data | undefined;
  protected rangeDates: Date[] | undefined;
  protected MostrarCalendario: boolean = false;
  protected bannerVisible: boolean = false;
  protected mostrarSeleccionPlantilla: boolean = false;
  protected plantillas: any[] | undefined;

  protected seleccionarPlantillas: { name: string, id: string } | undefined;
  protected mostrarFormularioGeneral: boolean = false;

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

  protected seccionEdit: boolean = false;
  protected unityId: number | undefined;

  protected idReporte: number | undefined;
  protected fechaInicio: Date | undefined;
  protected horaInicio: Date | undefined;
  protected correo: string = '';
  protected fechaFin: Date | undefined;
  protected horaFin: Date | undefined;

  // Para la sección de Magnetron
  protected placa: string = '';
  protected cedula: string = '';
  protected vehiculo: string = '';
  protected conductor: string = '';
  protected origen: string = '';
  protected destino: string = '';
  protected referencia: string = '';
  protected ultimaNovedad: string = '';
  protected fechaHoraGPS: string = '';
  protected  detalle: string = '';
  protected servicio: string = '';
  protected  mercancia: string = '';
  protected velocidad: string = '';

  constructor(private dataService: DataService,private primengConfig: PrimeNGConfig, private dataSimpleService: DataSimpleService,
    private messageService: MessageService, private confirmationService: ConfirmationService, 
  ) {

  
  }

  ngOnInit() {
    this.dataService.reporteViaje$.subscribe((unityId: number) => {
      console.log("unityId recibido antes del if:", unityId);
      this.unityId = unityId;
      if (this.unityId) {
      
          this.reporteViaje();
      } else {
        console.log("El valor de unityId es nulo o indefinido");
      }

      if (this.condicions["idCustomer"] == 1) {
        this.validar = true;
      } else {
        this.validar = false;
      }
  
      this.plantillas = [
        { name: 'Magnetron', id:'1' },
        { name: 'Hitachi', id:'2' },
      ];
    });
  }

  ngAfterViewInit() {

   
    this.cabeceras.Fields = {
      UserScheduledEmails: [
        { campo: "id", texto: "no va" },
        { campo: "customerId", texto: "no va" },
        // { campo: "dataSend", texto: "campo" },
        { campo: "email", texto: "Correo " },
        { campo: "scheduledStartTime", texto: "Fecha de inicio" },
        { campo: "scheduledEndTime", texto: "Fecha de fin" },
        { campo: "lastSentTime", texto: "Último envío" },
      ],
    };

    this.cabeceras.Entities = {
      'UserScheduledEmails': "UserScheduledEmails",
      'UserScheduledEmails_': "UserScheduledEmails",
      'UserScheduledEmails__': "UserScheduledEmails",
    };

    this.cabeceras.Relations = {
      UserScheduledEmails: [],
    }

    this.cabeceras.Joins = {
      'UserScheduledEmails': [],
    }
  
    this.cabeceras.Multiconditions = {
      
      'UserScheduledEmails__': [
        {"ref":"id","valor":[this.idReporte]},
      ],
      'UserScheduledEmails___': [
        {"ref":"id","valor":[this.idReporte]},
      ],
    }

    this.cabeceras.Servicios = {
      'UserScheduledEmails': 'Database/visor',
      'UserScheduledEmails_': 'Database/Insert',
      'UserScheduledEmails__': 'Database/Edit',
      'UserScheduledEmails___': 'Database/Edit',
    }
  }

  protected reporteViaje() {
    if (!this.unityId) {
      console.error("No se puede ejecutar reporteViaje, unityId es nulo o indefinido");
      return;
    }


  this.cabeceras.Multiconditions = {
    'UserScheduledEmails': [
      {"ref":"unityId","valor":[this.unityId]},
      {"ref":"status","valor":[0]},
    ],

  };
  
    this.position = "top";
    this.visible = true;
  
    this.consultas('UserScheduledEmails');
  }
  
  

  private formatearFecha(fecha: Date | undefined): string {
    if (!fecha) return '';
    return format(fecha, 'yyyy-MM-dd HH:mm:ss.SSS');
  }
  
  private formatearSoloHora(fecha: Date | undefined): string {
    if (!fecha) return '';
    return format(fecha, 'HH:mm:ss.SSS');
  }
  
  private combinarFechaHora(fecha: Date | undefined, hora: Date | undefined): string {
    if (!fecha || !hora) return '';
    const fechaCombinada = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate(),
      hora.getHours(),
      hora.getMinutes(),
      hora.getSeconds(),
      hora.getMilliseconds()
    );
    return this.formatearFecha(fechaCombinada);
  }

  todosLosCamposLlenos(): boolean {
    return (
      this.fechaInicio !== undefined &&
      this.horaInicio !== undefined &&
      this.correo !== undefined &&
      this.fechaFin !== undefined &&
      this.horaFin !== undefined
    );
  }

  GuardarReporteViaje() {
    if (this.todosLosCamposLlenos()) {
      // Guarda el reporte
      this.consultas('UserScheduledEmails_');
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos requeridos.' });
    }
  }

  protected editarReporte(id: number, email: string, fechaFin: string) {
    console.log(id);
    this.seccionEdit = true;
    this.correo = email;
    this.idReporte = id;
    // Separar la fecha y la hora
    const [fecha, hora] = fechaFin.split(' ');
  
    // Asignar la fecha y la hora
    this.fechaFin = new Date(`${fecha}T00:00:00`);
    this.horaFin = new Date(`1970-01-01T${hora}`);
  
  }

  protected UpdateReporte(){
    this.consultas('UserScheduledEmails__');
  }
  

  protected eliminarReporte(id: number) {
    this.idReporte = id;
    this.consultas('UserScheduledEmails___');
  }
  
  confirm(id: number) {
    this.confirmationService.confirm({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar este reporte?',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.eliminarReporte(id);
        this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Reporte eliminado', life: 3000 });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Acción cancelada', life: 3000 });
      }
    });
  }



  protected onPlantillaSeleccionada() {
    this.mostrarFormularioGeneral = true;
    console.log(this.seleccionarPlantillas);
    
  }

  protected resetSeleccionPlantilla() {
    this.seleccionarPlantillas = undefined;
  }


  protected async consultas(entidad: string, datos?: any): Promise<void> {
    switch (entidad) {

    
  case 'UserScheduledEmails':
          await this.consultaback('UserScheduledEmails', "report", "", "", {}).toPromise();
          
      break;
      case 'UserScheduledEmails_':

       const typereport = this.seleccionarPlantillas?.id;
       console.log("typereport", typereport);
       
        const datosReporte = [
          [{
            "Fecha inicio": { title: "Fecha inicio", value: this.formatearFecha(this.fechaInicio), type: "date" }},
            { title: "Hora inicio", value: this.formatearSoloHora(this.horaInicio), type: "time" },
            { title: "Fecha final", value: this.formatearFecha(this.fechaFin), type: "date" },
            { title: "Hora final", value: this.formatearSoloHora(this.horaFin), type: "time" },
            { title: "Correo electrónico", value: this.correo, type: "email" }
          ],
          [
            { title: "Placa", value: this.placa, type: "text" },
            { title: "Cedula", value: this.cedula, type: "number" },
            { title: "Conductor", value: this.conductor, type: "text" },
            { title: "Origen", value: this.origen, type: "text" },
            { title: "Destino", value: this.destino, type: "text" },
            { title: "Referencia", value: this.referencia, type: "text" },
            { title: "Ultima Novedad", value: this.ultimaNovedad, type: "text" },
            { title: "Fecha-Hora(GPS)", value: this.fechaHoraGPS, type: "text" },
            { title: "Detalle", value: this.detalle, type: "text" }
          ],
         
         [
          { title: "id_template", value: typereport } ]
        ];

              // Agregar campos específicos de Hitachi si es necesario
        if (this.seleccionarPlantillas?.name === 'Hitachi') {
          datosReporte[1].push(
            { title: "Vehículo", value: this.vehiculo, type: "text" },
            { title: "Servicio/Actividad", value: this.servicio, type: "text" },
            { title: "Tipo de mercancía", value: this.mercancia, type: "text" },
            { title: "Velocidad", value: this.velocidad, type: "text" }
          );
        }
        const dataInsert = {
          unityId: this.unityId,
          customerId: this.user.customer_id,
          dataSend:datosReporte,
          email:this.correo,
          status:0,
          scheduledStartTime:this.combinarFechaHora(this.fechaInicio, this.horaInicio),
          scheduledEndTime:this.combinarFechaHora(this.fechaFin, this.horaFin),
        
        };

        console.log(dataInsert);
        
         await this.consultabackInsert('UserScheduledEmails_', dataInsert).toPromise();
          
      break;

      case 'UserScheduledEmails__':

        const dataEdit = {

          email:this.correo,
          scheduledEndTime:this.combinarFechaHora(this.fechaFin, this.horaFin),
        
        };

        console.log(dataEdit);
        
         await this.consultabackEdit('UserScheduledEmails__',{"id":this.idReporte}, dataEdit).toPromise();
          
      break;

      case 'UserScheduledEmails___':

      const dataDelete = {

        status:1,
       
      };
      
       await this.consultabackDelete('UserScheduledEmails__',{"id":this.idReporte}, dataDelete).toPromise();
        
    break;
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

 
  private consultabackInsert(entidad: string,  dataInsert?: any): Observable<any> {
    return this.dataSimpleService.Insert(this.cabeceras.Servicios[entidad],   this.cabeceras.Entities[entidad], dataInsert)
      .pipe(
        tap(response => {

         this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha guardado exitosamente' });
         const unidad =  this.unityId;
         this.reporteViaje( );
         this.mostrarSeleccionPlantilla = false;
         this.seleccionarPlantillas = undefined;
         this.mostrarFormularioGeneral= false;
    
        }),
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error)
        }));
  }

  private consultabackEdit(entidad: string, conditions: any,  dataInsert?: any): Observable<any> {
    return this.dataSimpleService.Edit(this.cabeceras.Servicios[entidad], this.cabeceras.Entities[entidad],conditions, dataInsert)
      .pipe(
        tap(response => {

         this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha editado exitosamente' });
         this.reporteViaje( );
         this.seccionEdit = false;
         this.mostrarSeleccionPlantilla = false;
         this.seleccionarPlantillas = undefined;
         this.mostrarFormularioGeneral= false;
    
        }),
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error)
        }));
  }


  private consultabackDelete(entidad: string, conditions: any,  dataInsert?: any): Observable<any> {
    return this.dataSimpleService.Edit(this.cabeceras.Servicios[entidad], this.cabeceras.Entities[entidad],conditions, dataInsert)
      .pipe(
        tap(response => {
         this.reporteViaje( );
         this.seccionEdit = false;
         this.mostrarSeleccionPlantilla = false;
         this.seleccionarPlantillas = undefined;
         this.mostrarFormularioGeneral= false;
    
        }),
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error)
        }));
  }

}

// {
//   "entityName":"UserScheduledEmails",
//   "conditions":{"id":421},
//   "data":
//     {
    //   "email":"prueba@gmail.com",
    //   "scheduledEndTime":"2024-08-20 11:43:17.000"
    // }
//   }