import { Component, Input, Output, EventEmitter, forwardRef  } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multi-input',
  standalone: true,
  imports: [FormsModule,FloatLabelModule,InputTextModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiInputComponent),
      multi: true
    }
  ],
  templateUrl: './multi-input.component.html',
  styleUrl: './multi-input.component.scss'
})
export class MultiInputComponent implements ControlValueAccessor {


  @Input() type: string = 'text'; // Default input type
  @Input() placeholder: string = ''; // Placeholder text
  @Input() label: string = ''; // Input label
  @Input() required: boolean = false; // Whether the input is required
  @Input() value: any; // Initial value
  @Input() options: any[] = []; // Options for select input
  @Input() disabled: boolean = false; // Whether the input is disabled
  @Input() id: string = ''; // New Input for ID
  @Input() name: string = ''; // New Input for Name
  @Output() valueChange = new EventEmitter<{value: any, id: string}>(); // Output event for value changes
  
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

  onValueChange(event: any): void {
    this.value = event.target.value;
    let output = {value: this.value, id: this.id};
    this.valueChange.emit(output);
    this.onChange(this.value);
    this.onTouched();
  }
}

