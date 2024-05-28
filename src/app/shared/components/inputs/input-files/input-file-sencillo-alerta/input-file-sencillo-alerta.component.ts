import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast'

interface UploadEvent {
  originalEvent:  any;
  files: File[];
}

@Component({
  selector: 'app-input-file-sencillo-alerta',
  standalone: true,
  imports: [FileUploadModule,ToastModule],
  providers: [MessageService],
  templateUrl: './input-file-sencillo-alerta.component.html',
  styleUrl: './input-file-sencillo-alerta.component.scss'
})
export class InputFileSencilloAlertaComponent {


  constructor(private messageService: MessageService) {}

     maxFileSize: number = 1000000;

     onBasicUploadAuto(event: UploadEvent) {
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
    }
}
