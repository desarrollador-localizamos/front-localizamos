import { Component } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms'


@Component({
  selector: 'app-input-mask',
  standalone: true,
  imports: [FormsModule, InputMaskModule],
  templateUrl: './input-mask.component.html',
  styleUrl: './input-mask.component.scss'
})
export class InputMaskComponent {
  value: string | undefined;
}
