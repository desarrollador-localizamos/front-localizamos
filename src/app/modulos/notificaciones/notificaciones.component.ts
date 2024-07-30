import { Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { tap, catchError, throwError } from 'rxjs';
import { EstructuraData } from '../../core/interfaces/estructura-data';
import { DataService } from '../../core/services/data.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { event } from 'jquery';


interface Estados {
  id: number;
  name: string;
}

interface dataMulti {
  id: number;
  name: string;
}


@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [ConfirmDialogModule,CalendarModule,FormsModule , ToastModule,DataViewModule, ButtonModule, TagModule, CommonModule,ToolbarModule, ButtonModule, SplitButtonModule, InputTextModule,DropdownModule,DialogModule],
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class NotificacionesComponent {

  products!: Product[];
 
  items: MenuItem[] | undefined;
  Activo: any = [];
  visible: boolean = false;
  selectedActivo: any = [];
  estados: any[] | undefined; 
  selectedEstadoId: number | null = null;
  selectedActivoId: any | null = null;
  protected auxi: any = {};
  protected selectedLink: string = '';
  protected data: { header: any[], body: EstructuraData[] } = { header: [], body: [] };
  protected result: any = {};
  protected displayedColumns: string[] = [];
  protected notifications: any[] = [];
  protected notificationsModal: any;
  protected fieldNames: string[] = [];
  protected activoOptions: dataMulti[] = [];
  protected idCustomer: number[] = [];
  protected fechaFiltro: any;
  date2: Date | undefined;
  searchTerm: string = '';


  
  private fieldMappings: { [key: string]: any[] } = {

    Devices: [
      {campo:"mobileUnities.id", texto: "id" },
      {campo:"mobileUnities.plate", texto: "campo" },
      {campo:"customerId", texto: "campo" },
    ],

    UserNotifications: [
      {campo:"id", texto: "id" },
      {campo:"plates", texto: "placa" },
      {campo:"createdAt", texto: "fecha creacion" },
      {campo:"status", texto: "status" },
      {campo:"title", texto: "titulo" },
      {campo:"message", texto: "mensaje" },
      {campo:"customerId", texto: "customerId" },
      {campo:"objectId", texto: "id unidad movil" },
      {campo:"MobileUnities.id", texto: "id unidad movil" },
      {campo:"MobileUnities.brand", texto: "marca" },
      {campo:"MobileUnities.model", texto: "modelo" },
      {campo:"MobileUnities.class.name", texto: "clase" },

      
    ],
  };

  private fieldRelations: { [key: string]: any[] } = {
    
    Devices: [
       "mobileUnities"
    ],
    UserNotifications: [
      "mobileUnities", "mobileUnities.mobileUnityClass","mobileUnityClass"
   ],
  };

  private fieldRelationsJoins: { [key: string]: any[] } = {
  

    UserNotifications: [
     {"mainkey":"objectId", "join":"MobileUnities","joinkey":"id", "relations": ["class"]},
    ],
   };
  
  
  constructor(private primengConfig: PrimeNGConfig,private productService: ProductService,private dataService: DataService,private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.idCustomer[0] =  779;

    this.primengConfig.setTranslation({
      accept: 'Sí',
      reject: 'No',
    });
     
  }

  ngOnInit() {

      this.estados = [
          { id: 1, name: 'Leido' },
          { id: 0 ,name: 'No leido' },
          { id: null ,name: 'todos' },
      ];
      
      this.items = [
        {
            label: 'Marcar todo como leido',
            icon: 'pi pi-check',
            command: () => this.marcarTodoComoLeido()
        },
        {
            label: 'Eliminar todo',
            icon: 'pi pi-trash',
            command: () => this.eliminarTodo()
        }
    ];

    this.primengConfig.setTranslation({
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: "Hoy",
      clear: "Limpiar"
    });
    this.listarNotificaciones();
  }


  FechaSeleccionada(event: Date) {
    const formattedDate = this.formatDate(event);
  
    this.fechaFiltro = formattedDate;
    console.log(this.fechaFiltro);
    
    this.listarNotificaciones();
  
  }
  
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  private getTodayFormatted(): string {
    const today = new Date();
    return this.formatDate(today);
  }
  
  seleccionarEstado() {
    let estadosAEnviar: number[];
        
    if (this.selectedEstadoId === null) {
      // Si no se ha seleccionado un estado específico, envía tanto 0 como 1
      estadosAEnviar = [0, 1];
     
      
    } else {
      // Si se ha seleccionado un estado específico, envía solo ese estado
      estadosAEnviar = [this.selectedEstadoId];
    
    }

    return estadosAEnviar;
  }
    

  consultarActivo(){
    this.selectedLink = "Devices";
    
    this.dataService.fetchData(this.fieldMappings, this.selectedLink, this.fieldRelations, {}, {}, [{ "ref": "customerId", "valor": this.idCustomer }])
    .pipe(
        tap(response => {
            this.result = response;
            console.log(this.result);
            
            // Procesar los datos para el dropdown
            this.activoOptions = this.result.body.map((item: any) => {
                // Asegúrate de que la estructura de 'item' sea correcta
                if (Array.isArray(item) && item.length > 0) {
                    const firstItem = item[0];
                    return {
                        id: firstItem.mobileUnitiesid,
                        name: firstItem.mobileUnitiesplate
                    };
                }
                return null;
            }).filter((item: any) => item !== null);
        }),
        catchError(error => {
            console.log('Error en la solicitud:', error);
            return throwError(() => error);
        })
    ).subscribe();
}

  onActivoSelectionChange(event: any) {
  if (event.value && event.value.name) {
        this.selectedActivoId = event.value.name;
      } else {
        this.selectedActivoId = "";
        console.log("hellp");
        
      }
      console.log('Activo seleccionado:', this.selectedActivoId);
  }

  onSearch() {
    this.filtrarNotificaciones();
  }

   filtrarNotificaciones(){

   console.log(this.selectedActivoId);
   
    this.seleccionarEstado();
    this.listarNotificaciones();
    
  }
  

  listarNotificaciones(){

    const estadosAEnviar = this.seleccionarEstado();

    if (this.fechaFiltro) {
      console.log("Fecha seleccionada:", this.fechaFiltro);
      
    } else {
      this.fechaFiltro = this.getTodayFormatted();
           
    }

    if(this.selectedActivoId == null){
      this.selectedActivoId = "";
            
    }else{
        
            
    }
 
    this.selectedLink = "UserNotifications";

    
    let condicionesFiltro = [
      { "ref": "customerId", "valor": this.idCustomer },
      { "ref": "createdAt", "valor": [this.fechaFiltro, this.fechaFiltro], "tipo": "between" },
      { "ref": "status", "valor": estadosAEnviar, "tipo": "in" }
  ];

  // Solo agregar el filtro de "plates" si selectedActivoId no es null
  if (this.selectedActivoId !== null && this.selectedActivoId !== "") {
      condicionesFiltro.push({ "ref": "plates", "valor": this.selectedActivoId });
  }

    
    this.dataService.fetchData(this.fieldMappings, this.selectedLink, {}, {}, this.fieldRelationsJoins,
      condicionesFiltro,{},0,"notificacionTabla")
    .pipe(
        tap(response => {
            this.result = response;
            console.log(this.result);
            
            this.notifications = this.result.body.flat()
        .map((item: any) => Array.isArray(item) && item.length > 0 ? item[0] : item)
        .filter((item: any) => this.matchesSearchTerm(item));
  
        }),
        catchError(error => {
            console.log('Error en la solicitud:', error);
            return throwError(() => error);
        })
    ).subscribe();
  }

  private matchesSearchTerm(item: any): boolean {
    if (!this.searchTerm) return true;
    
    const searchLower = this.searchTerm.toLowerCase();
    return (
      item.plates?.toLowerCase().includes(searchLower) ||
      item.title?.toLowerCase().includes(searchLower) ||
      item.message?.toLowerCase().includes(searchLower) ||
      // Agrega más campos según sea necesario
      false
    );
  }

  limpiarFiltros() {
    this.searchTerm = '';
    this.selectedEstadoId = null;
    this.selectedActivoId = null;
    this.fechaFiltro = null;
    this.searchTerm ="";
  }


  showDialog(id: number) {
    this.visible = true;

    console.log(id);

    this.dataService.fetchData(this.fieldMappings, this.selectedLink, {}, {}, this.fieldRelationsJoins, [{ "ref": "id", "valor": id },{ "ref": "customerId", "valor": this.idCustomer },
      {"ref":"createdAt","valor":[this.fechaFiltro,this.fechaFiltro],"tipo":"between"}],{},0,"notificacionTabla")
    .pipe(
        tap(response => {
            this.result = response;
           
            this.notificationsModal = this.result.body.flat()[0];

            console.log("resultado", this.notificationsModal);
        }),
        catchError(error => {
            console.log('Error en la solicitud:', error);
            return throwError(() => error);
        })
    ).subscribe();
    
}

eliminar(event: Event,id: number) {
  console.log("id",id);
  
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Quieres eliminar este registro?',
      header: 'Eliminar notificación',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
       
        this.dataService.fetchDataDelete({}, this.selectedLink, {}, {"id" : id}, {},{},)
        .pipe(
            tap(response => {
              this.messageService.add({ severity: 'success', summary: 'Exito !!!', detail: 'Registro eliminado' });
                console.log("eliminado",id,response);
                this.listarNotificaciones();
                
            }),
            catchError(error => {
                console.log('Error en la solicitud:', error);
                return throwError(() => error);
            })
        ).subscribe();
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'El registro no se ha eliminado' });
      }
    });
  }


  marcarTodoComoLeido() {
    console.log('Marcar todo como leido');
    
    this.confirmationService.confirm({
      message: '¿Quieres marcar todo como leído?',
      header: 'Marcar como leído',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-success p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
     
    
        this.dataService.fetchDataEdit({}, this.selectedLink, {}, {}, {}, [{ "ref": "customerId", "valor": this.idCustomer }],{"status": 1} )
        .pipe(
            tap(response => {
             
                console.log("eliminado",this.idCustomer,response);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Todos los registros se han leído' });
                this.listarNotificaciones();
                
            }),
            catchError(error => {
                console.log('Error en la solicitud:', error);
                return throwError(() => error);
            })
        ).subscribe();
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'No se ha marcado nada como leído' });
      }
    });
  
  }

  eliminarTodo() {
    console.log('Eliminar todo');
    
    this.confirmationService.confirm({
      message: '¿Quieres elimianr todo?',
      header: 'Eliminar notificaciones',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-success p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        
        this.dataService.fetchDataDelete({}, this.selectedLink, {}, {}, {}, [{ "ref": "customerId", "valor": this.idCustomer }] )
        .pipe(
            tap(response => {
             
                console.log("eliminado",this.idCustomer,response);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se han eliminado con éxito' });
                this.listarNotificaciones();
                
            }),
            catchError(error => {
                console.log('Error en la solicitud:', error);
                return throwError(() => error);
            })
        ).subscribe();
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'No se han eliminado las notificaciones' });
      }
    });
  }

  EstadoMensaje(id: number, status: number) {
    console.log("valores", id, status);
    
    if (status === 0) {
      
      this.dataService.fetchDataEdit({}, this.selectedLink, {}, {"id" : id}, {}, {},{"status": 1} )
        .pipe(
            tap(response => {
          
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La notificacion ha sido leida con éxito' });
                this.listarNotificaciones();
                
            }),
            catchError(error => {
                console.log('Error en la solicitud:', error);
                return throwError(() => error);
            })
        ).subscribe();
        
       
    }

}
}





