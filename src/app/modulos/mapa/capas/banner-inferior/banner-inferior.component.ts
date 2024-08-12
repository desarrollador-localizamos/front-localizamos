import { Component, ElementRef, Renderer2, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { DataSimpleService } from '../../../../core/services/datasimple.service';
import { data } from '../../../../shared/components/inputs/select/select-avanzado/select-avanzado.component';

@Component({
  selector: 'app-banner-inferior',
  standalone: true,
  imports: [DividerModule, CommonModule,TagModule,DialogModule,TableModule],
  templateUrl: './banner-inferior.component.html',
  styleUrls: ['./banner-inferior.component.scss'],
})
export class BannerInferiorComponent implements OnInit {

  // variables para comunicar si se muestra la capa o no 
  @Input() VisibilidadCapaBanner: boolean = false ;

  protected isPanelVisible: boolean = true;
  protected visible: boolean = false;
  protected responseData: any;
  protected responseDataEventos: any;
  protected unityId : number;
  protected datos: data[] = [];
  private res: any[] = [];
  private cabeceras: any = { Entities: {}, Fields: {}, Relations: {}, Joins: {}, Multiconditions: {}, Servicios: {}, DataInsert: {} };
  protected result = { clientes: this.res, }
  protected condicions: any;
  protected resultData: any = {};

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private dataService: DataService,
    private dataSimpleService: DataSimpleService
  ) {
    this.unityId = 0;
  }

  ngOnInit() {
    this.dataService.getResponse().subscribe((data) => {
      if (data && data.body && data.body.length > 0) {
          this.responseData = data.body[0][0];
      }

      this.dataService.getResponseUltimosEventos().subscribe((data) => {
        if (data && data.body && data.body.length > 0) {
            this.responseDataEventos = data.body;
            console.log("datos",this.responseDataEventos);
            
        }
      });

      this.cabeceras.Fields = {
        ContactsEmergency: [
          { campo: "id", texto: "no va" },
          { campo: "firstName", texto: "nombre" },
          { campo: "lastName", texto: "apellido" },
          { campo: "telephone", texto: "telefono" },
          { campo: "email", texto: "Correo" },
          { campo: "unityId", texto: "no va" },
        ],
      };
  
      this.cabeceras.Entities = {
        'ContactsEmergency': "ContactsEmergency",
      };
  
      this.cabeceras.Relations = {
        ContactsEmergency: [],
      }
  
      this.cabeceras.Joins = {
        'ContactsEmergency': [],
      }
  
      this.cabeceras.Multiconditions = {
        'ContactsEmergency': [
          {"ref":"unityId","valor":this.responseData.id},
       
        ],
      }
  
      this.cabeceras.Servicios = {
        'ContactsEmergency': 'Database/visor',
      }
    });


   
  }

  togglePanel() {
    this.isPanelVisible = !this.isPanelVisible;

    const panel = this.el.nativeElement.querySelector('.side-panel');
    const button = this.el.nativeElement.querySelector('.toggle-panel-btn');

    if (this.isPanelVisible) {
      this.renderer.removeClass(panel, 'cierre');
      this.renderer.removeClass(button, 'cierre');
    } else {
      this.renderer.addClass(panel, 'cierre');
      this.renderer.addClass(button, 'cierre');
    }
    console.log('Toggle panel state:', this.isPanelVisible);
  }


  ngOnChanges() {
    const containerBanner = this.el.nativeElement.querySelector('.banner');
    if (this.VisibilidadCapaBanner) {
      containerBanner.style.display = '';
    } else {
      containerBanner.style.display = 'none';
    }


}

contactosEmergencia(){
  this.visible = true;
  console.log("contactos",this.responseData.id);
  this.unityId = this.responseData.id;
  this.consultas('ContactsEmergency');

  
}

protected async consultas(entidad: string, datos?: any): Promise<void> {
  switch (entidad) {

    case 'ContactsEmergency':
 
        await this.consultaback('ContactsEmergency', "report", "unityId", "").toPromise();
        
    break;
  }
}

private consultaback(entidad: string, tipo: string, cabecera?: string, identif?: string): Observable<any> {
  console.log("servicio", this.cabeceras.Servicios);
  console.log("entidad", entidad);
  let id = "";
  if (identif)
    id = identif;
  else
    id = "id";
  return this.dataSimpleService.fetchData(this.cabeceras.Servicios[entidad], this.cabeceras.Entities[entidad],
    this.cabeceras.Fields[entidad], this.cabeceras.Relations[entidad], {},
    this.cabeceras.Joins[entidad], this.cabeceras.Multiconditions[entidad])
    .pipe(
      tap(response => {
       
      
        console.log("respo", this.resultData);
       
        switch (tipo) {
          case "report":
            this.resultData = response;
            this.datos = response;
            break;
        }
      }),
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError(() => error)
      }));
}

}
