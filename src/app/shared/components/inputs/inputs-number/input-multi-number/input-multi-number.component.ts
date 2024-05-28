import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-multi-number',
  standalone: true,
  imports: [FormsModule, InputNumberModule],
  templateUrl: './input-multi-number.component.html',
  styleUrl: './input-multi-number.component.scss'
})
export class InputMultiNumberComponent {

  value1: number = 42723;

}
