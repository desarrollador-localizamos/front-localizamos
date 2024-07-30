import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { VentanaInfoAccionComponent } from '../ventana-info-accion/ventana-info-accion.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataService } from '../../../../core/services/data.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { SelectAvanzadoComponent, data } from "../../../../shared/components/inputs/select/select-avanzado/select-avanzado.component";
import { PrimeNGConfig } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';


@Component({
  selector: 'app-reporte-viaje',
  standalone: true,
  imports: [CommonModule,DividerModule,DialogModule, ButtonModule, InputTextModule, CalendarModule, FormsModule, SelectAvanzadoComponent],
  templateUrl: './reporte-viaje.component.html',
  styleUrl: './reporte-viaje.component.scss'
})
export class ReporteViajeComponent {

  @ViewChild(VentanaInfoAccionComponent) ventanaInfoAccion!: VentanaInfoAccionComponent;

  visible: boolean = false;
  position: string = 'center';
  rango: data[] = [];
  dateInicio: Date | undefined;
  dateFin: Date | undefined;
  seleccionarOpciones: data | undefined;
  rangeDates: Date[] | undefined;
  MostrarCalendario: boolean = false;
  unityId: number | undefined;
  bannerVisible: boolean = false;
  rutaDetalle: any = [];
  

  constructor(private dataService: DataService,private primengConfig: PrimeNGConfig) {
   
   }

  ngOnInit() {
    this.dataService.reporteViaje$.subscribe((unityId: number) => {
      console.log("Recibido unityId:", unityId);
      this.reporteRuta(unityId);  // Pasar el `unityId` al método `reporteRuta`
    });
  }


  reporteRuta(unityId: number){
    this.position = "top";
    this.visible = true;
    this.unityId = unityId;
     
   }

}
