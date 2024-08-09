import { Component, computed, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { PieChartComponent } from "../../shared/components/charts/pie-chart/pie-chart.component";
import { BarChartComponent } from "../../shared/components/charts/bar-chart/bar-chart.component";
import { SelectAvanzadoComponent, data } from "../../shared/components/inputs/select/select-avanzado/select-avanzado.component";
import { TableSencillaComponent } from "../../shared/components/tables/table-sencilla/table-sencilla.component";
import { MultiSelectComponent} from "../../shared/components/inputs/select/multi-select/multi-select.component";
import { catchError, Observable, tap, throwError } from 'rxjs';
import { DataSimpleService } from '../../core/services/datasimple.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/interfaces';
import { CONSTANS } from "../../core/constants/vista-dynamic-reporte/constantes";
import { Entities } from "../../core/constants/globalEntities/globalEntities";


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
  protected opciones= {reportes:this.datos,rangos:this.datos,clientes: this.datos,grupos:this.datos,activos:this.datos,eventos:this.datos,repgerencial:this.datos,geocercas:this.datos,mantenimiento:this.datos,gasolina:this.datos}
  protected result = {reportes: "",rangos:this.res,clientes: this.res,grupos:this.res,activos:this.res,eventos:this.res,repgerencial:this.res,geocercas:this.res,mantenimiento:this.res,gasolina:this.res}
  protected validar: boolean[]=[false,false,false,false,false,false,false,false,false,false]; // valida la visibilidad de cada selector
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

    this.opciones.repgerencial = [
      { name: 'Reporte general', icon: 'pi-flag', value: 1 },
      { name: 'Reporte horas trabajadas', icon: 'pi-globe ', value: 2  },
      { name: 'Reporte kilometros recorridos', icon: 'pi-map', value: 3  },
      { name: 'Reporte de velocidad promedio', icon: 'pi-compass', value: 4  },
      { name: 'Reporte geocercas', icon: 'pi-map-marker', value: 5  },
      { name: 'Reporte de mantenimiento', icon: 'pi-flag-fill', value: 6  },
      { name: 'Reporte horas reposo', icon: 'pi-flag-fill', value: 7  },
      { name: 'Reporte preoperacional', icon: 'pi-globe', value: 8  },
      { name: 'Reporte de gasolina', icon: 'pi-globe', value: 9  },
    ];

    this.opciones.mantenimiento= [
      { name: 'Vencimiento SOAT', value: 1 },
      { name: 'Kilometraje actual', value: 2  },
      { name: 'KMs cambio de aceite', value: 3  },
      { name: 'Vencimiento impuestos', value: 4  },
      { name: 'Vencimiento Tecno Mecánica', value: 5  },
      { name: 'Vencimiento de licencia', value: 6  },
    ]

    this.opciones.gasolina= [
      { name: 'Galones consumidos', value: 1},  
      { name: 'Rendimiento',  value: 2  },
    ]
    
    this.cabeceras.Fields = CONSTANS.Fields;
    this.cabeceras.Entities = Entities; 
    this.cabeceras.Relations = CONSTANS.Relations; 
    this.cabeceras.Joins = CONSTANS.Joins; 
    this.cabeceras.Multiconditions = CONSTANS.Multiconditions 
    this.cabeceras.Servicios = CONSTANS.Servicios; 
    console.log('cabeceras ',this.cabeceras);
    
  }
 
  protected async consultas(entidad:string,datos?:any) : Promise<void> {
    switch (entidad){
      case 'reportes':
        if(datos){
          this.result.reportes= datos['name'];
          switch(datos['value']){
            case 1:      
            this.validar=[this.validar[0],this.validar[1],this.validar[2],this.validar[3],this.validar[4],true,false,false,false,false]
              await this.consultaback('EventTypes',"simple","name","id",{"name":'ASC'}).toPromise();
              this.opciones.eventos=this.datos; 
            break;
            case 7:
              this.validar=[this.validar[0],this.validar[1],this.validar[2],this.validar[3],this.validar[4],false,true,false,false,false]
            break;

            default:
              this.validar=[this.validar[0],this.validar[1],this.validar[2],this.validar[3],this.validar[4],false,false,false,false,false]
            break;
          }
          
          if(this.condicions.idCustomer==1){
            if(this.opciones.clientes.length==0){
              await this.consultaback('Customers',"simple","fullName").toPromise();
              this.opciones.clientes=this.datos; 
            }
            this.validar[0]=true;
            this.validar[2]=true;
          }
          else{
            await this.validagrupos();
          }
        }
      break;

      case 'repgerencial':
        let resul: any[]=[];
        this.validar[10]=false;
        if(datos){
          this.res=[];
          await Promise.all(this.datos.map(async (rep)=>{
            console.log("rep", datos);
            
            switch(rep.value){
              case 1:      
                this.validar[5]=true;
                await this.consultaback('EventTypes',"simple","name","id",{"name":'ASC'}).toPromise();
                this.opciones.eventos=this.datos; 
                resul=[...resul,rep.name];
              break;

              case 5:
                this.validar[7]=true;
              break;

              case 6:
                this.validar[8]=true;
              break;

              case 9:
                this.validar[9]=true;
              break;
              default:
                resul=[...resul,rep.name];
              break;
            }
          }));
          this.result.repgerencial= resul;
          console.log("repgerencial", this.result.repgerencial);
        }
      break;

      // aux por tipod de reporte
      case'EventTypes':
        if(datos)
          this.result.eventos= datos['id'];
      break;

      case'Geocercas':
        if(datos){
          await this.obtenervalor(datos,"name");
          this.result.geocercas= this.res;
        }
      break;

      case'Mantenimiento':
        if(datos){
          await this.obtenervalor(datos,"name");
          this.result.mantenimiento= this.res;
        }
      break;

      case'Gasolina':
        if(datos){
          await this.obtenervalor(datos,"name");
          this.result.gasolina= this.res;
        }
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
          await this.obtenervalor(datos,"id"); //obtiene el array de las condiciones
          await this.validaractivos(this.res);
        }
      break;

      case 'Devices':
        if(datos){
        this.validar[3]=true;
        //console.log("datos para array activos", datos);
        await this.obtenervalor(datos,"id"); //obtiene el array de las condiciones
        this.result.activos=this.res;
        //console.log("resultado de array activos", this.res);
        }
      break;

      case 'rangos':
        if(datos){
          switch(datos.value){
            case 1:
              this.result.rangos=[this.fecha.toISOString().split('T')[0],this.fecha.toISOString().split('T')[0]];
              //console.log("fechas a consultar        ", this.result.rangos);
              this.validar[10]=true;
            break;
            case 2:
              this.fecha.setDate(this.fecha.getDate() - 1);
              this.result.rangos=[this.fecha.toISOString().split('T')[0],this.fecha.toISOString().split('T')[0]];
              this.validar[10]=true;
              //console.log("fechas a consultar        ", this.result.rangos);
            break;
            case 3:
              //console.log("cambia estado", datos.value);
              this.validar[4] = true;
            break;
          }
        }
      break;

      case 'calendario':
        //console.log("rangos        ", this.rangeDates);
        this.validar[10]=true;
        this.result.rangos=[this.fecha.toISOString().split('T')[0],this.fecha.toISOString().split('T')[0]];
        if(this.rangeDates[1]==null){
          this.result.rangos=[this.rangeDates[0].toISOString().split('T')[0],this.rangeDates[0].toISOString().split('T')[0]];
          //console.log("fechas a consultar        ", this.result.rangos);
        }
        else{
          this.result.rangos=[this.rangeDates[0].toISOString().split('T')[0],this.rangeDates[1].toISOString().split('T')[0]];
          //console.log("fechas a consultar        ", this.result.rangos);
        }
      break;
    }
  }
 
  /**
   * Esta finción permite manejar de manera rápida y eficiente las cabeceras que se usan para las consultas de API
   * @param entidad 
   * @param tipo 
   * @param cabecera 
   * @param identif 
   * @param ordenar 
   * @returns 
   */
  public consultaback(entidad: string,tipo: string, cabecera?: string,identif?:string, ordenar?: any): Observable<any> {
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
      //console.log("grupos", this.opciones.grupos.length);
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

  private async obtenervalor(datos: any[], cab: string): Promise<any>{
    this.res=[]; 
    datos.forEach(item => {
      this.res = [...this.res,item[`${cab}`]];
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
    //console.log("resultado activos", this.datos);
    
  }


  protected async seleccionarGrafico(tipo: string) {
    try{
      this.cabeceras.Multiconditions[this.result.reportes][0]['valor']=this.result.activos;
      this.cabeceras.Multiconditions[this.result.reportes][1]['valor']=this.result.rangos;
      if(this.result.reportes=='Reporte general')
      this.cabeceras.Multiconditions[this.result.reportes][2]['valor']=this.result.eventos;
    }
    catch{}
    await this.consultaback(this.result.reportes,"report").toPromise();
    console.log("consulta reporte   ",  this.res );
    
    this.tipoDeGrafico = tipo;
    // this.consultadatos();
  }
  
}