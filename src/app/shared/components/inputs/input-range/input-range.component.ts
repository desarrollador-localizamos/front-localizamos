import { Component } from '@angular/core';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-range',
  standalone: true,
  imports: [SliderModule,FormsModule],
  templateUrl: './input-range.component.html',
  styleUrl: './input-range.component.scss'
})
export class InputRangeComponent {

  
    /* valor slider */
    value: number = 15; 

}
