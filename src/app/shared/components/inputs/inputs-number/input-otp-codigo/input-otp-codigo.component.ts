import { Component } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-otp-codigo',
  standalone: true,
  imports: [FormsModule, InputOtpModule],
  templateUrl: './input-otp-codigo.component.html',
  styleUrl: './input-otp-codigo.component.scss'
})
export class InputOtpCodigoComponent {
  value : any
}
