import { Component, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CONSTANS } from '../../core/constants/permisos/constantes';
import { Entities } from '../../core/constants/globalEntities/globalEntities';
import { DataSimpleService } from '../../core/services/datasimple.service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { data } from '../../shared/components/inputs/select/select-avanzado/select-avanzado.component';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-roles-permisos',
  standalone: true,
  imports: [InputSwitchModule,DividerModule,FormsModule, DropdownModule,ButtonModule,PanelModule,FieldsetModule,InputTextModule],
  providers: [ MessageService],
  templateUrl: './roles-permisos.component.html',
  styleUrl: './roles-permisos.component.scss'
})
export class RolesPermisosComponent  implements OnInit{


  protected roles: any[] | undefined;
  protected seleccionarRoles: any | undefined;
  //protected data: any = {nuevoRol: string, selectTipo: {}};
  private cabeceras: any = { Entities: {}, Fields: {}, Relations: {}, Joins: {}, Multiconditions: {}, Servicios: {}, DataInsert: {} };
  protected datos: data[]=[];
  private res:any = {};
  protected result = {tipos:this.res, roles: this.res,permisos: this.res}
  protected checked: boolean = false;
  protected collapsed: boolean = true;
  protected verInput: boolean = false;
  protected nuevoRol: string = '';

  constructor(private dataSimpleService: DataSimpleService, private messageService: MessageService,){
      
  }

  ngOnInit() {
 
    this.cabeceras.Fields = CONSTANS.Fields;
    this.cabeceras.Entities = Entities; 
    this.cabeceras.Relations = CONSTANS.Relations; 
    this.cabeceras.Joins = CONSTANS.Joins; 
    this.cabeceras.Multiconditions = CONSTANS.Multiconditions 
    this.cabeceras.Servicios = CONSTANS.Servicios; 
    console.log('cabeceras ',this.cabeceras);

    this.consultarTipos();
}

  consultarTipos(){
    this.consultas("UsersTypes");
  }

  consultarRoles(){
   
    console.log(this.seleccionarRoles.id);
    this.consultas("UsersTypes");
    this.consultas("Roles");
    this.consultas("RoleHasPermissions");
    
  }

  crearRol(){
    this.verInput = true;
   
    if(this.nuevoRol != ''){
      this.consultas("RolesInsert");
    }else{
      console.log("No hay valores para guardar");
    }
    //this.nuevoRol = '';
  }


  editarRol(id: number, name: string): void {
    console.log("Span clickeado:", id);
    this.nuevoRol = name;
    this.verInput = true;

    if(this.nuevoRol != ''){
      this.consultas("RolesEdit");
    }else{
      console.log("No hay valores para guardar");
    }
  }

  eliminarRol(id: number): void {
    console.log("Span clickeado:", id);
    this.verInput = true;

    if(this.nuevoRol != ''){
      this.consultas("RolesEdit");
    }else{
      console.log("No hay valores para guardar");
    }
  }

protected async consultas(entidad:string,datos?:any) : Promise<void> {
  switch (entidad){
    case 'UsersTypes':
      await this.consultaback('UsersTypes',"multi","name","id",{"name":'ASC'}).toPromise();
      this.result.tipos= this.datos;
      console.log("tipos",this.result.tipos);
      this.roles = this.result.tipos;
      
    break;

    case 'Roles':
     await this.consultaback('Roles',"general","","",{}).toPromise();
     this.result.roles= this.datos;

    break;

    case 'RolesInsert':
      const dataInsert = {
        name:this.seleccionarRoles.name+"-"+this.nuevoRol,
        userTypeId: this.seleccionarRoles.id,
        guardName: 'api'
      };
      console.log(dataInsert);
      
      await this.consultabackInsert('Roles', dataInsert).toPromise();
      this.result.roles= this.datos;
 
    break;

    case 'RolesEdit':
      
      
      await this.consultabackInsert('Roles').toPromise();
      this.result.roles= this.datos;
 
    break;

    case 'RoleHasPermissions':
   
     await this.consultaback('RoleHasPermissions',"general","","",{}).toPromise();
     this.result.permisos= this.datos;
     console.log("permisos",this.result.permisos);

      
    break;
  }
}

  /**
   * Esta función permite manejar de manera rápida y eficiente las cabeceras que se usan para las consultas de API
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
    return this.dataSimpleService.fetchData(this.cabeceras.Servicios[entidad], this.cabeceras.Entities[entidad], 
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
          case "general":
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
    return this.dataSimpleService.Insert(this.cabeceras.Servicios[entidad],   this.cabeceras.Entities[entidad], dataInsert)
      .pipe(
        tap(response => {

        // this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha guardado exitosamente' });
          console.log("se guardo econ exito");
          
        this.consultarRoles();
        //  this.mostrarSeleccionPlantilla = false;
        //  this.seleccionarPlantillas = undefined;
        //  this.mostrarFormularioGeneral= false;
    
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
        // this.consultarRoles( );
        //  this.seccionEdit = false;
        //  this.mostrarSeleccionPlantilla = false;
        //  this.seleccionarPlantillas = undefined;
        //  this.mostrarFormularioGeneral= false;
    
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
         this.consultarRoles( );
        //  this.seccionEdit = false;
        //  this.mostrarSeleccionPlantilla = false;
        //  this.seleccionarPlantillas = undefined;
        //  this.mostrarFormularioGeneral= false;
    
        }),
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error)
        }));
  }


}
