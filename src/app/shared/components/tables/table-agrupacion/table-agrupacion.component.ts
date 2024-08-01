import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { TagModule } from 'primeng/tag';

interface EstructuraData {
  id: number;
  email: string;
  [key: string]: any;
}

@Component({
  selector: 'app-table-agrupacion',
  standalone: true,
  imports: [TableModule, HttpClientModule, TagModule],
  templateUrl: './table-agrupacion.component.html',
  styleUrl: './table-agrupacion.component.scss'
})
export class TableAgrupacionComponent implements OnInit {

  @Input() data: any; // Aca viene la data
  @Input() paginator: boolean = false;
  @Input() rows: number = 0;
  @Input() dataKey: string = "";
  @Input() rowsPerPageOptions: any = [0];
  @Input() tableId: string = "";
  @Input() headerTemplate: any;  // Nuevo input para el header
  @Input() bodyTemplate: any;    // Nuevo input para el body
  @Input() globalFilterFields: any;

  groupedData: { [key: string]: EstructuraData[] } = {};

  constructor() {}

  ngOnInit() {
    
    
    this.groupDataByEmail();
  }

  groupDataByEmail() {
    if (this.data && this.data.body) {
      this.groupedData = this.data.body.reduce((acc: { [key: string]: EstructuraData[] }, current: EstructuraData) => {
        const email = current.email;
        if (!acc[email]) {
          acc[email] = [];
        }
        acc[email].push(current);
        return acc;
      }, {});
    }
  }

  calculateCustomerTotal(email: string): number {
    return this.groupedData[email]?.length || 0;
  }
}
