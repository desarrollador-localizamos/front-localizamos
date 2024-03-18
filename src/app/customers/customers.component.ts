import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableCustomersComponent } from '../shared/components/tables/table-customers/table-customers.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [RouterOutlet, TableCustomersComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {

}
