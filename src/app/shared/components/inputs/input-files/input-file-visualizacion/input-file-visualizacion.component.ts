import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-input-file-visualizacion',
  standalone: true,
  imports: [FileUploadModule, ToastModule, CommonModule],
  providers: [MessageService],
  templateUrl: './input-file-visualizacion.component.html',
  styleUrls: ['./input-file-visualizacion.component.scss']
})
export class InputFileVisualizacionComponent {

  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {}

  onUpload(event: any) { // Cambiar el tipo de evento a any
      for (let file of event.files) {
          // Crear una URL temporal para la imagen
          const objectURL = URL.createObjectURL(file);
          // Añadir el archivo y la URL temporal a uploadedFiles
          this.uploadedFiles.push({
              name: file.name,
              size: file.size,
              objectURL: objectURL
          });
      }

      this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  ngOnDestroy() {
      // Revocar las URLs temporales para evitar fugas de memoria
      for (let file of this.uploadedFiles) {
          URL.revokeObjectURL(file.objectURL);
      }
  }
}
