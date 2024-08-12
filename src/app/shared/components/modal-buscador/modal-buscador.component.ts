import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { DataService } from '../../../core/services/data.service';
import { Observable, Subscription, catchError, tap, throwError } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { data } from '../inputs/select/multi-select/multi-select.component';
import { DataSimpleService } from '../../../core/services/datasimple.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-buscador',
  standalone: true,
  imports: [InputTextModule,DividerModule,DialogModule,InputIconModule,IconFieldModule],
  templateUrl: './modal-buscador.component.html',
  styleUrl: './modal-buscador.component.scss'
})
export class ModalBuscadorComponent {

  protected visible: boolean = false;
  private subscription: Subscription | undefined;

  protected datos: data[]=[];
  private res:any[]=[];
  protected opciones= {MobileUnities: this.datos}
  protected result = {MobileUnities: this.res}
  private cabeceras:any={Entities: {},Fields: {}, Relations: {},Joins: {},Multiconditions:{},Servicios:{}};
  private condicions: any = { "idCustomer": 779 }; // valor del customer almacenar por medio de la variable computada
  protected idCliente: number = 0;
  protected resultMobile: any;

  protected searchTerm: string = '';
  protected filteredResults: any[] = [];
  
  constructor(private dataService: DataService,private dataSimpleService: DataSimpleService,private router: Router,) {}

  ngOnInit() {
    this.subscription = this.dataService.showModal$.subscribe(() => {
      this.showDialog();
    });

    if(this.condicions["idCustomer"] == 1){
      this.idCliente = 1;

      this.cabeceras.Multiconditions= {
      
        'MobileUnities':[],
      }
    }else{
      this.idCliente = this.condicions["idCustomer"];
        this.cabeceras.Multiconditions= {
        
          'MobileUnities':[{'ref':'customerId',  valor: [this.idCliente],"tipo":"in","relacion":"device"}],
        }
    }
    
    this.cabeceras.Fields = { 
      MobileUnities:  [
        {campo:"id", texto: "value" },
        {campo:"plate", texto: "campo" },
        {campo:"device.customerId", texto: "campo" },
        {campo:"endreport.mobilestatus", texto: "status"},
       
       ],

    }; 

    
    this.cabeceras.Entities= {
      'MobileUnities':'MobileUnities',
    };

    this.cabeceras.Relations= {
      MobileUnities: [
        "device","device.customer",
       ],
    }

    this.cabeceras.Joins= {
      'MobileUnities':[],
    }

      

    this.cabeceras.Servicios= {
      'MobileUnities':'Database/visor',
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  showDialog() {
    this.visible = true;
    this.consultas('MobileUnities');
  }

  protected async consultas(entidad: string, datos?: any): Promise<void> {
    switch (entidad) {
      case 'MobileUnities':
  
        await this.consultaback(entidad, "obtencion","","").toPromise();
          this.resultMobile = this.datos;
        break;
    }
  }
  
    private consultaback(entidad: string, tipo: string, cabecera?: string, identif?:string): Observable<any> {
      console.log("fields", this.cabeceras);
      console.log("fields", this.cabeceras.Servicios);
      console.log("entidad", entidad);
      let id = "";
      
      return this.dataSimpleService.fetchData(this.cabeceras.Servicios[entidad], this.cabeceras.Entities[entidad], 
        this.cabeceras.Fields[entidad], this.cabeceras.Relations[entidad], {}, 
        this.cabeceras.Joins[entidad], this.cabeceras.Multiconditions[entidad]
   
      
      ).pipe(
        tap(response => {
          console.log("Response:", response);
          if (response && response.body) {
            switch(tipo) {
              case "simple":
                this.datos = response.body.map((item: any) => ({
                  id: item[id],
                  name: item[cabecera || 'name'], // Asegúrate de que 'cabecera' es el campo correcto
                }));
                break;
              case "multi":
                this.datos = response.body.map((item: any) => ({
                  id: item[0][id],
                  name: item[0][cabecera || 'name'], // Asegúrate de que 'cabecera' es el campo correcto
                }));
                break;
              case "obtencion":
                this.datos = response;
                break;
            }
          } else {
            console.log('No data found in the response.');
          }
        }),
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error);
        })
      );
    }

    onSearch(event: any) {
      this.searchTerm = event.target.value.toLowerCase();
      this.filterResults();
    }
  
    filterResults() {
      if (!this.searchTerm) {
        this.filteredResults = [];
      } else {
        this.filteredResults = this.resultMobile?.body.filter((item: any) => 
          item[0]?.plate?.toLowerCase().includes(this.searchTerm)
        ) || [];
      }
    }
  

    ubication(id: number) {
      this.dataService.setUbicationValue(id, true); // Pasa true para indicar que es el modal de filtro
      this.router.navigate(['/mapa']);
      this.visible = false;
    }
  
}
