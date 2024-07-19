import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-rotatedmarker';
import { CardModule } from 'primeng/card';
import { DataService } from '../../core/services/data.service';
import { Observable, Subscription, } from 'rxjs';
import { ButtonTooltiComponent } from "../../shared/components/buttons/button-toolti/button-toolti.component";
import { BannerInferiorComponent } from "./capas/banner-inferior/banner-inferior.component";
import { ModalFiltroComponent } from "./capas/modal-filtro/modal-filtro.component";
import { VentanaInfoAccionComponent } from "./capas/ventana-info-accion/ventana-info-accion.component";
import { PopupCarroComponent } from "./popup-carro/popup-carro.component";
import { icon, marker } from 'leaflet';
@Component({
    selector: 'app-mapa',
    standalone: true,
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
    imports: [CardModule, ButtonTooltiComponent, BannerInferiorComponent, ModalFiltroComponent, VentanaInfoAccionComponent,
       PopupCarroComponent]
})
export class MapaComponent  implements AfterViewInit{

  
// =========== VARIBALES ========= //
ubicationValues: number[] = [];
private ubicationSubscription: Subscription | undefined;
protected realtime = false;

protected selectedLink: string = '';
protected result: any = {};
protected result2: any = {};
result$: Observable<any> | undefined;
subscription: Subscription | undefined;
protected formData: FormData | undefined;

// =========== VARIBALES MOBILEUNIT ========= //
protected mobileUnit = null;

// =========== VARIBALES MAPA ========= //
protected urlImage!: string;
protected urlImage2!: string;
private map!: L.Map;
private carIcon!: L.Icon;
private carMarker!: L.Marker;
protected zoom!: number;
protected openZoom: number;
protected classIds: number;

@ViewChild(VentanaInfoAccionComponent) ventanaInfoAccion!: VentanaInfoAccionComponent;
@ViewChild('popupContainer', { static: true }) popupContainer!: ElementRef;
    public list: { [key: string]: any[] } = {   
   
     MobileUnities:  [
      {campo:"id", texto: "Id de la unidad"},
      {campo:"plate", texto: "placa"},
      {campo:"endreport.customer_name", texto: "Nombre del customer"},
      {campo:"endreport.velocity", texto: "velocidad"},
      {campo:"endreport.temperature", texto: "temperatura"},
      {campo:"endreport.battery", texto: "Placa"},
      {campo:"endreport.course", texto: "Curso"},
      {campo:"endreport.degree", texto: "Grados"},
      {campo:"brand", texto: "Marca"},
      {campo:"model", texto: "Modelo"},
      {campo:"device.deviceType.brand.name", texto: "Tipo de dispositivo"},
      {campo:"device.deviceType.code", texto: "Referencia del dispositivo"},
      {campo:"class.name", texto: "clase"},
      {campo:"device.imei", texto: "imei "},
      {campo:"device.simcard.lineNumber", texto: "sim"},
      {campo:"device.simcard.imei", texto: "iccid"},
      {campo:"device.simcard.simcardPlan.name", texto: "iccid"},
      {campo:"endreport.offtime.address", texto: "fecha"}, // falta ingresar al objeto
      {campo:"endreport.location", texto: "coordenadas"},
      {campo:"endreport.eventOn.address", texto: "dirección"},
      {campo:"endreport.battery", texto: "bateria"},
      {campo:"endreport.timeOff", texto: "tiempo en el mismo lugar"},  // falta calculo desde el back
      {campo:"endreport.device_date_hour", texto: "fecha gps"},  // falta calculo desde el back
      {campo:"subclass.name", texto: "Sub clase"},
      {campo:"MobileUnityDrivers.firstName", texto: "conductor"},
      {campo:"MobileUnityDrivers.lastName", texto: "conductor"},
      {campo:"class.id", texto: "clase"},
      {campo:"subclass.id", texto: "Sub clase"},
      {campo:"taxesDueDate", texto: "Venc Impuestos"},
      {campo:"techMechRevitionDueDate", texto: "Venc Tecnomecanica"},
      {campo:"soatDueDate", texto: "Venc Soat"},
      {campo:"installationDate", texto: "Fecha instalacion"},
      {campo:"status", texto: "Estado actual"}, //falta este dato que viene de un calculo 
      {campo:"type.image", texto: "imagen"},
     ],

     MobileUnityEvents:  [
      {campo:"id", texto: "unidad movil"},
      {campo:"unityId", texto: "unidad movil"},
      {campo:"status", texto: "estado"},
      {campo:"address", texto: "direccion"},
      {campo:"deviceDateHour", texto: "hora"},
      {campo:"eventTypeId", texto: "hora"},
      {campo:"EventTypes.name", texto: "hora"},
     ] 
     
    };

    private fieldRelations: { [key: string]: any[] } = {
      MobileUnities: [
       "device","device.simcard","device.simcard.simcardPlan", "type", "subclass", "class",
       "device.deviceType","device.deviceType.brand","subclass", 
      ],
    };

    private fieldRelationsJoins: { [key: string]: any[] } = {
  
     MobileUnities: [
      {"mainkey":"id", "join":"MobileUnityDrivers","joinkey":"mobileUnityId"},
     ],

     MobileUnityEvents: [
      {"mainkey":"evenTypeId", "join":"EventTypes","joinkey":"id"},
     ],
    };

    constructor(private dataService: DataService) {

      // ======= VARIABLES INICIALES DEL MAPA  ========//
      this.zoom = 12; // Nivel de zoom inicial
      this.openZoom = 17; // Nivel de zoom al que se quiere llegar
      this.classIds = 0;
    }

    ngOnInit() {
      this.ubicationSubscription = this.dataService.getUbicationValue().subscribe(
        values => {
          this.ubicationValues = values;
        }
      );
      this.initMap();
      this.refreshMap();
    }

    ngAfterViewInit() {
      // Suscríbete al evento refresh del componente hijo
      this.ventanaInfoAccion.refresh.subscribe(() => this.refreshMap());
    }
  
    visudata() {
      this.dataService.getResponse().subscribe(response => {
        this.result2 = response;
  
        if (this.result2 && this.result2["body"] && this.result2["body"].length > 0) {
        
        }
        this.addLayers();
      });
    }
  
    private initMap(): void {
      this.map = L.map('map', {
        center: [4.81333, -75.69611], // Coordenadas iniciales del centro
        zoom: this.zoom, // Nivel de zoom inicial
        zoomControl: false // Desactiva el control de zoom por defecto de Leaflet
      });
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
  
      L.control.zoom({
        position: 'bottomleft' // Ubica el control de zoom en la esquina inferior izquierda
      }).addTo(this.map);
  
      // Transición suave al zoom 16
      setTimeout(() => {
        this.map.flyTo([4.81333, -75.69611], this.openZoom, {
          duration: 3 
        });
      }, 1000); 
    }
  
    refreshMap() {
      console.log(this.ubicationValues);
  
      if (this.ubicationValues && this.ubicationValues.length > 0) {
        const ubicationIds = this.ubicationValues;
   
        this.dataService.fetchData(this.list, "MobileUnities", this.fieldRelations,{}, this.fieldRelationsJoins, [{ "ref": "id", "valor": ubicationIds, "tipo" : "in" }])
        .subscribe(response => {

          console.log("response",response["body"][0][0]);
          

          if (response["body"][0][0] != null) {
            const classId = response["body"][0][0]["classid"];
            const typeImage = response["body"][0][0]["typeimage"];
 
            switch (classId) {
              case 1:
                this.urlImage = '../../../assets/images/mobile_unity_types/vehiculo_de_transporte/' + typeImage;
                this.urlImage2 = '../../../assets/images/mobile_unity_types_lateral/vehiculo_de_transporte/'+ typeImage;
                break;
              case 2:
                this.urlImage = '../../../assets/images/mobile_unity_types/mascota/' + typeImage;
                this.urlImage2 = '../../../assets/images/mobile_unity_types_lateral/mascota/'+ typeImage;
                break;
              case 3:
                this.urlImage = '../../../assets/images/mobile_unity_types/persona/' + typeImage;
                this.urlImage2 = '../../../assets/images/mobile_unity_types_lateral/persona/'+ typeImage;
                break;
              case 4:
                this.urlImage = '../../../assets/images/mobile_unity_types/moto/' + typeImage;
                this.urlImage2 = '../../../assets/images/mobile_unity_types_lateral/moto/'+ typeImage;
                break;
              case 5:
                this.urlImage = '../../../assets/images/mobile_unity_types/maquina_amarilla/' + typeImage;
                this.urlImage2 = '../../../assets/images/mobile_unity_types_lateral/maquina_amarilla/'+ typeImage;  
                break;
              default:
            }
          }
       
          if (ubicationIds.length === 1) {
            // Lógica para cuando hay solo un valor en el arreglo
            if(true === this.realtime){
              //realtime
            }else{
              //envio de informacion para el banner-lateral y el divinfo
              this.dataService.setResponse(response);

              let resultado = response["body"];
              console.log("result",resultado);
              
              if(0 < resultado.length){
                let coordinates = resultado[0][0].endreportlocation;
                console.log("coordinates", coordinates, resultado);

               this.UltimosEvents();

               this.addMarker(coordinates, resultado);
              }
            }  
      
          } else {
            // Lógica para cuando hay más de un valor en el arreglo
            console.log("Múltiples valores recibidos:", ubicationIds);
           
          }
        });

      } else {
        console.log("No hay valores");
      }
    }
  

    UltimosEvents(){
      const ubicationIds = this.ubicationValues;
      this.dataService.fetchData(this.list, "MobileUnityEvents", {}, {},this.fieldRelationsJoins, [{ "ref": "unityId", "valor": ubicationIds,}], {"id":"DESC"} , 5)
      .subscribe(response => {
        this.dataService.setResponseUltimosEventos(response);
      });
    }
    
    // cuando se marca una sola unidad en el mapa
    addMarker(coordinates: any, resultado: any): void {

      let OrientacionCourse = resultado[0][0]['endreportdegree'];
      let coordenadas = coordinates;

      let icono = null;
    
      if(24 < resultado[0][0].endreportdevice_date_hour){
        this.urlImage = '../../../assets/images/mapa/icono-sin-reportar-mapa_40x40.png';
      }


    
      const carIcon = L.icon({
        iconUrl: this.urlImage,
        iconSize: [32, 42],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });
  
     // Crear el componente popup y establecer los datos
      const popup = new PopupCarroComponent();
        popup.img = this.urlImage2;
        popup.additionalInfo = 'Reporte periodico';
        popup.reportDate = '17-07-2024';
        popup.reportHour = '08:25:46 Hace 7 seg';

      const popupContent = popup.getPopupContent();
      let markerl = marker([4.740290, -75.922571 ], { icon: carIcon}).bindPopup(popupContent).addTo(this.map);
        markerl.setRotationAngle(OrientacionCourse);

    }

    // cuando se marca mas de una sola unidad en el mapa
    addMultiMarker(): void {
      
    }
  
    private addLayers() {
      // Implementar la lógica para agregar capas si es necesario
    }
}


// private addLayers(): void {
//   // //   console.log(this.urlImage);
//   //   // Icono del coche
//   //   this.carIcon = L.icon({
//   //     iconUrl: this.urlImage,  // Asegúrate de tener esta imagen en tu carpeta de assets
//   //     iconSize: [42, 42],
//   //     iconAnchor: [16, 16]
//   //   });

//   //   // Marcador del coche
//   //   this.carMarker = L.marker([4.81333, -75.69611], {
//   //     icon: this.carIcon,
//   //   }).addTo(this.map);
//   //   this.carMarker.setRotationAngle(5);

//   //   // Crear más iconos
//   //   const markerIcon = L.icon({
//   //     iconUrl: 'assets/icon/marker.png',  // Ruta del nuevo icono del marcador
//   //     iconSize: [25, 41],
//   //     iconAnchor: [12, 41],
//   //     popupAnchor: [1, -34],
//   //     shadowSize: [41, 41]
//   //   }); 

//   //   // Capas adicionales
//   //   const markers = L.layerGroup([
//   //     L.marker([4.81333, -75.69611], { icon: markerIcon }).bindPopup('Centro de Pereira'),
//   //     L.marker([4.81433, -75.69711], { icon: markerIcon }).bindPopup('Punto 2')
//   //   ]);

//   //   const carRoutes = L.layerGroup([
//   //     L.polyline([
//   //       [4.81333, -75.69611],
//   //       [4.81433, -75.69711],
//   //       [4.81533, -75.69811]
//   //     ], { color: 'blue' }).bindPopup('Ruta del carro 1')
//   //   ]);

//   //   const infoLayer = L.layerGroup([
//   //     L.circle([4.81333, -75.69611], { radius: 200 }).bindPopup('Información adicional')
//   //   ]);

//   //   // Añadir capas al mapa
//   //   markers.addTo(this.map);
//   //   carRoutes.addTo(this.map);
//   //   infoLayer.addTo(this.map);

//   //   // Control de capas
//   //   const overlayMaps = {
//   //     "Marcadores": markers,
//   //     "Rutas de Carros": carRoutes,
//   //     "Información Adicional": infoLayer,
//   //     "geocercas": infoLayer,
//   //     "carro": infoLayer,
//   //     "ruta": infoLayer,
//   //     "modal_info_carro": infoLayer,
//   //     "modal_emergente": infoLayer,
//   //     "modal_banner_lateral_info": infoLayer,
//   //     "sidebar": infoLayer,
//   //     "filtro": infoLayer,
//   //     "polyline": infoLayer,
//   //     "modal_crud": infoLayer,
//   //     "visualizacion": infoLayer,
//   //     "creacion": infoLayer,
//   //     "edicion": infoLayer,


//   //   };

//   //   L.control.layers({}, overlayMaps).addTo(this.map); 
//   }

  // ngAfterViewInit() {
  //   this.dataService.getResponse().subscribe(response => {
  //     this.result2 = response;
  //     this.classIds = this.result2["body"][0]["class.id"];
  //     // console.log("en el after", this.result2)
  //     });
     

  // }