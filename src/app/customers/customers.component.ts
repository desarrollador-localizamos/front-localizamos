import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableCustomersComponent } from '../shared/components/tables/table-customer/table-customers.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
        


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [RouterOutlet,StepsModule,SidebarModule,ButtonModule, FormsModule,TableCustomersComponent, DropdownModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {

  items: MenuItem[] | undefined;

  activeIndex: number = 0;


  sidebarVisible2: boolean = false;

  cities: City[] | undefined;
  selectedCity: City | undefined;

  userTypes: any[] | undefined;
  selectedUser: string | undefined;

  EstadoTypes: any[] | undefined;
  selectedEstado: string | undefined;


  countries: any[] | undefined;
  selectedCountry: string | undefined;
  messageService: any;

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
}

  ngOnInit() {

    this.items = [
      {
          label: 'Personal',
          command: (event: any) => this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label})
      },
      {
          label: 'Seat',
          command: (event: any) => this.messageService.add({severity:'info', summary:'Second Step', detail: event.item.label})
      },
      {
          label: 'Payment',
          command: (event: any) => this.messageService.add({severity:'info', summary:'Third Step', detail: event.item.label})
      },
      {
          label: 'Confirmation',
          command: (event: any) => this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label})
      }
  ];
      this.countries = [
          { name: 'Australia', code: 'AU' },
          { name: 'Brazil', code: 'BR' },
          { name: 'China', code: 'CN' },
          { name: 'Egypt', code: 'EG' },
          { name: 'France', code: 'FR' },
          { name: 'Germany', code: 'DE' },
          { name: 'India', code: 'IN' },
          { name: 'Japan', code: 'JP' },
          { name: 'Spain', code: 'ES' },
          { name: 'United States', code: 'US' }
      ];

      this.cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
      ];
      
      this.userTypes  = [
        { name: 'Persona natural' },
        { name: 'Persona jurídica' },
        { name: 'Revendedor' },
       
      ];

      this.EstadoTypes  = [
        { name: 'Activo' },
        { name: 'Bloqueado' },
        { name: 'Inactivo' },
       
      ];
  
  
  }

}
