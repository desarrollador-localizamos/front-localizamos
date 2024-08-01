import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

export interface data {
  name: string;
  icon?: string;
  value: any | null;
}

@Component({
  selector: 'app-select-avanzado',
  standalone: true,
  imports: [FormsModule, DropdownModule],
  templateUrl: './select-avanzado.component.html',
  styleUrl: './select-avanzado.component.scss'
})
export class SelectAvanzadoComponent {
  [x: string]: any;
  @Input() options: data[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() styleClass: string = 'w-20rem';
  @Input() reset: boolean = false;
  @Output() selectionChange = new EventEmitter<data>();

  selectedOption: data | undefined;
  filterValue: string = '';

  onSelectionChange() {
    this.selectionChange.emit(this.selectedOption);
  }

  public clear() {
    this.selectedOption = undefined;
    this.filterValue = '';
    this.selectionChange.emit({ name: '', value: null });
  }
  
}