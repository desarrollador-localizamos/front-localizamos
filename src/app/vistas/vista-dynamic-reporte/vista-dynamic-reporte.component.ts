import { Component, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { SelectAvanzadoComponent, data } from "../../shared/components/inputs/select/select-avanzado/select-avanzado.component";
import { TableSencillaComponent } from "../../shared/components/tables/table-sencilla/table-sencilla.component";
import { MultiSelectComponent} from "../../shared/components/inputs/select/multi-select/multi-select.component";
import { catchError, tap, throwError } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

interface EstructuraData {
  id: number;
  [key: string]: any;
}

interface EnvioData {
  entityName: string;
  fields: any[];
  relations: any[];
  conditions: any[];
  joins?: any[];
}
interface dataMulti {
  id: number;
  name: string;
}

@Component({
    selector: 'app-vista-dynamic-reporte',
    standalone: true,
    templateUrl: './vista-dynamic-reporte.component.html',
    styleUrl: './vista-dynamic-reporte.component.scss',
    imports: [DividerModule, PanelModule, SelectAvanzadoComponent, TableSencillaComponent, MultiSelectComponent, CalendarModule,FormsModule ]
})
export class VistaDynamicReporteComponent implements OnInit {
  opciones: data[] = [];
  rango: data[] = [];
  seleccionarOpciones: data | undefined;
  filterValue: string = '';

  rangeDates: Date[] | undefined;
  protected auxi: any = {};
  protected selectedLink: string = '';
  protected data: { header: any[], body: EstructuraData[] } = { header: [], body: [] };
  protected result: any = {};
  protected displayedColumns: string[] = [];
  protected body!: EnvioData;
  protected fieldNames: string[] = [];
  protected clientOptions: dataMulti[] = [];
  protected groupOptions: dataMulti[] = [];
  protected activoOptions: dataMulti[] = [];
  protected idCustomer: number[] = [];
  protected idGroup : number ;
  protected idCustomerLogin: number;



  private fieldMappings: { [key: string]: any[] } = {
    Customers: [
      {campo:"id", texto: "id" },
      {campo:"fullName", texto: "campo" },
    ],

    Devices: [
      {campo:"mobileUnities.1id", texto: "id" },
      {campo:"mobileUnities.1plate", texto: "campo" },
      {campo:"customerId", texto: "campo" },
    ],
    MobileUnityGroups: [
      {campo:"id", texto: "id" },
      {campo:"name", texto: "campo" },
    ],

    MobileUnityGroup: [
      {campo:"mobileUnities.1id", texto: "id" },
      {campo:"mobileUnities.1plate", texto: "campo" },
    ],
    
    
  };

  private fieldRelations: { [key: string]: any[] } = {
    
    Devices: [
       "mobileUnities"
      ],
      MobileUnityGroups: [
      "customer"
      ],
      MobileUnityGroup: [
        "mobileUnities"
      ],
  };


// customer id movitram 779

  constructor(private dataService: DataService){
    this.body = {
      entityName : "",
      fields : [],
      relations: [],
      conditions: [],
      joins: []
    }

    this.idCustomerLogin = 779;
    this.idCustomer[0] =  this.idCustomerLogin;

    this.idGroup = 0;
  }

  ngOnInit() {
    this.opciones = [
      { name: 'Reporte general', icon: 'pi-flag', value: 1 },
      { name: 'Reporte horas trabajadas', icon: 'pi-globe ', value: 2  },
      { name: 'Reporte kilometros recorridos', icon: 'pi-map', value: 3  },
      { name: 'Reporte de velocidad promedio', icon: 'pi-compass', value: 4  },
      { name: 'Reporte geocercas', icon: 'pi-map-marker', value: 5  },
      { name: 'Reporte de mantenimiento', icon: 'pi-flag-fill', value: 6  },
      { name: 'Reporte gerencial', icon: 'pi-flag-fill', value: 7  },
      { name: 'Reporte de certificado', icon: 'pi-flag-fill', value: 8  },
      { name: 'Reporte horas reposo', icon: 'pi-flag-fill', value: 9  },
      { name: 'Reporte de temperatura', icon: 'pi-flag-fill', value: 10  },
      { name: 'Reporte de conductores', icon: 'pi-flag-fill', value: 11  },
      { name: 'Reporte preoperacional', icon: 'pi-globe', value: 12  },
      { name: 'Reporte hábitos de conducción', icon: 'pi-flag', value: 13  },
      { name: 'Reporte de gasolina', icon: 'pi-globe', value: 14  },
  
    ];

    this.rango = [
      { name: 'Hoy', icon: 'pi-clock', value: 1 },
      { name: 'Ayer', icon: 'pi-clock ', value: 2  },
      { name: 'Personalizado', icon: 'pi-clock', value: 3  },
    ]

  }

  onCountrySelect(country: data) {
    console.log("seleccion", country);
    this.seleccionarOpciones = country;
  }
  

  protected consultarCliente() {
    this.selectedLink = "Customers";
    
    this.dataService.fetchData(this.fieldMappings, this.selectedLink, {}, {}, {})
      .pipe(
        tap(response => {
          this.result = response;
          console.log("respo", response);
          this.clientOptions = this.result.body.map((item: any) => ({
            id: item.id,
            name: item.fullName
          }));
        
        }),
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error);
        })
      ).subscribe();
  }
  
  onClientSelectionChange(selectedClients: dataMulti[]): void {
    console.log('Selected clients:', selectedClients);
   
    if (selectedClients.length > 0) {
        this.idCustomer = selectedClients.map(client => client.id);
        console.log('Selected clients IDs:', this.idCustomer);
    } else {
        this.idCustomer[0] = this.idCustomerLogin;
    }
}

  protected consultarGrupoCliente() {
    this.selectedLink = "MobileUnityGroups";
    console.log("id del customer en el grupo",this.idCustomer);
    const valor = this.idCustomer[0]
    console.log("id del customer en el grupo2", valor);
    this.dataService.fetchData(this.fieldMappings, this.selectedLink, {} , {"customerId" :valor}, {}, )
      .pipe(
        tap(response => {
          this.result = response;
          console.log("respo", response);
          this.groupOptions = this.result.body.map((item: any) => ({
            id: item.id,
            name: item.name
          }));
        
        }),
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error);
        })
      ).subscribe();
  }
  
  GrupoClientSelectionChange(selectedClients: dataMulti[]) {
    console.log('Selected groups:', selectedClients);
   
    if(selectedClients.length > 0){
      this.idGroup = selectedClients[0]["id"];
    }else{
      this.idGroup = 0;
    }
  }
  
  consultarActivo(){
    

    if(this.idGroup == 0){
      this.selectedLink = "Devices";
      
      this.dataService.fetchData(this.fieldMappings, this.selectedLink, this.fieldRelations,{}, {}, [{ "ref": "customerId", "valor": this.idCustomer }])
      .pipe(
        tap(response => {
          this.result = response;
          this.activoOptions = this.result.body.map((item: any) => ({
            id: item["mobileUnities.1id"],
            name: item["mobileUnities.1plate"]
          }));
        }),
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error);
        })
      ).subscribe();
    }else{
      this.selectedLink = "MobileUnityGroup";
      console.log("entro aca")
      this.dataService.fetchData(this.fieldMappings, this.selectedLink, this.fieldRelations, {"GroupId": this.idGroup }, {}, {})
      .pipe(
        tap(response => {
          this.result = response;
          this.activoOptions = this.result.body.map((item: any) => ({
            id: item["mobileUnities.1id"],
            name: item["mobileUnities.1plate"]
          }));
        }),
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error);
        })
      ).subscribe();
    }
   
  }

  onActivoSelectionChange(selectedActivo: dataMulti[]) {
    console.log('Selected clients:', selectedActivo);
   // this.resultActivo = selectedActivo;
   
  }

  rangoTiempo(country: data){
    console.log("seleccion", country);
    this.seleccionarOpciones = country;
  }


  private fetchData() {
    const conditions: any[] = ["", "como estas", 123, true];

    this.dataService.fetchData(this.fieldMappings, this.selectedLink, this.fieldRelations, conditions, {})
      .pipe(
        tap(response => {
          this.result = response;
          // llena la variable fieldNames con los nombres de los campos
          if (this.result.header && Array.isArray(this.result.header)) {
            this.fieldNames = this.result.header.map((item: any) => item.campo);
          }
        }), 
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error);
        })
      ).subscribe();
  }
  
}