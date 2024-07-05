import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button-sencillo',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './button-sencillo.component.html',
  styleUrls: ['./button-sencillo.component.scss']
})
export class ButtonSencilloComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() color: string = 'primary'; // Puedes usar valores como 'primary', 'secondary', etc.
  @Input() size: string = 'md'; // Puedes usar valores como 'sm', 'md', 'lg'
  @Input() border: string = 'none'; // Puedes definir bordes personalizados
  @Input() loading: boolean = false;

  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }

  getStyleClass(): string {
    let classes = '';
  
    // Añadir clase de color
    if (this.color) {
      classes += `btn-${this.color} `;
    }
  
    // Añadir clase de tamaño
    if (this.size) {
      classes += `btn-${this.size} `;
    }
  
    // Añadir clase de borde
    if (this.border !== 'none') {
      classes += 'btn-border ';
    }
  
    return classes.trim();
  }
}
