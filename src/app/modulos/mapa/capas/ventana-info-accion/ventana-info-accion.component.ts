import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
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
    protected items: MenuItem[] | undefined;
    protected responseData: any;
    protected unityId: number;
    protected ultimasCoordenadas: any;
    @Output() refresh = new EventEmitter<void>();
    @Output() reporteRutas = new EventEmitter<void>();

    @Input() VisibilidadCapaVentana: boolean = false ;
 

    constructor(
        private dataService: DataService,
        private el: ElementRef
      ) {

        this.unityId = 0;
      }
    
    ngOnInit() {
        this.dataService.getResponse().subscribe((data) => {
            if (data && data.body && data.body.length > 0) {
                this.responseData = data.body[0][0];
                console.log("hello",this.responseData);
                this.unityId = this.responseData["id"];
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
            // {
            //     label: 'Ubicación en tiempo real',
            //     icon: 'pi pi-map-marker',
            //     items: [
            //         {
            //             label: 'Encender',
            //             icon: 'pi pi-power-off',
            //             styleClass: 'icon-green'
            //         },
            //         {
            //             label: 'Apagar',
            //             icon: 'pi pi pi-power-off',
            //             styleClass: 'icon-red'
            //         }
            //     ]
            // },
            {
                label: 'Compartir seguimiento',
                icon: 'pi pi-share-alt',
                command: () => this.onCompartirSeguimiento()
            },
            {
                label: 'Limipiar mapa',
                icon: 'pi pi-eraser'
            },
            {
                label: 'Reporte de ruta',
                icon: 'pi pi-file',
                command: () => this.onreporteRuta()
            },
            {
                label: 'Reporte de viaje',
                icon: 'pi pi-envelope',
                command: () => this.onreporteViaje()
            },
           
        ]
        
    }

    onRefresh() {
        this.refresh.emit();
    }


    ngOnChanges() {
        const containerCard = this.el.nativeElement.querySelector('.container-card');
        if (this.VisibilidadCapaVentana) {
            containerCard.style.display = '';
        } else {
            containerCard.style.display = 'none';
        }

    }

    onCompartirSeguimiento() {
        const unityIds = this.unityId;
        try {
            this.dataService.emitCompartirSeguimiento(unityIds);
            console.log("Emitiendo evento", this.unityId);
        } catch (error) {
            console.log(error);
            
        }
    }

    onreporteRuta() {
        const unityIds = this.unityId;
        try {
            this.dataService.emitReporteRuta(unityIds);
        } catch (error) {
            console.log(error);
            
        }
    }

    onreporteViaje() {
        const unityIds = this.unityId;
        try {
            this.dataService.emitReporteViaje(unityIds);
            console.log("Emitiendo evento de reporte viaje", this.unityId);
        } catch (error) {
            console.log(error);
            
        }
    }

    onreporteStreetView() {
        const lat = this.responseData?.endreportlat;
        const log = this.responseData?.endreportlong;

        console.log(lat,log);
        
        if (lat && log) {
          this.dataService.emitShowStreetView(lat, log);
        } else {
          console.error('Coordenadas no disponibles');
        }
    }
}
