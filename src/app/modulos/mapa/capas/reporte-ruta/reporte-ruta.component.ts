import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  selector: 'app-reporte-ruta',
  standalone: true,
  imports: [TagModule,CommonModule,DividerModule,DialogModule, ButtonModule, InputTextModule, CalendarModule, FormsModule, SelectAvanzadoComponent],
  templateUrl: './reporte-ruta.component.html',
  styleUrl: './reporte-ruta.component.scss'
})
export class ReporteRutaComponent  implements OnInit{

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
  rutaDetalleInfo: any = [];
  isPanelVisible: boolean = true;
  

  constructor(private dataService: DataService,private primengConfig: PrimeNGConfig , private renderer: Renderer2,
    private el: ElementRef,) {
    this.dateInicio = new Date();
    this.dateInicio.setHours(0, 0, 0, 0);

    // Inicializar dateFin a las 23:59:59
    this.dateFin = new Date();
    this.dateFin.setHours(23, 59, 59, 999);
   }

   ngOnInit() {
    this.dataService.reporteRuta$.subscribe((unityId: number) => {
      console.log("Recibido unityId:", unityId);
      this.reporteRuta(unityId);  // Pasar el `unityId` al método `reporteRuta`
    });
    
    this.rango = [
      { name: 'Hoy', icon: 'pi-calendar', value: 1 },
      { name: 'Ayer', icon: 'pi-calendar ', value: 2  },
      { name: 'Personalizado', icon: 'pi-calendar', value: 3  },
    ]

    this.primengConfig.setTranslation({
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: "Hoy",
      clear: "Limpiar"
    });
  }

 

  onCountrySelect(data: data) {
    this.seleccionarOpciones = data;
   
  }
  
  rangoTiempo(data: data) {
    this.seleccionarOpciones = data;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    switch (data.value) {
      case 1: // Hoy
        this.rangeDates = [today, today];
        this.MostrarCalendario = false;
        break;
      case 2: // Ayer
        this.rangeDates = [yesterday, yesterday];
        this.MostrarCalendario = false;
        break;
      case 3: // Personalizado
        this.rangeDates = undefined;
        this.MostrarCalendario = true;
        break;
    }
  }

  reporteRuta(unityId: number){
   this.position = "top";
   this.visible = true;
   this.unityId = unityId;
    
  }

  accionBanner() {
     this.isPanelVisible = !this.isPanelVisible;

    const panel = this.el.nativeElement.querySelector('.side-panel');
    const panelSection = this.el.nativeElement.querySelector('.panel-section');
    const panelheader = this.el.nativeElement.querySelector('.panel-header');
    const panelheaderTitle = this.el.nativeElement.querySelector('.panel-header-title');
    const panelheaderButton = this.el.nativeElement.querySelector('.panel-header-button2');

     if (this.isPanelVisible) {
       this.renderer.removeClass(panel, 'cierre');
       this.renderer.removeClass(panelSection, 'cierre');
       this.renderer.removeClass(panelheader, 'cierre');
       this.renderer.removeClass(panelheaderTitle, 'cierre');
       this.renderer.removeClass(panelheaderButton, 'cierre');
   
    } else {
      this.renderer.addClass(panel, 'cierre');
      this.renderer.addClass(panelSection, 'cierre');
      this.renderer.addClass(panelheader, 'cierre');
      this.renderer.addClass(panelheaderTitle, 'cierre');
      this.renderer.addClass(panelheaderButton, 'cierre');

     }
  
  }

  public list: { [key: string]: any[] } = {   
  
    MobileUnityEvents:  [
     {campo:"id", texto: "unidad movil"},
     {campo:"status", texto: "evento"},
     {campo:"address", texto: "Ubicacion"},
     {campo:"velocity", texto: "Velocidad"},
     {campo:"eventTypeId", texto: "tiempo total"},
     {campo:"deviceDateHour", texto: "tiempo"},
     {campo:"location", texto: "coordenadas"},
    ] 
    
   };


   generarReporte() {
    let fechaInicio: Date;
    let fechaFin: Date;

    if (this.seleccionarOpciones?.value === 1) {
        // Opción 1: Fechas de hoy
        const hoy = new Date();
        fechaInicio = new Date(hoy.setHours(0, 0, 0, 0));
        fechaFin = new Date(hoy.setHours(23, 59, 59, 999));
    } else if (this.seleccionarOpciones?.value === 2) {
        // Opción 2: Fechas de ayer
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1);
        fechaInicio = new Date(ayer.setHours(0, 0, 0, 0));
        fechaFin = new Date(ayer.setHours(23, 59, 59, 999));

    } else if (this.seleccionarOpciones?.value === 3 && this.rangeDates && this.rangeDates.length === 2) {
        // Opción personalizada
        fechaInicio = new Date(this.rangeDates[0]);
        fechaFin = new Date(this.rangeDates[0]);

        if (this.dateInicio) {
            fechaInicio.setHours(this.dateInicio.getHours(), this.dateInicio.getMinutes(), 0, 0);
        } else {
            fechaInicio.setHours(0, 0, 0, 0);
        }

        if (this.dateFin) {
            fechaFin.setHours(this.dateFin.getHours(), this.dateFin.getMinutes(), 59, 999);
        } else {
            fechaFin.setHours(23, 59, 59, 999);
        }
    } else {
        console.error('Opción no válida o datos insuficientes');
        return;
    }

    // Función para formatear fechas en el formato 'YYYY/MM/DD HH:MM:SS'
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    };

    const fechaInicioFormateada = formatDate(fechaInicio);
    const fechaFinFormateada = formatDate(fechaFin);

    console.log("Fecha Fin Formateada:", fechaFinFormateada);
    console.log("Fecha Inicio Formateada:", fechaInicioFormateada);

    this.dataService.fetchDataReportRuta(this.list, "MobileUnityEvents", {}, { "unityId": this.unityId }, {}, [
        { "ref": "deviceDateHour", "valor": [fechaInicioFormateada, fechaFinFormateada], "tipo": "between" }
    ]).subscribe(response => {
        console.log(response);
        this.bannerVisible = true;
        this.rutaDetalle = response.body[0];
        this.rutaDetalleInfo = response.body[1][0];
        console.log("info ruta",this.rutaDetalleInfo);
        

        this.dataService.setReporteRutaData(this.rutaDetalle);
    });
  }

}





