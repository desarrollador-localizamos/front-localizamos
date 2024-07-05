import { Component, ElementRef, Renderer2, computed, inject } from '@angular/core';
import { ApirestService } from '../apirest.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

import { ToastModule } from 'primeng/toast'
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MessageService } from 'primeng/api';
import { TableCustomersComponent } from "../shared/components/tables/table-customers/table-customers.component";
import { CustomersComponent } from "../customers/customers.component";
import { HeaderComponentComponent } from "../shared/components/header/header-component/header-component.component";
import { SidebarComponentComponent } from "../shared/components/sidebar/sidebar-component/sidebar-component.component";
import { MultiInputComponent } from "../shared/components/inputs/multi-input/multi-input.component";
import { InputSelectComponent } from '../shared/components/inputs/input-select/input-select.component';
import { InputRangeComponent } from '../shared/components/inputs/input-range/input-range.component';
import { InputFileSencilloComponent } from '../shared/components/inputs/input-files/input-file-sencillo/input-file-sencillo.component';
import { InputFileSencilloAlertaComponent } from '../shared/components/inputs/input-files/input-file-sencillo-alerta/input-file-sencillo-alerta.component';
import { InputFileVisualizacionComponent } from '../shared/components/inputs/input-files/input-file-visualizacion/input-file-visualizacion.component';
import { InputCheckComponent } from '../shared/components/inputs/inputs-checks/input-check/input-check.component';
import { InputCheckAvanzadoComponent } from '../shared/components/inputs/inputs-checks/input-check-avanzado/input-check-avanzado.component';
import { InputRadioComponent } from '../shared/components/inputs/inputs-checks/input-radio/input-radio.component';
import { InputSwitchComponent } from '../shared/components/inputs/inputs-checks/input-switch/input-switch.component';
import { InputCalendarSencilloComponent } from '../shared/components/inputs/inputs-calendar/input-calendar-sencillo/input-calendar-sencillo.component';
import { InputCalendarTemplateComponent } from '../shared/components/inputs/inputs-calendar/input-calendar-template/input-calendar-template.component';
import { InputTextareaComponent } from '../shared/components/inputs/input-textarea/input-textarea.component';
import { EditorComponent } from '../shared/components/editor/editor.component';
import { InputPasswordSencilloComponent } from '../shared/components/inputs/input-password/input-password-sencillo/input-password-sencillo.component';
import { InputPasswordMsgSeguridadComponent } from '../shared/components/inputs/input-password/input-password-msg-seguridad/input-password-msg-seguridad.component';
import { InputMaskComponent } from '../shared/components/inputs/inputs-number/input-mask/input-mask.component';
import { InputMultiNumberComponent } from '../shared/components/inputs/inputs-number/input-multi-number/input-multi-number.component';
import { ButtonSencilloComponent } from "../shared/components/buttons/button-sencillo/button-sencillo.component";
import { SidebarRegistrosComponent } from "../shared/components/sidebar/sidebar-registros/sidebar-registros.component";
import { TableSencillaComponent } from "../shared/components/tables/table-sencilla/table-sencilla.component";
import { TableAvanzadaComponent } from "../shared/components/tables/table-avanzada/table-avanzada.component";
import { TablePruebaComponent } from "../shared/components/tables/table-prueba/table-prueba.component";

import { TagModule } from 'primeng/tag';
import { ButtonTooltiComponent } from "../shared/components/buttons/button-toolti/button-toolti.component";
import { AuthService } from '../core/services/auth.service';
import { DataService } from '../core/services/data.service';
@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    providers: [MessageService],
    styleUrl: './dashboard.component.scss',
    imports: [EditorComponent, TagModule, FormsModule, ToastModule, ButtonModule, CardModule, TableModule, MenubarModule, InputTextModule, SidebarModule, CommonModule,
        InputFileSencilloComponent, InputMaskComponent, InputPasswordMsgSeguridadComponent, InputPasswordSencilloComponent, InputCalendarTemplateComponent, InputTextareaComponent,
        InputCalendarSencilloComponent, InputSwitchComponent, InputRadioComponent, InputCheckAvanzadoComponent, InputCheckComponent, InputFileVisualizacionComponent,
        InputFileSencilloAlertaComponent, AvatarModule, BadgeModule, OverlayPanelModule, TableCustomersComponent, CustomersComponent, HeaderComponentComponent, SidebarComponentComponent, MultiInputComponent,
        InputSelectComponent, InputRangeComponent, InputMultiNumberComponent, ButtonSencilloComponent, SidebarRegistrosComponent, TableSencillaComponent, TableAvanzadaComponent, TablePruebaComponent, ButtonTooltiComponent]
})


export class DashboardComponent {

    //Funcion para comprobar el metodo post
    
    private authService = inject( AuthService);
    

    //public user = computed(() => this.authService.currentUser());

    public user = computed(() => this.authService.currentUser() );

    tableData = {  // Ejemplo de estructura de datos que se pasa al componente de tabla reutilizable
    header: [
      {
        texto:"id",
        sortable: true,
        filter: true
      },
      {
        texto:"name",
        sortable: false,
        filter: true
      },
      {
        texto:"country",
        sortable: true,
        filter: true
      },
      {
        texto:"company",
        sortable: false,
        filter: true
      },
      {
        texto:"date",
        sortable: false,
        filter: false
      },
      {
        texto:"status",
        sortable: true,
        filter: true
      },
      {
        texto:"verified",
        sortable: false,
        filter: false
      },
      {
        texto:"activity",
        sortable: false,
        filter: true
      },
      {
        texto:"balance",
        sortable: false,
        filter: false
      },
      {
        texto:"status",
        sortable: true,
        filter: true
      },
      {
        texto:"acciones",
        sortable: false,
        filter: false
      }

    ],
    body: [
      {
        id: 1000,
        name: 'James Butt',
        country: 'Algeria',
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'unqualified',
        verified: true,
        activity: 17,
        balance: 70663,
        representative: 'Ioni Bowcher'
      },
      {
        id: 1001,
        name: 'Josephine Darakjy',
       
        company: 'Chanay, Jeffrey A Esq',
        date: '2019-02-09',
        status: 'proposal',
        verified: true,
        activity: 0,
        balance: 82429,
        representative: [{ name: 'Anna Bowcher' }]
      },
      {
        id: 1002,
        name: 'Art Venere',
        country: { name: 'France' },
        company: 'Chemel, James L Cpa',
        date: '2017-05-13',
        status: 'qualified',
        verified: false,
        activity: 63,
        balance: 28334,
        representative: { name: 'Peter Bowcher' }
      }
    ],
    footer: null
    };

    items: MenuItem[] | undefined;

    sidebarVisible: boolean = false;
  
    showMenu: boolean = false;

    userTypes: any[] = [] ;
    selectedUser: string = "";

    countries: any[] = [];
    selectedCountry: string = '';

    loading: boolean = false;


    public list = [];
    public mobileUnits = [];
  
    constructor(
      public service: ApirestService, private renderer: Renderer2, private elementRef: ElementRef,private messageService: MessageService,
      private dataService: DataService) { }

      
      ngOnInit(){
        const userData = this.user();
        if (userData) {
          console.log('User ID:', userData.id);
        } else {
          console.log('No user data available');
        }
      
         this.userTypes  = [
            { name: 'Persona natural' },
            { name: 'Persona jurídica' },
            { name: 'Revendedor' },
           
          ];
         
          console.log(this.tableData);
        this.countries = [
          { name: 'Australia', code: 'AU', flagUrl: 'https://www.countryflags.io/AU/flat/32.png' },
          { name: 'Brazil', code: 'BR', flagUrl: 'https://www.countryflags.io/BR/flat/32.png' },
          { name: 'China', code: 'CN', flagUrl: 'https://www.countryflags.io/CN/flat/32.png' },
          { name: 'Egypt', code: 'EG', flagUrl: 'https://www.countryflags.io/EG/flat/32.png' },
          { name: 'France', code: 'FR', flagUrl: 'https://www.countryflags.io/FR/flat/32.png' },
          { name: 'Germany', code: 'DE', flagUrl: 'https://www.countryflags.io/DE/flat/32.png' },
          { name: 'India', code: 'IN', flagUrl: 'https://cdn.countryflags.com/thumbs/india/flag-square-250.png' },
          { name: 'Japan', code: 'JP', flagUrl: 'https://www.countryflags.io/JP/flat/32.png' },
          { name: 'Spain', code: 'ES', flagUrl: 'https://www.countryflags.io/ES/flat/32.png' },
          { name: 'United States', code: 'US', flagUrl: 'https://www.countryflags.io/US/flat/32.png' }
        ];
        }
      
      
    
      handleValueChange(value: any, id: any): void {
        console.log('Valor del input:', id, value);
      }

      load(){
        console.log("button");
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
      onLogout() {
        this.authService.logout();
        
      }
      
      
  openSidebar() {
    this.sidebarVisible = true;
  }

  closeSidebar() {
    this.sidebarVisible = false;
  }

  saveUser() {
    console.log('User saved!');
  }

  updateUser() {
    console.log('User updated!');
  }
  
      arrowTransform: string = 'rotate(0deg)'; // Inicialmente, la flecha no está rotada
  
      toggleRotation() {
        this.arrowTransform = this.arrowTransform === 'rotate(-180deg)' ? 'rotate(0deg)' : 'rotate(-180deg)';
      }
    
      toggleSidebar() {
        const sidebar = this.elementRef.nativeElement.querySelector('.sidebar');
        const logo1 = this.elementRef.nativeElement.querySelector('.logo2');
    
    
        if (sidebar.classList.contains('icon-only')) {
          this.renderer.removeClass(sidebar, 'icon-only');
        
        } else {
          this.renderer.addClass(sidebar, 'icon-only');
        }
    
    
        if (logo1.classList.contains('cerrar')) {
          this.renderer.removeClass(logo1, 'cerrar');
        
        } else {
          this.renderer.addClass(logo1, 'cerrar');
        }     
      }
  
      //Funcion para comprobar el metodo post
  
      obtenerLlaves()
      {
          
          let url = 'obtener-llaves';
          let driver_id = "3";
        
          let body = new FormData();
          body.append('Driver_id', driver_id);
            this.service.queryPost(url, body).subscribe(
              response=>
              {
                  let result = response;
               
                  console.log(result)
              },
              err => 
              {
                  console.log(err);
              }
          );
      }

      //funcion upload

     
// 5499

ubication(value: number) {
  // Llama al método del servicio para guardar el valor
  this.dataService.setUbicationValue(value);

}
    
}
