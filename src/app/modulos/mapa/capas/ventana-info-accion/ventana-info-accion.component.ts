import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonTooltiComponent } from "../../../../shared/components/buttons/button-toolti/button-toolti.component";
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { MenuItem } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { DataService } from '../../../../core/services/data.service';
@Component({
    selector: 'app-ventana-info-accion',
    standalone: true,
    templateUrl: './ventana-info-accion.component.html',
    styleUrl: './ventana-info-accion.component.scss',
    imports: [TieredMenuModule, ButtonModule,CardModule, CommonModule,  ButtonTooltiComponent,TagModule,DividerModule]
})
export class VentanaInfoAccionComponent {
    items: MenuItem[] | undefined;
    responseData: any;

    @Output() refresh = new EventEmitter<void>();

    constructor(
        private dataService: DataService
      ) {}
    
    ngOnInit() {
        this.dataService.getResponse().subscribe((data) => {
            if (data && data.body && data.body.length > 0) {
                this.responseData = data.body[0][0]; // Asegúrate de que `body` no esté vacío
                console.log("hello",this.responseData); // Agrega un console.log para depurar
            }
        });

        this.items = [
         
            {
                label: 'Acciones :',    
            },
            {
                separator: true
            },
            {
                label: 'Enviar comando',
                icon: 'pi pi-send',
                items: [
                    {
                        label: 'Encender motor',
                        icon: 'pi pi-power-off',
                        styleClass: 'icon-green'
                    },
                    {
                        label: 'Apagar motor',
                        icon: 'pi pi-power-off',
                        styleClass: 'icon-red'
                      },
                    {
                        label: 'Status',
                        icon: 'pi pi-clock'
                    }
                ]
            },
            {
                label: 'Ubicación en tiempo real',
                icon: 'pi pi-map-marker',
                items: [
                    {
                        label: 'Encender',
                        icon: 'pi pi-power-off',
                        styleClass: 'icon-green'
                    },
                    {
                        label: 'Apagar',
                        icon: 'pi pi pi-power-off',
                        styleClass: 'icon-red'
                    }
                ]
            },
            {
                label: 'Compartir seguimiento',
                icon: 'pi pi-share-alt'
            },
            {
                label: 'Limipiar mapa',
                icon: 'pi pi-eraser'
            },
            {
                label: 'Reporte de ruta',
                icon: 'pi pi-file'
            },
            {
                label: 'Reporte de viaje',
                icon: 'pi pi-envelope'
            },
           
        ]
    }

    onRefresh() {
        this.refresh.emit();
      }
}
