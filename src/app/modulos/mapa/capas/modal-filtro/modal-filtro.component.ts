import { Component, OnInit, ViewChild } from '@angular/core';
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
import { DataView } from 'primeng/dataview';

@Component({
  selector: 'app-modal-filtro',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, FormsModule, InputIconModule, IconFieldModule, TagModule, DataViewModule, CardModule,
    CommonModule, DividerModule, CheckboxModule, ButtonTooltiComponent],
  templateUrl: './modal-filtro.component.html',
  styleUrls: ['./modal-filtro.component.scss']
})
export class ModalFiltroComponent implements OnInit {

  @ViewChild('dv') dataView!: DataView;
  protected checkedStates: { [key: string]: boolean } = {};
  protected searchTerm: string = '';
  protected filteredResults: any[] = [];
  protected visible: boolean = false;
  protected disminuir: boolean = false;
  protected result: any = {};
  protected allResults: any[] = []; 
  protected selectedIds: number[] = []; // Array para almacenar los IDs seleccionados



  public list: { [key: string]: any[] } = {   

    Devices:  [
      {"campo":"mobileUnities.plate","texto":"placa"},
      {"campo":"mobileUnities.id","texto":"Id de la unidad"},
      {"campo":"mobileUnities.endreport.device_date_hour","texto":"hora"},
      {"campo":"mobileUnities.endreport.velocity","texto":"Velocidad"},
      {"campo":"mobileUnities.endreport.customer_name","texto":"nombre"},
      {"campo":"mobileUnities.endreport.mobilestatus","texto":"Estado"},
      {"campo":"mobileUnities.id","texto":"id"},
      {"campo":"customerId","texto":"Customer"}
    ], 

  };

  private fieldRelations: { [key: string]: any[] } = {
    Devices: ["mobileUnities"],

    Devices_: ["mobileUnities"],
  };

  private fieldRelationsJoins: { [key: string]: any[] } = {
  
    MobileUnities: [
     {"mainkey":"id", "join":"MobileUnityDrivers","joinkey":"mobileUnityId"},
    ],

    MobileUnityEvents: [
     {"mainkey":"evenTypeId", "join":"EventTypes","joinkey":"id"},
    ],
   };

 
  constructor(private dataService: DataService, private burgerMenuService: BurgerMenuService) {}

  ngOnInit() {
    this.burgerMenuService.filterClick$.subscribe((state: boolean) => {
      this.handleFilterClick(state);
    });
  }


  protected consultarActivos() {
    this.dataService.fetchData(this.list, "Devices", this.fieldRelations, {"customerId":1655}, {}, undefined, "", 0, "filtro")
      .subscribe(response => {
        this.result = response;
        this.allResults = this.result.body[0] || []; // Guarda todos los resultados
        this.filteredResults = this.allResults; // Inicialmente, muestra todos los resultados
        console.log("holi2", this.result);
        this.dataService.setResponseFiltro(response);
      });
  }

  protected functionMovimiento() {
    console.log('Movimiento');
    this.filteredResults = this.result.body[2] || []; 
  }
  
  protected functionDetenido() {
    console.log('Detenido');
    this.filteredResults = this.result.body[4] || []; 
  }
  
  protected functionApagado() {
    console.log('Apagado');
    this.filteredResults = this.result.body[1] || []; 
  }
  
  protected functionSinReportar() {
    console.log('Sin reportar');
    this.filteredResults = this.result.body[3] || [];
  }
  
  protected functionTotal() {
    console.log('Total');
    this.filteredResults = this.result.body[0] || [];
  }

  protected filterResults() {
    if (!this.searchTerm) {
      this.filteredResults = this.allResults;
    } else {
      this.filteredResults = this.allResults.filter((item: any) =>
        item.mobileUnitiesplate && item.mobileUnitiesplate.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    // Resetea la paginación al primer página después de filtrar
    if (this.dataView) {
      this.dataView.first = 0;
    }
  }

  protected onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.filterResults();
  }

  protected handleFilterClick(state: boolean) {
    this.visible = state;
    if (state) {
      this.consultarActivos();
    }
  }

  protected toggleDisminuir(): void {
    this.disminuir = !this.disminuir;
    console.log('Cambio el valor a', this.disminuir);
  }

  seleccionar() {
    // Marcar todos los elementos como seleccionados
    this.filteredResults.forEach(item => {
      this.checkedStates[item.mobileUnitiesid] = true;
    });
    
    // Actualizar la lista de IDs seleccionados
    this.updateSelectedIds();
  }
  
  limpiar() {
    // Desmarcar todos los elementos
    this.filteredResults.forEach(item => {
      this.checkedStates[item.mobileUnitiesid] = false;
    });
    
    // Limpiar la lista de IDs seleccionados
    this.selectedIds = [];
    this.updateSelectedIds();
    console.log('Cleared selection');
  }
  
  protected getSelectedItems() {
    this.selectedIds = this.filteredResults
      .filter(item => this.checkedStates[item.mobileUnitiesid])
      .map(item => item.mobileUnitiesid);
  
    this.updateSelectedIds();
    return this.selectedIds;
  }
  
  updateSelectedIds() {
    // Obtener la lista de IDs seleccionados sin duplicados
    const newSelectedIds = this.filteredResults
      .filter(item => this.checkedStates[item.mobileUnitiesid])
      .map(item => item.mobileUnitiesid);
    
    // Actualizar `selectedIds` con los nuevos IDs únicos
    this.selectedIds = newSelectedIds;
  
    // Actualizar el servicio con los IDs seleccionados o vacíos
    if (this.selectedIds.length === 0) {
      this.dataService.setUbicationValues([]);
    } else {
      this.dataService.setUbicationValues(this.selectedIds);
    }
  
    console.log('Selected IDs:', this.selectedIds);
  }


}
