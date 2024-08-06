import { AfterViewInit, Component, computed, inject } from '@angular/core';
import { ApirestService } from '../apirest.service';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { AuthService } from '../core/services/auth.service';
import { DataService } from '../core/services/data.service';
import { Router } from '@angular/router';
import { BurgerMenuService } from '../burger-menu.service'; 
import { data } from '../shared/components/inputs/select/select-avanzado/select-avanzado.component';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { DataSimpleService } from '../core/services/datasimple.service';
@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [DividerModule,CarouselModule,TagModule, FormsModule]
})


export class DashboardComponent implements AfterViewInit{

  images = [
    {url: 'http://aplicacion.localizamos.co/fondo.jpg', alt: 'Image 1'},
    {url: 'https://www.deltatracking.com/wp-content/uploads/2022/02/03-migrar-unidades-de-GPS-1024x576.jpg', alt: 'Image 2'},
    {url: 'https://briznner.com.uy/wp-content/uploads/2022/11/RASTREO-SATELITAL-768x384.png', alt: 'Image 3'},
  ];

    //Funcion para comprobar el metodo post
    
  private authService = inject( AuthService);
  public user = computed(() => this.authService.currentUser() );

  protected datos: data[]=[];
  private res:any[]=[];
  protected resultMobile: any;
  protected resultMobile2: any;
  protected resultadoTotalActivos: any;
  protected resultadoTotalVehiculosActivos: any;
  protected resultCountNotificaciones: any;
  protected opciones= {MobileUnities: this.datos}
  protected result = {MobileUnities: this.res}
  private cabeceras:any={Entities: {},Fields: {}, Relations: {},Joins: {},Multiconditions:{},Servicios:{}};
  protected idCliente: number = 0;


  private condicions: any = { "idCustomer": 779 }; // valor del customer almacenar por medio de la variable computada
  

  constructor(
    private burgerMenuService: BurgerMenuService,private router: Router,
    protected service: ApirestService,
    private dataService: DataService,private dataSimpleService: DataSimpleService) { }

      
  ngOnInit(){
    const userData = this.user();
    if (userData) {
      console.log('User ID:', userData.id);
    } else {
      console.log('No user data available');
    }

    if(this.condicions["idCustomer"] == 1){
      this.idCliente = 1;
    }else{
      this.idCliente = this.condicions["idCustomer"];

    }
    

     this.cabeceras.Fields = { 
      MobileUnities:  [
        {campo:"id", texto: "value" },
        {campo:"plate", texto: "campo" },
        {campo:"endreport.velocity", texto: "velocidad"},
        {campo:"endreport.temperature", texto: "temperatura"},
        {campo:"endreport.mobilestatus", texto: "status"},
        {campo:"endreport.battery", texto: "bateria"},
        {campo:"endreport.course", texto: "Curso"},
        {campo:"endreport.degree", texto: "Grados"},
        {campo:"device.deviceType.brand.name", texto: "Tipo de dispositivo"},
        {campo:"device.deviceType.code", texto: "Referencia del dispositivo"},
       ],

       MobileUnities_:  [
        {campo:"id", texto: "value" },
        {campo:"updatedAt", texto: "value" },
       ],

       UserNotifications:  [
        {campo:"id", texto: "value" },
        {campo:"status", texto: "value" },
       ],
    }; 

    
    this.cabeceras.Entities= {
      'MobileUnities':'MobileUnities',
      'MobileUnities_':'MobileUnities',
      'UserNotifications':'UserNotifications',
    };

    this.cabeceras.Relations= {
      MobileUnities: [
        "device","type", "subclass", "class",
        "device.deviceType","device.deviceType.brand","subclass", 
       ],
    }

    this.cabeceras.Joins= {
      'MobileUnities':[],
    }

    this.cabeceras.Multiconditions= {
      'MobileUnities':[{'ref':'endreport',  valor: '"customer_id":' + this.idCliente,'tipo':'like'}],
      'MobileUnities_':[{'ref':'endreport',  valor: '"customer_id":' + this.idCliente,'tipo':'like'}],
      'UserNotifications':[{'ref':'status',  valor: '0'}],
    }

    this.cabeceras.Servicios= {
      'MobileUnities':'Database/visor',
      'MobileUnities_':'Database/visor',
      'UserNotifications':'Database/visor',
    }


  }
  ngAfterViewInit() {
    this.consultMobileUnities();
    
  }
      
  onLogout() {
    this.authService.logout();
  }
  
  onLinkClick(linkName: string, viewNumber: number) {
    this.burgerMenuService.setSelectedLink(linkName);
    this.router.navigate([linkName, viewNumber]);
  }

  ubication(id: number) {
    this.dataService.setUbicationValue(id);
    this.router.navigate(['/mapa']);
  }

  private consultMobileUnities(){
    
    this.consultas('MobileUnities');
    this.consultas('MobileUnities_');
    this.consultas('UserNotifications');
  }


  protected async consultas(entidad: string, datos?: any): Promise<void> {
  switch (entidad) {
    case 'MobileUnities':

      await this.consultaback(entidad, "obtencion","","", {'updatedAt':'DESC'}, 5).toPromise();
        this.resultMobile = this.datos;
        console.log();
     
      break;

    case 'MobileUnities_':

      await this.consultaback(entidad, "obtencion","","",{}).toPromise();
        this.resultMobile2 = this.datos;
        this.TotalActivos()
     
      break;


    case 'UserNotifications':

      await this.consultaback(entidad, "obtencion","","",{}).toPromise();
        this.resultCountNotificaciones = this.datos;
        const count = this.resultCountNotificaciones.body.length;
        this.resultCountNotificaciones = count;
     
      break;
  }
}

  private consultaback(entidad: string, tipo: string, cabecera?: string, identif?:string, ordenar?: any, takes?: number): Observable<any> {
    console.log("fields", this.cabeceras);
    console.log("fields", this.cabeceras.Servicios);
    console.log("entidad", entidad);
    let id = "";
    
    return this.dataSimpleService.fetchData(this.cabeceras.Servicios[entidad], this.cabeceras.Entities[entidad], 
      this.cabeceras.Fields[entidad], this.cabeceras.Relations[entidad], {}, 
      this.cabeceras.Joins[entidad], this.cabeceras.Multiconditions[entidad],ordenar,takes
 
    
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



  TotalActivos() {

    this.resultadoTotalActivos =  this.resultMobile2.body.length;
  
    const now = new Date().getTime(); // Tiempo actual en milisegundos
    const oneDayInMs = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    let count = 0;
  
    this.resultMobile2.body.forEach((itemArray: { updatedAt: string }[]) => {
      if (itemArray.length > 0) {
        const item = itemArray[0];
        if (item.updatedAt) {
          const updatedAtTime = new Date(item.updatedAt).getTime(); // Tiempo de updatedAt en milisegundos
          const timeDifference = now - updatedAtTime;
  
          if (timeDifference <= oneDayInMs) {
            count++;
          }
        }
      }
    });

    this.resultadoTotalVehiculosActivos = count;
  
    console.log("Total activos en las últimas 24 horas:", count);
  }


    
}
