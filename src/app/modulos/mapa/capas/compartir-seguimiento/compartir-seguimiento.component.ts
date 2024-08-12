import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DataService } from '../../../../core/services/data.service';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { data } from '../../../../shared/components/inputs/select/select-avanzado/select-avanzado.component';
import { DataSimpleService } from '../../../../core/services/datasimple.service';

interface Dia {
  value: number;
  name: string;
}

@Component({
  selector: 'app-compartir-seguimiento',
  standalone: true,
  imports: [DropdownModule, ChipsModule, FormsModule, ButtonModule, DividerModule, CommonModule, DialogModule],
  templateUrl: './compartir-seguimiento.component.html',
  styleUrl: './compartir-seguimiento.component.scss'
})
export class CompartirSeguimientoComponent {
  protected visible: boolean = false;
  protected position: string = 'center';
  protected values: string[] | undefined;
  protected dias: Dia[] | undefined;
  protected selecccionarDias: Dia | undefined;
  protected correosEnString: string | undefined;
  protected fechaFin: any;
  protected fechaInicio: any;
  protected unityId: number = 0;

  private res: any[] = [];
  protected datos: data[] = [];
  private cabeceras: any = { Entities: {}, Fields: {}, Relations: {}, Joins: {}, Multiconditions: {}, Servicios: {}, DataInsert: {} };
  protected result = { clientes: this.res, }
  protected opciones = { UserScheduledEmails: this.datos }


  constructor(private dataService: DataService,private dataSimpleService: DataSimpleService) {}

  ngOnInit() {
    this.dataService.compartirSeguimiento$.subscribe((unityId: number) => {
      console.log('Recibido unityId:', unityId);
      this.compartirSegumiento(unityId);  
    });

    this.dias = [
      { name: 'Un día', value: 1 },
      { name: 'Dos días', value: 2 },
      { name: 'Tres días', value: 3 },
      { name: 'Cuatro días', value: 4 },
      { name: 'Cinco días', value: 5 }
    ];

    this.cabeceras.Servicios = {
      'ShareTracking': 'Map/compartir-seguimiento',
    }
  }

  compartirSegumiento(unityId: number) {
    this.unityId = unityId;
    this.position = 'top';
    this.visible = true;
  }

  calcularFechas(dias: number): { startDate: Date, endDate: Date } {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setHours(0, 0, 0, 0); // Set to the start of the day

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + dias);
    if (dias === 1) {
      endDate.setHours(23, 59, 0, 0); // Set to the end of the day if only one day
    } else {
      endDate.setHours(0, 0, 0, 0); // Set to the start of the day for more than one day
    }

    return { startDate, endDate };
  }

  formatFecha(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000`;
  }

  guardarValores() {
   this.correosEnString = this.values ? this.values.join(', ') : '';
  

    if (this.selecccionarDias) {
      const { startDate, endDate } = this.calcularFechas(this.selecccionarDias.value);
      // Guardar las fechas en variables si es necesario
      this.fechaInicio = this.formatFecha(startDate);
      this.fechaFin = this.formatFecha(endDate);

      this.consultas('ShareTracking');
    }
  }

  protected async consultas(entidad: string, datos?: any): Promise<void> {
    switch (entidad) {

      case 'ShareTracking':

        const dataInsert = {
          mobileUnityId: this.unityId,
          emails:this.correosEnString,
          startDate: this.fechaInicio,
          endDate:this.fechaFin,
          tokenUser:"jddjdj"
        
        };

        console.log(dataInsert);
        
         await this.consultabackInsert('ShareTracking', dataInsert).toPromise();
          
      break;
    }
  }

  private consultabackInsert(entidad: string, dataInsert?: any): Observable<any> {
    return this.dataSimpleService.Insert(this.cabeceras.Servicios[entidad], this.cabeceras.Entities[entidad], dataInsert)
      .pipe(
        tap(response => {

         //this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha creado la geocerca exitosamente' });
    
        }),
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error)
        }));
  }
}
