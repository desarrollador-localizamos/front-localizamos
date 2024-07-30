import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

export interface data {
  name: string;
  icon?: string;
  value: any;
}


@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [FormsModule, MultiSelectModule],
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent {
  @Input() options: data[] = [];
  @Input() placeholder: string = 'Seleccionar cliente';
  @Input() styleClass: string = 'w-20rem';
  @Output() selectionChange = new EventEmitter<data[]>();

  selectedOptions: data[] = [];
  filterValue: string = '';

  onSelectionChange() {
    this.selectionChange.emit(this.selectedOptions);
  }
}
