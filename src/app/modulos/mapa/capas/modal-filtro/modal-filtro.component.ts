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
  checkedStates: { [key: string]: boolean } = {};
  searchTerm: string = '';
  filteredResults: any[] = [];
  visible: boolean = false;
  disminuir: boolean = false;
  protected result: any = {};
  allResults: any[] = []; // Nueva propiedad para almacenar todos los resultados


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

    Devices_:  [
      {"campo":"mobileUnities.plate","texto":"placa"},
      {"campo":"mobileUnities.id","texto":"Id de la unidad"},
      {"campo":"mobileUnities.endreport.device_date_hour","texto":"hora"},
      {"campo":"mobileUnities.endreport.velocity","texto":"Velocidad"},
      {"campo":"mobileUnities.endreport.customer_name","texto":"nombre"},
      {"campo":"mobileUnities.endreport.mobilestatus","texto":"Estado"},
      {"campo":"mobileUnities.id","texto":"id"},
      {"campo":"customerId","texto":"Customer"},
      {"campo":"Apagado","texto":""}
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


  consultarActivos() {
    this.dataService.fetchData(this.list, "Devices", this.fieldRelations, {"customerId":1655}, {}, undefined)
      .subscribe(response => {
        this.result = response;
        this.allResults = this.result.body || []; // Guarda todos los resultados
        this.filteredResults = this.allResults; // Inicialmente, muestra todos los resultados
        console.log("holi2", this.result);
        this.dataService.setResponseFiltro(response);
      });
  }

  filterResults() {
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

  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.filterResults();
  }

  handleFilterClick(state: boolean) {
    this.visible = state;
    if (state) {
      this.consultarActivos();
    }
  }

  toggleDisminuir(): void {
    this.disminuir = !this.disminuir;
    console.log('Cambio el valor a', this.disminuir);
  }

  seleccionar() {
    this.filteredResults.forEach(item => {
      this.checkedStates[item.mobileUnitiesid] = true;
    });
    console.log('Selected items:', this.getSelectedItems());
  }

  limpiar() {
    this.filteredResults.forEach(item => {
      this.checkedStates[item.mobileUnitiesid] = false;
    });
    console.log('Cleared selection');
  }

  getSelectedItems() {
    return this.filteredResults.filter(item => this.checkedStates[item.mobileUnitiesid]);
  }

  
  functionMovimiento() {
    console.log('Movimiento');
  }

  functionDetenido() {
    console.log('Detenido');
  }

  functionApagado() {
    console.log('Apagado');
    this.dataService.fetchDataFiltroFunciones(this.list, "Devices_", this.fieldRelations, {"customerId":1655}, {}, {},{}, 0,"filtro")
      .subscribe(response => {
        this.result = response;
        this.allResults = this.result.body || []; // Guarda todos los resultados
        this.filteredResults = this.allResults; // Inicialmente, muestra todos los resultados
        console.log("holi2", this.result);
        this.dataService.setResponseFiltro(response);
      });
  }

  functionSinReportar() {
    console.log('Sin reportar');
  }


}
