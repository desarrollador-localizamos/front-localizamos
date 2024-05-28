import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ],
  imports: [DropdownModule, FormsModule],
  standalone: true
})
export class InputSelectComponent implements ControlValueAccessor {

  @Input() placeholder: string = ''; // Placeholder text
  @Input() label: string = ''; // Input label
  @Input() options: any[] = []; // Options for select input
  @Input() disabled: boolean = false; // Whether the input is disabled
  @Input() id: string = ''; // New Input for ID
  @Input() name: string = ''; // New Input for Name
  @Output() valueChange = new EventEmitter<{value: any, id: string}>(); // Output event for value changes

  value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(event: any) {
    this.valueChange.emit({ value: this.value, id: this.id });
    this.onChange(event.value);
    this.onTouched();
  }
}
