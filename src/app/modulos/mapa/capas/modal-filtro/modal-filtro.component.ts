import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BurgerMenuService } from '../../../../burger-menu.service';
import { DataService } from '../../../../core/services/data.service';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonTooltiComponent } from "../../../../shared/components/buttons/button-toolti/button-toolti.component";


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-modal-filtro',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, FormsModule, InputIconModule, IconFieldModule, TagModule, DataViewModule, CardModule,
    CommonModule, DividerModule, CheckboxModule, ButtonTooltiComponent],
  templateUrl: './modal-filtro.component.html',
  styleUrls: ['./modal-filtro.component.scss']
})
export class ModalFiltroComponent implements OnInit {

 checked: boolean = false;

  visible: boolean = false;
  protected result: any = {};

  public list: { [key: string]: any[] } = {   
    MobileUnities:  [
      {campo:"endreport.battery", texto: "Nivel de bateria"},
      {campo:"brand", texto: "Marca"},
      {campo:"class.name", texto: "Clase"},
      {campo:"class.id", texto: "Clase"},
      {campo:"endreport.course", texto: "Orientación"},
      {campo:"createdAt", texto: "Fecha de creación"},
      {campo:"endreport.degree", texto: "Grados"},
      {campo:"device.id", texto: "Id del dispositivo"},
      {campo:"plate", texto: "placa"},
      {campo:"id", texto: "Id de la unidad"},
      {campo:"installationDate", texto: "Fecha de instalacion"},
      {campo:"soatDueDate", texto: "Fecha vencimiento soat"},
      {campo:"endreport.velocity", texto: "Velocidad"},
      {campo:"status", texto: "Estado"},
      {campo:"subclass.name", texto: "Tipo"},
      {campo:"taxesDueDate", texto: "Impuestos"},
      {campo:"techMechRevitionDueDate", texto: "Fecha vencimiento tecnomecanica"},
      {campo:"endreport.offtime", texto: "Tiempo en el mismo lugar"},
      {campo:"type.image", texto: "Imagen"},
      {campo:"type.name", texto: "Tipo de dispositivo"},
    ], 
  };

  private fieldRelations: { [key: string]: any[] } = {
    MobileUnities: ["device", "type", "subclass", "class"],
  };

  private fieldRelationsJoins: { [key: string]: any[] } = {
    MobileUnities: ["customer"],
  };

  constructor(private dataService: DataService, private burgerMenuService: BurgerMenuService) {}

  ngOnInit() {
    this.burgerMenuService.filterClick$.subscribe((state: boolean) => {
      this.handleFilterClick(state);
    });
  }

  handleFilterClick(state: boolean) {
    this.visible = state;
    if (state) {
      this.consultarActivos();
    }
  }

  consultarActivos() {
    this.dataService.fetchData(this.list, "MobileUnities", this.fieldRelations, {}, {}, undefined)
      .subscribe(response => {
        this.result = response;
        console.log("holi2", this.result);
        this.dataService.setResponse(response);
      });
  }

  
}
