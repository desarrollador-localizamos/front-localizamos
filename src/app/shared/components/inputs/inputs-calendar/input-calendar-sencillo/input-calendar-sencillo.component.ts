import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-input-calendar-sencillo',
  standalone: true,
  imports: [CalendarModule,FormsModule],
  templateUrl: './input-calendar-sencillo.component.html',
  styleUrl: './input-calendar-sencillo.component.scss'
})
export class InputCalendarSencilloComponent {
  date2: Date | undefined;
}
