import { Component } from '@angular/core';
import { BurgerMenuService } from '../../../burger-menu.service';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})
export class FiltroComponent {

  constructor(private burgerMenuService: BurgerMenuService) {}

  accion() {
    this.burgerMenuService.emitFilterClick(true);
  }
}
