import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-check',
  standalone: true,
  imports: [CheckboxModule,FormsModule],
  templateUrl: './input-check.component.html',
  styleUrl: './input-check.component.scss'
})
export class InputCheckComponent {
  checked: boolean = false;
}
