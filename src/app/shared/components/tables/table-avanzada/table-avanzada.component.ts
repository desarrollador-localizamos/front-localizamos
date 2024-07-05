import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../../core/interfaces/customer';
import { CustomerServiceService } from '../../../../customer-service.service';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-table-avanzada',
  standalone: true,
  imports: [TableModule, HttpClientModule, TagModule],
  providers: [CustomerServiceService],
  templateUrl: './table-avanzada.component.html',
  styleUrl: './table-avanzada.component.scss'
})
export class TableAvanzadaComponent {
  customers!: Customer[];
  searchValue: string | undefined;

  constructor(private customerService: CustomerServiceService) {}

  ngOnInit() {
      this.customerService.getCustomersMedium().then((data) => {
          this.customers = data;
      });
  }

  calculateCustomerTotal(name: string) {
      let total = 0;

      if (this.customers) {
          for (let customer of this.customers) {
              if (customer.representative?.name === name) {
                  total++;
              }
          }
      }

      return total;
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = ''
}

  getSeverity(status: string): string | undefined {
    switch (status) {
      case 'unqualified':
        return 'danger';
      case 'qualified':
        return 'success';
      case 'new':
        return 'info';
      case 'negotiation':
        return 'warning';
      case 'renewal':
        return ''; // Return an empty string instead of null
      default:
        return undefined;
    }
  }
}
