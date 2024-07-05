import { ProductService } from './../../../../core/services/product.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { Product } from './../../../../core/models/product';
import { FormsModule } from '@angular/forms';
import { ButtonTooltiComponent } from "../../buttons/button-toolti/button-toolti.component";
import { CommonModule } from '@angular/common';


interface Column {
  field: string;
  header: string
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}


@Component({
    selector: 'app-table-sencilla',
    standalone: true,
    templateUrl: './table-sencilla.component.html',
    styleUrls: ['./table-sencilla.component.scss'],
    imports: [RouterOutlet, TableModule, ButtonModule, TagModule, TooltipModule, InputTextModule, FormsModule, ButtonTooltiComponent, CommonModule]
})
export class TableSencillaComponent implements OnInit {
  customers!: Product[];
  customer!: Product;
  customersData: any;
  statuses!: any[];
  searchTerm = '';
  all: number = 0;
  first = 0;

 

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


  constructor(private productService: ProductService) {}

  cols!: Column[];
  exportColumns!: ExportColumn[];

  ngOnInit(): void {
    this.productService.getProductsWithOrdersSmall().then((data) => (
      this.customers = data,
      this.all = data.length
      ));

    this.cols = [
      { field: 'nombre', header: 'Nombre', customExportHeader: 'Clientes' },
      { field: 'plan', header: 'Plan' },
      { field: 'correo', header: 'Correo Electrónico' },
      { field: 'tipoUsuario', header: 'Tipo de usuario' },
      { field: 'departamento', header: 'Departamento' },
      { field: 'ciudad', header: 'Ciudad' },
      { field: 'estado', header: 'Estado' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

  }

  getSeverity(status: string): string{
    switch (status) {
        case 'Active':
            return 'success';
        case 'Inactive':
            return 'danger';
        default:
          return ''
    }
  }

  filterCustomers() {
    return this.customers.filter(customer =>
      customer.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

//   clear(table: Table) {
//     table.clear();
//     this.searchTerm = ''
// }

  // exportPdf() {
  //   import('jspdf').then((jsPDF) => {
  //       import('jspdf-autotable').then((x) => {
  //           const doc = new jsPDF.default('landscape', 'px', 'a4');
  //           (doc as any).autoTable(this.exportColumns, this.customers);
  //           doc.save('products.pdf');
  //       });
  //   });
  // }

  // exportExcel() {
  //   import('xlsx').then((xlsx) => {
  //       const worksheet = xlsx.utils.json_to_sheet(this.customers);
  //       const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  //       const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //       this.saveAsExcelFile(excelBuffer, 'products');
  //   });
  // }

  // saveAsExcelFile(buffer: any, fileName: string): void {
  //     let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //     let EXCEL_EXTENSION = '.xlsx';
  //     const data: Blob = new Blob([buffer], {
  //         type: EXCEL_TYPE
  //     });
  //     FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // }

 

  // pageChange(event: any) {
  //     this.first = event.first;
  //     this.rows = event.rows;
  // }

  // isLastPage(): boolean {
  //     return this.customers ? this.first === this.customers.length - this.rows : true;
  // }

  // isFirstPage(): boolean {
  //     return this.customers ? this.first === 0 : true;
  // }


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
