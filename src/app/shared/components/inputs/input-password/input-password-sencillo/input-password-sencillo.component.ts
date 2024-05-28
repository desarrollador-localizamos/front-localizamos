import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-input-password-sencillo',
  standalone: true,
  imports: [FormsModule, PasswordModule],
  templateUrl: './input-password-sencillo.component.html',
  styleUrl: './input-password-sencillo.component.scss'
})
export class InputPasswordSencilloComponent {

  constructor(private primengConfig: PrimeNGConfig) {
    this.primengConfig.setTranslation({
      weak: 'débil',
      medium: 'medio',
      strong: 'fuerte',
      passwordPrompt: 'Introduce una contraseña'
    });
  }

  value!: string;
}
