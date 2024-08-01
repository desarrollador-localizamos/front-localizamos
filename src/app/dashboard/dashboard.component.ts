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
import { TableCustomersComponent } from "../shared/components/tables/table-customer/table-customers.component";
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
import { CarouselModule } from 'primeng/carousel';

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
    imports: [CarouselModule,EditorComponent, TagModule, FormsModule, ToastModule, ButtonModule, CardModule, TableModule, MenubarModule, InputTextModule, SidebarModule, CommonModule,
        InputFileSencilloComponent, InputMaskComponent, InputPasswordMsgSeguridadComponent, InputPasswordSencilloComponent, InputCalendarTemplateComponent, InputTextareaComponent,
        InputCalendarSencilloComponent, InputSwitchComponent, InputRadioComponent, InputCheckAvanzadoComponent, InputCheckComponent, InputFileVisualizacionComponent,
        InputFileSencilloAlertaComponent, AvatarModule, BadgeModule, OverlayPanelModule, TableCustomersComponent, CustomersComponent, HeaderComponentComponent, SidebarComponentComponent, MultiInputComponent,
        InputSelectComponent, InputRangeComponent, InputMultiNumberComponent, ButtonSencilloComponent, SidebarRegistrosComponent, TableSencillaComponent, TableAvanzadaComponent, TablePruebaComponent, ButtonTooltiComponent]
})


export class DashboardComponent {

  images = [
    {url: 'https://www.deltatracking.com/wp-content/uploads/2022/02/03-migrar-unidades-de-GPS-1024x576.jpg', alt: 'Image 1'},
    {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnyW_4iKsjfwWVgqYMCmkiEpySsYLCh2icmQ&s', alt: 'Image 2'},
    {url: 'https://www.deltatracking.com/wp-content/uploads/2022/02/03-migrar-unidades-de-GPS-1024x576.jpg', alt: 'Image 3'},
  ];

    //Funcion para comprobar el metodo post
    
    private authService = inject( AuthService);
  

    public user = computed(() => this.authService.currentUser() );
  
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
  
   
        }
      
 
     
      onLogout() {
        this.authService.logout();
        
      }
  
// 5499


ubication(values: number[]) {
  values.forEach(value => {
    this.dataService.setUbicationValue(value);
  });
}
    
}
