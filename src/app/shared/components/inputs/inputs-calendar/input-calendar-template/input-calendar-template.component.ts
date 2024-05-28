import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-calendar-template',
  standalone: true,
  imports: [CalendarModule, FormsModule],
  templateUrl: './input-calendar-template.component.html',
  styleUrl: './input-calendar-template.component.scss'
})
export class InputCalendarTemplateComponent {

  date3: Date | undefined;
}
