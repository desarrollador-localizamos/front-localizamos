import { Component } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-input-file-sencillo',
  standalone: true,
  imports: [FileUploadModule],
  templateUrl: './input-file-sencillo.component.html',
  styleUrl: './input-file-sencillo.component.scss'
})
export class InputFileSencilloComponent {

   /* valor input file */

   maxFileSize: number = 1000000;


   onUpload(event: any) {
    // Manejo del evento de subida de archivo
    console.log('File uploaded:', event);
  }
}
