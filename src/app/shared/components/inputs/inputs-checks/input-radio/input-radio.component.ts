import { Component } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-radio',
  standalone: true,
  imports: [RadioButtonModule,FormsModule],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss'
})
export class InputRadioComponent {
  ingredient!: string;
}
