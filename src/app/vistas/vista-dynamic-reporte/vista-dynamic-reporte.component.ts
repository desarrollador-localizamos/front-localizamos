import { Component, computed, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { PieChartComponent } from "../../shared/components/charts/pie-chart/pie-chart.component";
import { BarChartComponent } from "../../shared/components/charts/bar-chart/bar-chart.component";
import { SelectAvanzadoComponent, data } from "../../shared/components/inputs/select/select-avanzado/select-avanzado.component";
import { TableSencillaComponent } from "../../shared/components/tables/table-sencilla/table-sencilla.component";
import { MultiSelectComponent} from "../../shared/components/inputs/select/multi-select/multi-select.component";
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { DataSimpleService } from '../../core/services/datasimple.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/interfaces';
import {NgIf} from '@angular/common'

interface EstructuraData {
  id: number;
  [key: string]: any;
}


@Component({
    selector: 'app-vista-dynamic-reporte',
    standalone: true,
    templateUrl: './vista-dynamic-reporte.component.html',
    styleUrl: './vista-dynamic-reporte.component.scss',
    imports: [DividerModule, PanelModule, SelectAvanzadoComponent, TableSencillaComponent, MultiSelectComponent, CalendarModule,FormsModule, PieChartComponent, BarChartComponent ]
})
export class VistaDynamicReporteComponent implements OnInit {
  protected datos: data[]=[];
  private res:any[]=[];
  protected opciones= {reportes:this.datos,rangos:this.datos,clientes: this.datos,grupos:this.datos,activos:this.datos,eventos:this.datos}
  protected result = {reportes: "",rangos:this.res,clientes: this.res,grupos:this.res,activos:this.res,eventos:this.res}
  protected validar: boolean[]=[false,false,false,false,false,false]; // valida la visibilidad de cada selector
  protected rangeDates!: Date[];

  private user:User={"id":1,"email":"a@l"}; // debe llamarse por variable computada desde el componente de login pero sin hacer publica la variable por encapsulacion
  private condicions: any={"tiporeporte":"","idCustomer":this.user.id,"idGroup":[]};
  private fecha: Date= new Date(); //puede ser local
   
  private cabeceras:any={Entities: {},Fields: {}, Relations: {},Joins: {},Multiconditions:{},Servicios:{}};

  protected tipoDeGrafico: string = '';
  // customer id movitram 779

  constructor(private dataService: DataSimpleService){
      
  }

  ngOnInit() {

    this.opciones.reportes = [
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

    this.opciones.rangos= [
      { name: 'Hoy', icon: 'pi-clock', value: 1 },
      { name: 'Ayer', icon: 'pi-clock ', value: 2  },
      { name: 'Personalizado', icon: 'pi-clock', value: 3  },
    ]

    this.cabeceras.Fields = {
      EventTypes:[
        {campo:"id", texto: "id" },
        {campo:"name", texto: "campo" },
      ],
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
      
      'Reporte general': [
        {"campo":"MobileUnities.plate","texto":"Placa","sortable":true,"filter":true},
        {"campo":"cantidad","texto":"", "id": "Cantidad","sortable":true,"filter":true},
        {"campo":"porcentaje","texto":"", "id": "Porcentaje","sortable":true,"filter":true}
       ],
      'Reporte horas trabajadas': [
        {"campo":"id","texto":"id","sortable":true,"filter":true},
        {"campo":"start","texto":"Cliente","sortable":true,"filter":true},
        {"campo":"MobileUnities.plate","texto":"\tActivos móviles","sortable":true,"filter":true}
      ],
      'Reporte kilometros recorridos': [
        {"campo":"MobileUnities.plate","texto":"Placa","sortable":true,"filter":true},
        {"campo":"km","texto":"Kilometros recorridos","sortable":true,"filter":true},
        {"campo":"MobileUnities.milesXGallon","texto":"Frenado Brusco","sortable":true,"filter":true}
      ],
      'Reporte de velocidad promedio': [
        {"campo":"MobileUnities.plate","texto":"Placa","sortable":true,"filter":true},
        {"campo":"velocity","texto":"Velocidad promedio","sortable":true,"filter":true},
        {"campo":"rank1","texto":"Menos de 64 km/h","sortable":true,"filter":true},
        {"campo":"rank2","texto":"65 km/h - 79 km/h","sortable":false,"filter":true},
        {"campo":"rank3","texto":"80km/h en adelante","sortable":true,"filter":true}
      ],
      // 'Reporte geocercas': [],
      // 'Reporte de mantenimiento': [],
      // 'Reporte gerencial': [],
      // 'Reporte de certificado': [],
      // 'Reporte horas reposo': [],
      // 'Reporte de temperatura': [],
      // 'Reporte de conductores': [],
      'Reporte preoperacional': [
        {"campo":"MobileUnities.plate","texto":"Placa","sortable":true,"filter":true},
        {"campo":"resultDate","texto":"", "id": "Fecha","sortable":true,"filter":true},
        {"campo":"Customers.fullName","texto":"Realizado por","sortable":false,"filter":true},
        {"campo":"status","texto":"Estado","sortable":false,"filter":true}
      ],
      'Reporte hábitos de conducción': [
        {"campo":"MobileUnities.plate","texto":"Placa","sortable":true,"filter":true},
        {"campo":"aceleracionBrusca","texto":"Aceleración brusca","sortable":true,"filter":true},
        {"campo":"frenadoBrusco","texto":"Frenado Brusco","sortable":true,"filter":true},
        {"campo":"excesoVelocidad","texto":"Exceso de velocidad","sortable":true,"filter":true},
        {"campo":"eventTypeId","texto":"","sortable":true,"filter":true}
      ],
      'Reporte de gasolina': [{"campo":"plate","texto":"Placa","sortable":true,"filter":true},
        {"campo":"date","texto":"Fecha","sortable":true,"filter":true},
        {"campo":"price","texto":"Precio","sortable":true,"filter":true},
        {"campo":"carMileage","texto":"Kilometraje","sortable":false,"filter":true},
        {"campo":"fuelQuantity","texto":"Galones recargados","sortable":true,"filter":true},
        {"campo":"resultgal","texto":"Galones consumidos","sortable":true,"filter":true},
        {"campo":"resultkm","texto":"Kilometros recorridos","sortable":true,"filter":true},
        {"campo":"rendimiento","texto":"Rendimiento","sortable":true,"filter":true}
      ],
    }; 
    
    this.cabeceras.Entities= {
      'EventTypes':'EventTypes',
      'Customers':"Customers",
      'MobileUnityGroups':"MobileUnityGroups",
      'MobileUnityGroupunity':"MobileUnityGroupunity",
      'Devices':"Devices",
      'Reporte general': "MobileUnityEvents",
      'Reporte horas trabajadas': "Works",
      'Reporte kilometros recorridos': "Works",
      'Reporte de velocidad promedio': "MobileUnityEvents",
      // 'Reporte geocercas': "",
      // 'Reporte de mantenimiento': "",
      // 'Reporte gerencial': "",
      // 'Reporte de certificado': "",
      // 'Reporte horas reposo': "",
      // 'Reporte de temperatura': "",
      // 'Reporte de conductores': "",
      'Reporte preoperacional': "Preoperacional",
      'Reporte hábitos de conducción': "MobileUnityEvents",
      'Reporte de gasolina': "FuelConsumption",
    };
    
    this.cabeceras.Relations= {
      Customers: [],
      Devices: [
        "mobileUnities"
       ],
       MobileUnityGroups: [
       "customer"
       ],
       MobileUnityGroupunity: [
         "unity"
       ],
      'Reporte general': [],
      'Reporte horas trabajadas': [],
      'Reporte kilometros recorridos': [],
      'Reporte de velocidad promedio': [],
      // 'Reporte geocercas': [],
      // 'Reporte de mantenimiento': [],
      // 'Reporte gerencial': [],
      // 'Reporte de certificado': [],
      // 'Reporte horas reposo': [],
      // 'Reporte de temperatura': [],
      // 'Reporte de conductores': [],
      'Reporte preoperacional': [],
      'Reporte hábitos de conducción': [],
      'Reporte de gasolina': [],
    }

    this.cabeceras.Joins= {
      'Customers':[],
      'MobileUnityGroups':[],
      'MobileUnityGroupunity':[],
      'Devices':[],
      'Reporte general': [
        {"mainkey":"unityId", "join":"MobileUnities","joinkey":"id"}
      ],
      'Reporte kilometros recorridos': [
        { "mainkey": "unityId", "join": "MobileUnities", "joinkey": "id" }
      ],
      'Reporte de velocidad promedio': [
        {"mainkey":"unityId", "join":"MobileUnities","joinkey":"id"}
      ],
      // 'Reporte geocercas': [],
      // 'Reporte de mantenimiento': [],
      // 'Reporte gerencial': [],
      // 'Reporte de certificado': [],
      // 'Reporte horas reposo': [],
      // 'Reporte de temperatura': [],
      // 'Reporte de conductores': [],
      'Reporte preoperacional': [
        {"mainkey":"customer", "join":"Customers","joinkey":"id"},
        {"mainkey":"unityId", "join":"MobileUnities","joinkey":"id"}
      ],
      'Reporte hábitos de conducción': [
        { "mainkey": "unityId", "join": "MobileUnities", "joinkey": "id" }
      ],
      'Reporte de gasolina': [
        {"mainkey":"customer", "join":"Customers","joinkey":"id"},
        {"mainkey":"unityId", "join":"MobileUnities","joinkey":"id"}
      ],
    }

    this.cabeceras.Multiconditions= {
      'MobileUnityGroups':[{"ref":"customerId","valor": []}],
      'MobileUnityGroupunity':[{"ref":"groupId","valor": [],"tipo":"in" }],
      'Devices':[{"ref":"customerId","valor": []}],
      'Reporte general': [
        {"ref":"unityId","valor":[1185,4704],"tipo":"in"},
        {"ref":"deviceDateHour","valor":["2024-06-01","2024-06-02"],"tipo":"between"},
        {"ref":"eventTypeId","valor": 6},
      ],
      'Reporte horas trabajadas': [
        { "ref": "unityId", "valor": [4704], "tipo" : "in"},
        {"ref":"start","valor":["2024-06-07","2024-06-13"],"tipo":"between"}
      ],
      'Reporte kilometros recorridos': [
        {"ref": "unityId", "valor": [4704,4737], "tipo" : "in"},
        {"ref":"start","valor":["2024-05-06","2024-06-13"],"tipo":"between"},
        {"ref":"type","valor":1},
      ],
      'Reporte de velocidad promedio': [
        {"ref": "unityId", "valor" : [4704], "tipo" : "in"},
        {"ref":"deviceDateHour","valor":["2024-06-01","2024-06-06"],"tipo":"between"}
      ],
      // 'Reporte geocercas': [],
      // 'Reporte de mantenimiento': [],
      // 'Reporte gerencial': [],
      // 'Reporte de certificado': [],
      // 'Reporte horas reposo': [],
      // 'Reporte de temperatura': [],
      // 'Reporte de conductores': [],
      'Reporte preoperacional': [
        {"ref":"unityId","valor":[5535,5540],"tipo":"in"},
        {"ref":"resultDate","valor":["2024-06-11","2024-06-12"],"tipo":"between"},
      ],
      'Reporte hábitos de conducción': [
        { "ref": "unityId", "valor": [4551,4269], "tipo" : "in"},
        {"ref":"deviceDateHour","valor":["2024-06-01","2024-06-01"],"tipo":"between"},
        { "ref": "eventTypeId", "valor": [6, 59, 7], "tipo" : "in"} 
      ],
      'Reporte de gasolina': [
        { "ref": "unityId", "valor": [4551,4269], "tipo" : "in"},
        {"ref":"deviceDateHour","valor":["2024-06-01","2024-06-01"],"tipo":"between"},
        { "ref": "eventTypeId", "valor": [6, 59, 7], "tipo" : "in"} 
      ],
    }

    this.cabeceras.Servicios= {
      'EventTypes':'visor',
      'Customers':'visor',
      'MobileUnityGroups':'visor',
      'MobileUnityGroupunity':'visor',
      'Devices':'visor',
      'Reporte general': 'report-general',      
      'Reporte horas trabajadas': 'report-hours-worked',
      'Reporte kilometros recorridos': 'report-km-traveled',
      'Reporte de velocidad promedio': 'report-velocity-aver',
      // 'Reporte geocercas': '',
      // 'Reporte de mantenimiento': '',
      // 'Reporte gerencial': '',
      // 'Reporte de certificado': 'pdf/report-certificate',
      // 'Reporte horas reposo': '',
      // 'Reporte de temperatura': '',
      // 'Reporte de conductores': '',
      'Reporte preoperacional': 'report-preoperacional',
      'Reporte hábitos de conducción': 'report-hc',
      'Reporte de gasolina': 'report-fuel-consuption'
    }

  }
 
  protected async consultas(entidad:string,datos?:any) : Promise<void> {
    switch (entidad){
      case 'reportes':
        if(datos)
          this.result.reportes= datos['name'];
        if(this.result.reportes=="Reporte general"){        
          this.validar[5]=true;
          await this.consultaback('EventTypes',"simple","name","id",{"name":'ASC'}).toPromise();
          this.opciones.eventos=this.datos;           
        }
        else
          this.validar[5]=false;
        if(this.condicions.idCustomer==1){
          await this.consultaback('Customers',"simple","fullName").toPromise();
          this.opciones.clientes=this.datos; 
          this.validar[0]=true;
          this.validar[2]=true;
        }
        else{
          await this.validagrupos();
        }
      break;

      case'EventTypes':
        if(datos)
          this.result.eventos= datos['id'];
      break;

      case 'Customers':        
        if(datos)
        {
          this.validar=[true,false,false,false,false,this.validar[5]];
          this.result.clientes= [datos['id']];
          await this.validagrupos();
         }
      break;
      case 'MobileUnityGroups':
        if(datos)
        {
          this.validar=[true,true,true,false,false];
          await this.obtenervalor(datos); //obtiene el array de las condiciones
          await this.validaractivos(this.res);
        }
      break;

      case 'Devices':
        if(datos){
        this.validar[3]=true;
        console.log("datos para array activos", datos);
        await this.obtenervalor(datos); //obtiene el array de las condiciones
        this.result.activos=this.res;
        console.log("resultado de array activos", this.res);
        }
      break;

      case 'rangos':
        if(datos){
          switch(datos.value){
            case 1:
              this.result.rangos=[this.fecha.toISOString().split('T')[0],this.fecha.toISOString().split('T')[0]]
              console.log("fechas a consultar        ", this.result.rangos);
            break;
            case 2:
              this.fecha.setDate(this.fecha.getDate() - 1);
              this.result.rangos=[this.fecha.toISOString().split('T')[0],this.fecha.toISOString().split('T')[0]]
              console.log("fechas a consultar        ", this.result.rangos);
            break;
            case 3:
              console.log("cambia estado", datos.value);
              this.validar[4] = true;
            break;
          }
        }
      break;

      case 'calendario':
        console.log("rangos        ", this.rangeDates);
        if(this.rangeDates[1]==null){
          this.result.rangos=[this.rangeDates[0].toISOString().split('T')[0],this.rangeDates[0].toISOString().split('T')[0]];
          console.log("fechas a consultar        ", this.result.rangos);
        }
        else{
          this.result.rangos=[this.rangeDates[0].toISOString().split('T')[0],this.rangeDates[1].toISOString().split('T')[0]];
          console.log("fechas a consultar        ", this.result.rangos);
        }
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

  private async validagrupos(): Promise<any>{
    this.opciones.grupos=[];
    this.cabeceras.Multiconditions['MobileUnityGroups'][0]['valor']= this.result.clientes;
    await this.consultaback('MobileUnityGroups',"multi","name").toPromise();
    this.opciones.grupos=this.datos;        
    if(this.opciones.grupos.length==0){
      console.log("grupos", this.opciones.grupos.length);
      await this.validaractivos(this.result.clientes);
      this.validar[2]=true;
      this.validar[1]=false;
      this.validar[3]=false;
      return true;
    }
    else{
      this.validar[1]=true;
      this.validar[2]=false;
      this.validar[3]=false;
    }
  }

  private async obtenervalor(datos: any[]): Promise<any>{
    this.res=[]; 
    datos.forEach(item => {
      this.res = [...this.res,item.id];
    });
  }

  private async validaractivos(datos: any[]): Promise<any>{
    if(datos==this.result.clientes){
      this.cabeceras.Multiconditions['Devices'][0]['valor']= datos;
      await this.consultaback('Devices',"multi","mobileUnitiesplate","mobileUnitiesid").toPromise();
    }
    else{
      this.cabeceras.Multiconditions['MobileUnityGroupunity'][0]['valor']= datos;
      await this.consultaback('MobileUnityGroupunity',"multi","unityplate","unityid").toPromise();
    }
    this.opciones.activos=this.datos;
    console.log("resultado activos", this.datos);
    
  }


  protected async seleccionarGrafico(tipo: string) {
    try{
      this.cabeceras.Multiconditions[this.result.reportes][0]['valor']=this.result.activos;
      this.cabeceras.Multiconditions[this.result.reportes][1]['valor']=this.result.rangos;
      this.cabeceras.Multiconditions[this.result.reportes][2]['valor']=this.result.eventos;
    }
    catch{}
    await this.consultaback(this.result.reportes,"report").toPromise();
    console.log("consulta reporte   ",  this.res );
    
    this.tipoDeGrafico = tipo;
    // this.consultadatos();
  }
  
}