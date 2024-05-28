import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';


@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [EditorModule,FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  text: string | undefined;
}
