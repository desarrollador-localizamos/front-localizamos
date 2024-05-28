import { Component } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-textarea',
  standalone: true,
  imports: [FormsModule, InputTextareaModule],
  templateUrl: './input-textarea.component.html',
  styleUrl: './input-textarea.component.scss'
})
export class InputTextareaComponent {
  value!: string;
}
