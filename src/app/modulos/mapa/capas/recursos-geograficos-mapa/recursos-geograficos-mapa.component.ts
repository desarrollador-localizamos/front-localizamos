import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { DataService } from '../../../../core/services/data.service';
import { Observable, Subscription, catchError, tap, throwError } from 'rxjs';
import { SelectAvanzadoComponent, data } from '../../../../shared/components/inputs/select/select-avanzado/select-avanzado.component';
import { User } from '../../../../core/interfaces/user.interface';
import { DataSimpleService } from '../../../../core/services/datasimple.service';
@Component({
  selector: 'app-recursos-geograficos-mapa',
  standalone: true,
  imports: [ToastModule, ButtonModule, RippleModule,InputSwitchModule, SelectAvanzadoComponent, ButtonGroupModule, FormsModule, DropdownModule, InputTextModule, ColorPickerModule, ButtonModule, DividerModule],
  templateUrl: './recursos-geograficos-mapa.component.html',
  styleUrls: ['./recursos-geograficos-mapa.component.scss'],
  providers: [MessageService]
})
export class RecursosGeograficosMapaComponent implements AfterViewInit {

  @ViewChild('clienteSelect') clienteSelect!: SelectAvanzadoComponent;
  protected isPanelVisible: boolean = true;
  protected bannerVisible: boolean = false;

  protected clienteSeleccionado: any;
  protected tipoSeleccionado: any;
  protected nombre: string = '';
  protected colorSeleccionado: string = '#5686d3';
  protected checkedPrivado: number = 1;
  protected checkedDireccion: number = 1;
  protected checkedEstado: number = 1;

  private subscription: Subscription | undefined;
  protected validar: boolean = true;
  private res: any[] = [];
  protected datos: data[] = [];
  private cabeceras: any = { Entities: {}, Fields: {}, Relations: {}, Joins: {}, Multiconditions: {}, Servicios: {}, DataInsert: {} };
  protected result = { clientes: this.res, }
  protected opciones = { clientes: this.datos }
  private user: User = { "id": 1, "email": "a@l", "customer_id": 1, };
  private condicions: any = { "idCustomer": this.user.customer_id };

  protected tipos: any[];

  private coordinatesSubscription: Subscription | undefined;
  protected geofenceCoordinates: string[] = [];

  constructor(private renderer: Renderer2,
              private el: ElementRef,
              private dataSimpleService: DataSimpleService,private dataService: DataService,private messageService: MessageService) {

    this.tipos = [
      { name: 'Geocercas', id: '1' },
    ];
  }

  ngOnInit() {

    this.coordinatesSubscription = this.dataService.geofenceCoordinates$.subscribe(coordinates => {
      this.geofenceCoordinates = coordinates;
      
    });

    this.checkedPrivado = 1;
    this.checkedDireccion = 1;
    this.checkedEstado = 1;

    if (this.condicions["idCustomer"] == 1) {
      this.validar = true;
    } else {
      this.validar = false;
    }

    this.cabeceras.Fields = {
      Customers: [
        { campo: "id", texto: "value" },
        { campo: "fullName", texto: "campo" },
      ],
    };

    this.cabeceras.Entities = {
      'Customers': "Customers",
      'GeographicalResources': 'GeographicalResources'
    };

    this.cabeceras.Relations = {
      Customers: [],
      GeographicalResources: [],
    }

    this.cabeceras.Joins = {
      'Customers': [],
      'GeographicalResources': []
    }

    this.cabeceras.Multiconditions = {}

    this.cabeceras.Servicios = {
      'Customers': 'Database/visor',
      'GeographicalResources': 'Database/insert'
    }

  }

  ngAfterViewInit() {
    this.subscription = this.dataSimpleService.bannerVisible$.subscribe(visible => {

      if (visible) {
        this.bannerVisible = true;
        this.isPanelVisible = true;
      } else {
        this.bannerVisible = false;
      }
    });
  }
  onClienteSeleccionadoChange(selectedCliente: data) {
    this.clienteSeleccionado = selectedCliente;
  }

  protected async consultas(entidad: string, datos?: any): Promise<void> {
    switch (entidad) {

      case 'Customers':
        if (this.condicions["idCustomer"] == 1) {
          await this.consultaback('Customers', "simple", "fullName", "", {}).toPromise();
          this.opciones.clientes = this.datos;
        }
        break;

      case 'GeographicalResources':

        if(this.condicions["idCustomer"] == 1){
          this.clienteSeleccionado = this.clienteSeleccionado.id;
        
        }else{
          this.clienteSeleccionado = this.condicions["idCustomer"];
         
        }
        console.log("Geofence coordinates updated:", this.geofenceCoordinates[0]);
        const coordinatesString =  this.geofenceCoordinates[0];

        const coordinatesArray = coordinatesString.split(',').map(coord => {
          const [longitude, latitude] = coord.trim().split(' ').map(Number);
          return [longitude, latitude];
        });

          const geoJsonPolygon = {
            type: "Polygon",
            coordinates: [coordinatesArray]
          };
        const dataInsert = {
          name: this.nombre,
          type: this.tipoSeleccionado?.id,
          color: this.colorSeleccionado,
          customerId: this.clienteSeleccionado,
          isPrivate: this.checkedPrivado,
          applyForAddress: this.checkedDireccion,
          status: this.checkedEstado,
          points: this.geofenceCoordinates[0],
          pointsG: geoJsonPolygon
        };

        await this.consultabackInsert('GeographicalResources', dataInsert).toPromise();
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
          console.log("respo", response);
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

  private consultabackInsert(entidad: string, dataInsert?: any): Observable<any> {
    return this.dataSimpleService.Insert(this.cabeceras.Servicios[entidad], this.cabeceras.Entities[entidad], dataInsert)
      .pipe(
        tap(response => {

         this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha creado la geocerca exitosamente' });
          this.limpiar();
        }),
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error)
        }));
  }

  accionBanner() {
    this.isPanelVisible = !this.isPanelVisible;

    const panel = this.el.nativeElement.querySelector('.side-panel');
    const panelSection = this.el.nativeElement.querySelector('.panel-section');
    const panelheader = this.el.nativeElement.querySelector('.panel-header');
    const panelheaderTitle = this.el.nativeElement.querySelector('.panel-header-title');
    const panelheaderButton = this.el.nativeElement.querySelector('.panel-header-button2');

    if (this.isPanelVisible) {
      this.renderer.removeClass(panel, 'cierre');
      this.renderer.removeClass(panelSection, 'cierre');
      this.renderer.removeClass(panelheader, 'cierre');
      this.renderer.removeClass(panelheaderTitle, 'cierre');
      this.renderer.removeClass(panelheaderButton, 'cierre');
    } else {
      this.renderer.addClass(panel, 'cierre');
      this.renderer.addClass(panelSection, 'cierre');
      this.renderer.addClass(panelheader, 'cierre');
      this.renderer.addClass(panelheaderTitle, 'cierre');
      this.renderer.addClass(panelheaderButton, 'cierre');
    }
  }

  protected isFormValid(): boolean {
    return this.nombre && this.tipoSeleccionado && this.colorSeleccionado && this.clienteSeleccionado && this.geofenceCoordinates.length > 0;
  }

  onColorChange(event: any) {
    this.colorSeleccionado = event.value;
    this.dataService.setColor(this.colorSeleccionado);
  }

  protected limpiar(){
    
    this.clienteSeleccionado = null;
    this.tipoSeleccionado = 1;
    this.nombre = '';
    this.colorSeleccionado = '#4e6b99';
    this.checkedPrivado = 1;
    this.checkedDireccion = 1;
    this.checkedEstado = 1;
    this.geofenceCoordinates = [];
    

  if (this.clienteSelect) {
    this.clienteSelect.clear();
  }
    

    this.dataService.triggerMapCleanup();
  }

}

