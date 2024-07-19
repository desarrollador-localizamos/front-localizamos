import { Component,EventEmitter,Input, Output  } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-button-toolti',
  standalone: true,
  imports: [ButtonModule,TooltipModule],
  templateUrl: './button-toolti.component.html',
  styleUrl: './button-toolti.component.scss'
})
export class ButtonTooltiComponent {

  @Input() icon: string | undefined;
  @Input() tooltipPosition: string | undefined;
  @Input() tooltipText: string | undefined;
  @Input()rounded: boolean = false;
  @Input() text: boolean = false ;
  @Input() severity: string | undefined;
  @Input() styles: any = {}; 

  @Output() onClick = new EventEmitter<void>();


  handleClick() {
    this.onClick.emit();
  }

}
