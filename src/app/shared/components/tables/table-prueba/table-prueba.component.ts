import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PrimeNGConfig } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonTooltiComponent } from "../../buttons/button-toolti/button-toolti.component";


@Component({
    selector: 'app-table-prueba',
    standalone: true,
    templateUrl: './table-prueba.component.html',
    styleUrl: './table-prueba.component.scss',
    imports: [
        TableModule,
        CommonModule,
        InputTextModule,
        TagModule,
        DropdownModule,
        ProgressBarModule,
        ButtonModule,
        MultiSelectModule,
        SliderModule,
        FormsModule,
        TooltipModule,
        ButtonTooltiComponent
    ]
})
export class TablePruebaComponent  implements OnInit{
  @Input() data: any;
  @Input() paginator: boolean = false;
  @Input() rows: number = 0;
  @Input() dataKey: string = "";
  @Input() rowsPerPageOptions: any = [0];
  @Input() loading: boolean = true;
  @Input() tableId: string = "";
  @Input() headerTemplate: any;  // Nuevo input para el header
  @Input() bodyTemplate: any;    // Nuevo input para el body

  @ViewChild('table') table: Table | undefined;



  searchValue: string | undefined;

  constructor(private primeNGConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.loading = false;
    
    this.primeNGConfig.setTranslation({
      clear: 'limpiar',
      apply: 'aplicar',
      addRule: 'agregar regla',
      matchAll: 'coincide todo',
      matchAny: 'coincide con cualquier',
      startsWith: 'comienza con',
      contains: 'contiene',
      notContains: 'no contiene',
      endsWith: 'termina con',
      equals: 'es igual a',
      notEquals: 'no es igual a'
     
  });
  

  }

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const value = inputElement.value;
      this.table?.filterGlobal(value, 'contains');
    }
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }


  pdf(){

  }


  excel(){
    
  }

}


