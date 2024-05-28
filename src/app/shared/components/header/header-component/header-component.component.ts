import { Component, ElementRef, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ApirestService } from '../../../../apirest.service';
import { CustomersComponent } from '../../../../customers/customers.component';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';


@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [ButtonModule, BadgeModule, InputTextModule,
    AvatarModule, OverlayPanelModule, CustomersComponent],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.scss'
})
export class HeaderComponentComponent {

   
  items: MenuItem[] | undefined;

  sidebarVisible: boolean = false;

  showMenu: boolean = false;

  constructor(
  public service: ApirestService, private renderer: Renderer2, private elementRef: ElementRef) { }


    arrowTransform: string = 'rotate(0deg)'; // Inicialmente, la flecha no está rotada

    toggleRotation() {
      this.arrowTransform = this.arrowTransform === 'rotate(-180deg)' ? 'rotate(0deg)' : 'rotate(-180deg)';
    }
  
    ngOnInit() {
     
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
}

