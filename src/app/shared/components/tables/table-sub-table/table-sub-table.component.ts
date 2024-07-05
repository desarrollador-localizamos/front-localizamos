import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';;
import { FormsModule } from '@angular/forms';
import { ButtonTooltiComponent } from "../../buttons/button-toolti/button-toolti.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-sub-table',
  standalone: true,
  imports: [RouterOutlet, TableModule, ButtonModule, TagModule, TooltipModule, InputTextModule, FormsModule, ButtonTooltiComponent, CommonModule],
  templateUrl: './table-sub-table.component.html',
  styleUrl: './table-sub-table.component.scss'
})
export class TableSubTableComponent implements OnInit {

   

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


  ngOnInit(): void {

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
