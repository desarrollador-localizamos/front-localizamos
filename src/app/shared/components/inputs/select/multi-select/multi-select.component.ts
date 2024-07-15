import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface dataMulti {
  id: number
  name: string,
}

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [FormsModule, MultiSelectModule],
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent {
  @Input() options: dataMulti[] = [];
  @Input() placeholder: string = 'Seleccionar cliente';
  @Input() styleClass: string = 'w-20rem';
  @Output() selectionChange = new EventEmitter<dataMulti[]>();

  selectedOptions: dataMulti[] = [];
  filterValue: string = '';

  onSelectionChange() {
    this.selectionChange.emit(this.selectedOptions);
  }
}
