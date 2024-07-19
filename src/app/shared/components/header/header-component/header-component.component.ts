import { Component, ElementRef, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ApirestService } from '../../../../apirest.service';
import { CustomersComponent } from '../../../../customers/customers.component';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { AuthService } from '../../../../core/services/auth.service';
import { FiltroComponent } from "../../filtro/filtro.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-header-component',
    standalone: true,
    templateUrl: './header-component.component.html',
    styleUrl: './header-component.component.scss',
    imports: [ButtonModule, BadgeModule, InputTextModule,
        AvatarModule, OverlayPanelModule, CustomersComponent, FiltroComponent]
})
export class HeaderComponentComponent {

   
  items: MenuItem[] | undefined;

  sidebarVisible: boolean = false;

  showMenu: boolean = false;

  constructor(public authService: AuthService,
  public service: ApirestService, private router: Router) { }


    arrowTransform: string = 'rotate(0deg)'; // Inicialmente, la flecha no está rotada

    toggleRotation() {
      this.arrowTransform = this.arrowTransform === 'rotate(-180deg)' ? 'rotate(0deg)' : 'rotate(-180deg)';
    }

    get isExactMapRoute(): boolean {
      return this.router.url === '/mapa';
    }

}

