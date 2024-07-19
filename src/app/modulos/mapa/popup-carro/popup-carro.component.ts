import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup-carro',
  standalone: true,
  imports: [],
  templateUrl: './popup-carro.component.html',
  styleUrl: './popup-carro.component.scss'
})
export class PopupCarroComponent {
  @Input() reportDate: string = '';
  @Input() reportHour: string = '';
  @Input() additionalInfo: string = '';
  @Input() img: string = '';
  
  

  // Método para generar el contenido HTML
  getPopupContent(): string {
    return `
      <div style="display: flex; align-items: center;">
        <img src="${this.img}" alt="Car" style="width: 50px; height: 50px; border-radius: 50%; object-fit: contain; border: 3px solid #6b7280; margin-right: 10px;">
        <div>
          <div><span style="color: #4e525b;
    font-size: 14px;
    font-weight: 600;">Última ubicación: </span></div>
          <div>${this.additionalInfo}</div>
          <div>${this.reportDate}</div>
           <div>${this.reportHour}</div>
        </div>
      </div>
    `;
  }
}
