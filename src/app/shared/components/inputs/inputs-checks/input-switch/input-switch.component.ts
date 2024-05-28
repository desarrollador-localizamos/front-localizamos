import { Component } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-switch',
  standalone: true,
  imports: [InputSwitchModule,FormsModule],
  templateUrl: './input-switch.component.html',
  styleUrl: './input-switch.component.scss'
})
export class InputSwitchComponent {
  checked: boolean = false;
}
