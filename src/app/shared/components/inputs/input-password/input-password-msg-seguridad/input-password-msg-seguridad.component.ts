import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { PrimeNGConfig } from 'primeng/api';



@Component({
  selector: 'app-input-password-msg-seguridad',
  standalone: true,
  imports: [FormsModule, PasswordModule, DividerModule],
  templateUrl: './input-password-msg-seguridad.component.html',
  styleUrl: './input-password-msg-seguridad.component.scss'
})
export class InputPasswordMsgSeguridadComponent {

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
