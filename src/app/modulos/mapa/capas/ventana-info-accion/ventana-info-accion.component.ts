import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonTooltiComponent } from "../../../../shared/components/buttons/button-toolti/button-toolti.component";
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-ventana-info-accion',
    standalone: true,
    templateUrl: './ventana-info-accion.component.html',
    styleUrl: './ventana-info-accion.component.scss',
    imports: [CardModule, CommonModule,  ButtonTooltiComponent,TagModule,DividerModule]
})
export class VentanaInfoAccionComponent {

}
