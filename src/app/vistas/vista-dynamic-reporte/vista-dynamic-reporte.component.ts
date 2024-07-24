import { Component, computed, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { SelectAvanzadoComponent, data } from "../../shared/components/inputs/select/select-avanzado/select-avanzado.component";
import { TableSencillaComponent } from "../../shared/components/tables/table-sencilla/table-sencilla.component";
import { MultiSelectComponent} from "../../shared/components/inputs/select/multi-select/multi-select.component";
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/interfaces';
import {NgIf} from '@angular/common'

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
  seleccionarOpciones!: data;
  seleccionarFechas: any [] | undefined;
  filterValue: string = '';
  

  rangeDates!: Date[];
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
  protected idGroup : any[]=[] ;
  protected idCustomerLogin: number;
  protected resultActivo: any[]=[];
  protected validar: boolean[]=[false,false,false,false,false];
  protected fecha: Date= new Date();
  protected user:User={"id":1,"email":"a@l"}; // debe llamarse por variable computada desde el componente de login pero sin hacer publica la variable por encapsulacion
  
  



  private fieldMappings: { [key: string]: any[] } = {
    Customers: [
      {campo:"id", texto: "id" },
      {campo:"fullName", texto: "campo" },
    ],

    Devices: [
      {campo:"mobileUnities.id", texto: "id" },
      {campo:"mobileUnities.plate", texto: "campo" },
      {campo:"customerId", texto: "campo" },
    ],
    MobileUnityGroups: [
      {campo:"id", texto: "id" },
      {campo:"name", texto: "campo" },
    ],

    MobileUnityGroupunity: [
      {campo:"unity.id", texto: "id" },
      {campo:"unity.plate", texto: "campo" },
    ],
    
    
  };

  private fieldRelations: { [key: string]: any[] } = {
    
    Devices: [
       "mobileUnities"
      ],
      MobileUnityGroups: [
      "customer"
      ],
      MobileUnityGroupunity: [
        "unity"
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

    this.idGroup = [];
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

  async onCountrySelect(country: data): Promise<void>  {
    this.validar=[false,false,false,false,false];
    this.groupOptions=[]; //inicializa el vector de grupos
    this.activoOptions=[];//inicializa el vector de activos
    this.idGroup = [];
    console.log("seleccion", country);
    this.seleccionarOpciones = country;
    //*************************************************aqui falta hacer la validacion para el cliente localizamos
    // y activar la opcion de cliente sino asignar directamente el id del cliente logeado */
    if(this.user.id==1)
      this.validar[0]=true;
    else{
      this.validar[0]=false;
      this.idCustomer=[this.user.id];
      await this.consultarGrupoCliente().toPromise();
      if(this.groupOptions.length==0){
        this.validar[2]=true;
      }
      else{
        this.validar[1]=true;
    }
    }
  }
  

  protected consultarCliente() {
    this.selectedLink = "Customers";
    if(this.clientOptions.length==0) //realiza la consulta solo por primera vez
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
  
  async onClientSelectionChange(selectedClients: dataMulti[]): Promise<void> {
    console.log('Selected clients:', selectedClients);
    if (selectedClients.length > 0) {
        this.idCustomer = selectedClients.map(client => client.id);
        console.log('Selected clients IDs:', this.idCustomer);
    } else {
        this.idCustomer[0] = this.idCustomerLogin;
    }

    await this.consultarGrupoCliente().toPromise(); //evaua si hay grupo spara ese cliente para activar el selector de grupos
      if(this.groupOptions.length==0){
        this.validar[2]=true;
      }
      else{
        this.validar[1]=true;
        this.idGroup=[];
    }
}
  //seleccion del cliente
  protected consultarGrupoCliente(): Observable<any> {
    this.selectedLink = "MobileUnityGroups";
    console.log("id del customer en el grupo",this.idCustomer);
    const valor = this.idCustomer[0]
    console.log("id del customer en el grupo2", valor);
    if (this.groupOptions.length == 0) {
      return this.dataService.fetchData(this.fieldMappings, this.selectedLink, {}, {"customerId": valor}, {})
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
        );
    } else {
      return of(null); // Retorna un Observable que emite null si groupOptions ya tiene elementos
    }
  }

  //seleccion grupos del cliente
  GrupoClientSelectionChange(selectedClients: dataMulti[]) {
    this.validar=[true,true,false,false,false];
    console.log('Selected groups:', selectedClients);
    this.idGroup = [];
    if(selectedClients.length > 0){
      selectedClients.forEach(client => {
        this.idGroup = [...this.idGroup,client.id];
      console.log("this.idGroup",     this.idGroup)
      this.validar[2]=true;
      });
    }else{
      this.idGroup = [];
      this.validar[2]=false;
    }
  }
  
  consultarActivo(){
    console.log("activo grupo?   ",this.idGroup.length);
    
    if(this.idGroup.length==0){
      this.selectedLink = "Devices";
      this.dataService.fetchData(this.fieldMappings, this.selectedLink, this.fieldRelations,{}, {}, [{ "ref": "customerId", "valor": this.idCustomer }])
      .pipe(
        tap(response => {
          this.result = response;
          this.activoOptions = this.result.body.map((item: any) => ({
            id: item[0]["mobileUnitiesid"],
            name: item[0]["mobileUnitiesplate"]
          }));
        }),
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error);
        })
      ).subscribe();
    }else{
      this.selectedLink = "MobileUnityGroupunity";
      //console.log("entro aca")
      this.dataService.fetchData(this.fieldMappings, this.selectedLink, this.fieldRelations,  {},{}, [{ "ref": "groupId", "valor": this.idGroup,"tipo":"in" }])
      .pipe(
        tap(response => {
          this.result = response;
          console.log("this.result",    this.result)
          this.activoOptions = this.result.body.map((item: any) => ({
            id: item[0]["unityid"],
            name: item[0]["unityplate"]
          }));
        }),
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error);
        })
      ).subscribe();
    }
   
  }

  //seleccion activos a consultar
  onActivoSelectionChange(selectedActivo: dataMulti[]) {
    this.validar[3]=true;
    this.resultActivo=[];
    console.log('Selected mobile unities:', selectedActivo);

    selectedActivo.forEach(activo => {
      this.resultActivo=[...this.resultActivo,activo.id];
    });
    console.log('Array mobile unities:', this.resultActivo);
  }

  rangoTiempo(rangotiempo: data){
    console.log("seleccion", rangotiempo);
    // Lógica para determinar si se debe mostrar el calendario
    switch(rangotiempo.value){
      case 1:
        this.seleccionarFechas=[this.fecha.toISOString().split('T')[0],this.fecha.toISOString().split('T')[0]]
        console.log("fechas a consultar        ", this.seleccionarFechas);
      break;
      case 2:
        this.fecha.setDate(this.fecha.getDate() - 1);
        this.seleccionarFechas=[this.fecha.toISOString().split('T')[0],this.fecha.toISOString().split('T')[0]]
        console.log("fechas a consultar        ", this.seleccionarFechas);
      break;
      case 3:
        console.log("cambia estado", rangotiempo.value);
        this.validar[4] = true;
      break;
    }

  }

  calendardate(){
    console.log("rangos        ", this.rangeDates);
    if(this.rangeDates[1]==null){
      this.seleccionarFechas=[this.rangeDates[0].toISOString().split('T')[0],this.rangeDates[0].toISOString().split('T')[0]];
      console.log("fechas a consultar        ", this.seleccionarFechas);
    }
    else{
      this.seleccionarFechas=[this.rangeDates[0].toISOString().split('T')[0],this.rangeDates[1].toISOString().split('T')[0]];
      console.log("fechas a consultar        ", this.seleccionarFechas);
    }
  }

  private consultadatos() {
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