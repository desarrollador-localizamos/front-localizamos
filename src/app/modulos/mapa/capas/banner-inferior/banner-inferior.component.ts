import { Component } from '@angular/core';

@Component({
  selector: 'app-banner-inferior',
  standalone: true,
  imports: [],
  templateUrl: './banner-inferior.component.html',
  styleUrl: './banner-inferior.component.scss'
})
export class BannerInferiorComponent {


  protected variable: string = '';
  protected selectTable: string = 'Devices';
  protected fieldMappings: { [key: string]: any[] } = {
      Devices: [
          { campo: 'status' },
          { campo: 'nombre' }
      ],
      Texto: [
          {}
      ]
  };

  //Para que al inciar carge todo lo que le ponga en esta función
  ngOnInit() {
      this.tabla(this.fieldMappings);
  }


  // Función para trabajar con el fieldMappings
  tabla(fieldMappings: { [key: string]: any[] }) {
      //Console log para probar que hay en device
      console.log("Devices:", this.fieldMappings['Devices']);
      //Asignamos la variable de campo a variable
      this.variable = this.fieldMappings[this.selectTable][0].campo;
  }


  //Lo datos ha mostrar
  data = {

      "header": [
          {
              "campo": "id",
              "texto": "id",
              "sortable": true,
              "filter": true
          },
          {
              "campo": "firstName",
              "texto": "Nombre",
              "sortable": true,
              "filter": true
          },
          {
              "campo": "lastName",
              "texto": "Apellido",
              "sortable": true,
              "filter": true
          },
          {
              "campo": "MobileUnityDallasKeys.codeNumber",
              "texto": "Codigo llave dallas",
              "sortable": false,
              "filter": true
          },
          {
              "campo": "MobileUnityDallasKeys.description",
              "texto": "Descripción",
              "sortable": true,
              "filter": true
          },
          {
              "campo": "status",
              "texto": "Estado",
              "sortable": true,
              "filter": true
          },
          {
              "campo": "img",
              "texto": "Imagen",
              "sortable": true,
              "filter": true
          }
      ],
      "body": [
          {
              "id": 17,
              "firstName": "jhimy alexis",
              "lastName": "montoya   suarez",
              "MobileUnityDallasKeys.codeNumber": "689744650",
              "MobileUnityDallasKeys.description": "CONDUCTOR1",
              "status": 1,
              "img": "assets/img/gato.png"
          },
          {
              "id": 5,
              "firstName": "JHONIER ALEJANDRO",
              "lastName": "LOPEZ",
              "MobileUnityDallasKeys.codeNumber": "904533496",
              "MobileUnityDallasKeys.description": "CONDUCTOR4",
              "status": 1,
               "img": "assets/img/gato.png"
              
          },
          {
              "id": 4,
              "firstName": "DEIBY",
              "lastName": "CARDONA",
              "MobileUnityDallasKeys.codeNumber": "546709279",
              "MobileUnityDallasKeys.description": "CONDUCTOR3",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 21,
              "firstName": "luis eduardo",
              "lastName": "acevedo olaya",
              "MobileUnityDallasKeys.codeNumber": "689744650",
              "MobileUnityDallasKeys.description": "CONDUCTOR1",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 22,
              "firstName": "jose wilmer",
              "lastName": "pulgarin gomez",
              "MobileUnityDallasKeys.codeNumber": "689744650",
              "MobileUnityDallasKeys.description": "CONDUCTOR1",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 23,
              "firstName": "martin mauricio",
              "lastName": "mejia gomez",
              "MobileUnityDallasKeys.codeNumber": "689744650",
              "MobileUnityDallasKeys.description": "CONDUCTOR1",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 24,
              "firstName": "YEFERSON",
              "lastName": "ZAMBANO ANDRADE",
              "MobileUnityDallasKeys.codeNumber": "689744650",
              "MobileUnityDallasKeys.description": "CONDUCTOR1",
              "status": 0,
               "img": "assets/img/gato.png"
          },
          {
              "id": 25,
              "firstName": "GERMAN DAVID",
              "lastName": "RAYO ARCILA",
              "MobileUnityDallasKeys.codeNumber": "689744650",
              "MobileUnityDallasKeys.description": "CONDUCTOR1",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 6,
              "firstName": "ALEJANDRO",
              "lastName": "RODRIGUEZ",
              "MobileUnityDallasKeys.codeNumber": "864014131",
              "MobileUnityDallasKeys.description": "CONDUCTOR7",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 2,
              "firstName": "Alvaro Torres",
              "lastName": "TORRES",
              "MobileUnityDallasKeys.codeNumber": "689744650",
              "MobileUnityDallasKeys.description": "CONDUCTOR1",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 3,
              "firstName": "Danilo Diaz",
              "lastName": "Diaz",
              "MobileUnityDallasKeys.codeNumber": "756360590",
              "MobileUnityDallasKeys.description": "CONDUCTOR2",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 8,
              "firstName": "Rigo",
              "lastName": "Reyes",
              "MobileUnityDallasKeys.codeNumber": "010F3E4801000068",
              "MobileUnityDallasKeys.description": "LLAVE1 - AZUL",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 9,
              "firstName": "Argemiro",
              "lastName": "Duran",
              "MobileUnityDallasKeys.codeNumber": "018008341900006B",
              "MobileUnityDallasKeys.description": "LLAVE2 - NEGRO",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 10,
              "firstName": "Guillermo",
              "lastName": "castro",
              "MobileUnityDallasKeys.codeNumber": "001003",
              "MobileUnityDallasKeys.description": "Conductor 1",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 11,
              "firstName": "Jeison",
              "lastName": "Bejarano",
              "MobileUnityDallasKeys.codeNumber": "689744650",
              "MobileUnityDallasKeys.description": "CONDUCTOR1",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 12,
              "firstName": "Andrés Felipe",
              "lastName": "Posada Ospina",
              "MobileUnityDallasKeys.codeNumber": "689744650",
              "MobileUnityDallasKeys.description": "CONDUCTOR1",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 14,
              "firstName": "Alvaro",
              "lastName": "torres",
              "MobileUnityDallasKeys.codeNumber": "e3bb7a924e9a",
              "MobileUnityDallasKeys.description": "LLave dallas alvaro torres",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 15,
              "firstName": "conductor 1 (prueba)",
              "lastName": "undefined",
              "MobileUnityDallasKeys.codeNumber": "D6C3893636A6",
              "MobileUnityDallasKeys.description": "llave de PFE427",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 13,
              "firstName": "EDUAR",
              "lastName": "PACHECO",
              "MobileUnityDallasKeys.codeNumber": "BOBCAT S570 EDUAR",
              "MobileUnityDallasKeys.description": "MINICARGADOR",
              "status": 1,
               "img": "assets/img/gato.png"
          },
          {
              "id": 16,
              "firstName": "luis francisco",
              "lastName": "arcila arias",
              "MobileUnityDallasKeys.codeNumber": "689744650",
              "MobileUnityDallasKeys.description": "CONDUCTOR1",
              "status": 0,
               "img": "assets/img/gato.png"
          }
      ]

  };

  // La función simplemente devuelve el valor de la propiedad campo del objeto row. Por ejemplo, si row = {id: 1, name: "John"} y campo = "name", la función devolverá "John".
  getCellValue(row: any, campo: string): any {
      return row[campo];
  }

  //Mira si el campo que viene en variable que sea igual al campo este 
  isStatus(campo: string): boolean {
      return campo === this.variable;
}


isPanelVisible: boolean = false;

togglePanel() {
this.isPanelVisible = !this.isPanelVisible;
}


}
