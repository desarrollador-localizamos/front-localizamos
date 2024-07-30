import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DataService } from '../../../../core/services/data.service';
import { Observable, Subscription, catchError, tap, throwError } from 'rxjs';
import { SelectAvanzadoComponent, data } from '../../../../shared/components/inputs/select/select-avanzado/select-avanzado.component';
import { User } from '../../../../core/interfaces/user.interface';
import { DataSimpleService } from '../../../../core/services/datasimple.service';

@Component({
  selector: 'app-recursos-geograficos-mapa',
  standalone: true,
  imports: [InputSwitchModule,SelectAvanzadoComponent,ButtonGroupModule, FormsModule, DropdownModule, InputTextModule, ColorPickerModule, ButtonModule, DividerModule],
  templateUrl: './recursos-geograficos-mapa.component.html',
  styleUrl: './recursos-geograficos-mapa.component.scss'
})
export class RecursosGeograficosMapaComponent implements AfterViewInit {
  protected isPanelVisible: boolean = true;
  protected bannerVisible: boolean = false;

  protected clienteSeleccionado: any;
  protected tipoSeleccionado: any;
  protected nombre: string = '';
  protected colorSeleccionado: string = '#5686d3';
  protected checkedPrivado: boolean = true;
  protected checkedDireccion: boolean = true;
  protected checkedEstado: boolean = true;

  private subscription: Subscription | undefined;
  protected validar: boolean = true; // valida la visibilidad de cada selector
  private res:any[]=[];
  protected datos: data[]=[];
  private cabeceras:any={Entities: {},Fields: {}, Relations: {},Joins: {},Multiconditions:{},Servicios:{},DataInsert:{}};
  protected result = {clientes: this.res,}
  protected opciones= {clientes: this.datos}
  private user:User={"id":1,"email":"a@l", "customer_id": 1, }; 
  private condicions: any={"idCustomer":this.user.customer_id};

  protected tipos: any[];

  constructor(private renderer: Renderer2,
              private el: ElementRef,
              private dataService: DataSimpleService) {
  
    this.tipos = [
      {name: 'Geocercas', id: '1'},
     
    ];
  }

  ngOnInit() {
    
    if (this.condicions["idCustomer"] == 1) {
      this.validar=true;
    } else {
      this.validar=false;
    }
    
  
    this.cabeceras.Fields = {
      Customers: [
        {campo:"id", texto: "id" },
        {campo:"fullName", texto: "campo" },
      ],
    }; 
    
    this.cabeceras.Entities= {
      'Customers':"Customers",
      'GeographicalResources':'GeographicalResources'

    };
    
    this.cabeceras.Relations= {
      Customers: [],
      GeographicalResources: [],
    }

    this.cabeceras.Joins= {
      'Customers':[],
      'GeographicalResources': []
    }

    this.cabeceras.Multiconditions= {
    }

    this.cabeceras.Servicios= {
     'Customers':'visor',
     'GeographicalResources': 'insert'
    }

  }
 

  ngAfterViewInit() {
    this.subscription = this.dataService.bannerVisible$.subscribe(visible => {

      if (visible) {
        this.bannerVisible = true;
        this.isPanelVisible = true;
      } else {
        this.bannerVisible = false;
      }
    });
  }

  protected async consultas(entidad:string,datos?:any) : Promise<void> {
    switch (entidad){

      case 'Customers':    
      
        if(this.condicions["idCustomer"] == 1){
          await this.consultaback('Customers',"simple","fullName","", {}).toPromise();
          this.opciones.clientes=this.datos; 
  
         }
      break;

      case 'GeographicalResources':    
      
        const dataInsert = {
          id: 50,
          name: this.nombre,
          type: this.tipoSeleccionado?.id ,
          color: this.colorSeleccionado,
          customerId: this.clienteSeleccionado?.id,
          isPrivate: this.checkedPrivado,
          applyForAdress: this.checkedDireccion,
          status: this.checkedEstado,
          points: "coordenadas"
        };
        console.log("data", dataInsert);
        
         // await this.consultabackInsert('GeographicalResources',dataInsert).toPromise();
          this.opciones.clientes=this.datos; 
  
      break;
  
    }
  }

  private consultaback(entidad: string,tipo: string, cabecera?: string,identif?:string, ordenar?: any): Observable<any> {
    console.log("servicio", this.cabeceras.Servicios);
    console.log("entidad", entidad);
    let id="";
    if(identif)
      id=identif;
    else
      id="id";
    return this.dataService.fetchData(this.cabeceras.Servicios[entidad], this.cabeceras.Entities[entidad], 
    this.cabeceras.Fields[entidad],       this.cabeceras.Relations[entidad], {}, 
    this.cabeceras.Joins[entidad], this.cabeceras.Multiconditions[entidad],ordenar)
    .pipe(
      tap(response => {
        console.log("respo", response);
        switch(tipo)
        {
          case "simple":
            this.datos=response.body.map((item: any) => ({
              id: item[`${id}`],
              name: item[`${cabecera}`],
            }));
          break;
          case "multi":
            this.datos=response.body.map((item: any) => ({
              id: item[0][`${id}`],
              name: item[0][`${cabecera}`],
            }));
          break;
          case "report":
            this.datos=response;
          break;
        }
      }),
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError(() => error
      );
    }));
  }

  private consultabackInsert(entidad: string,  dataInsert?: any): Observable<any> {

    return this.dataService.Insert( this.cabeceras.Servicios[entidad],this.cabeceras.Entities[entidad],this.cabeceras.DataInsert[entidad] )
    .pipe(
      tap(response => {
        console.log("respo", response);
       
      }),
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError(() => error
      );
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


}


// {"entityName":"GeographicalResorces",
//   "conditions":[],
//   "relations":[],
//   "joins":[
//     {"id":1},
//     {"name":"name"},{"campo":"type","texto":"tipo"},{"campo":"color","texto":"color"},
//     {"campo":"customerId","texto":"cliente"},{"campo":"isPrivate","texto":"privado"},
//     {"campo":"applyForAdress","texto":"aplicar direccion"},{"campo":"status","texto":"estado"},
//     {"campo":"points","texto":"coordenadas"}]}