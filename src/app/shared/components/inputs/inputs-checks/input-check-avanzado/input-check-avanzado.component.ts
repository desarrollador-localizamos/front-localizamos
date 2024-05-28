import { Component } from '@angular/core';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-check-avanzado',
  standalone: true,
  imports: [FormsModule, TriStateCheckboxModule],
  templateUrl: './input-check-avanzado.component.html',
  styleUrl: './input-check-avanzado.component.scss'
})
export class InputCheckAvanzadoComponent {
  value: boolean | null = null;
}
