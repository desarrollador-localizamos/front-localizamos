import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-rotatedmarker';
import 'leaflet-routing-machine';
import 'leaflet-draw';


import { CardModule } from 'primeng/card';
import { DataService } from '../../core/services/data.service';
import { Observable, Subscription, } from 'rxjs';
import { ButtonTooltiComponent } from "../../shared/components/buttons/button-toolti/button-toolti.component";
import { BannerInferiorComponent } from "./capas/banner-inferior/banner-inferior.component";
import { ModalFiltroComponent } from "./capas/modal-filtro/modal-filtro.component";
import { VentanaInfoAccionComponent } from "./capas/ventana-info-accion/ventana-info-accion.component";
import { PopupCarroComponent } from "./popup-carro/popup-carro.component";
import { ReporteRutaComponent } from "./capas/reporte-ruta/reporte-ruta.component";
import { ReporteViajeComponent } from "./capas/reporte-viaje/reporte-viaje.component";
import { RecursosGeograficosMapaComponent } from "./capas/recursos-geograficos-mapa/recursos-geograficos-mapa.component";

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DataSimpleService } from '../../core/services/datasimple.service';

const drawLocalSpanish = {
  draw: {
    toolbar: {
      actions: {
        title: 'Cancelar dibujo',
        text: 'Cancelar'
      },
      finish: {
        title: 'Terminar dibujo',
        text: 'Terminar'
      },
      undo: {
        title: 'Eliminar último punto dibujado',
        text: 'Eliminar último punto'
      },
      buttons: {
        polyline: 'Dibujar una polilínea',
        polygon: 'Dibujar un polígono',
        rectangle: 'Dibujar un rectángulo',
        circle: 'Dibujar un círculo',
        marker: 'Dibujar un marcador',
        circlemarker: 'Dibujar un marcador circular'
      }
    },
    handlers: {
      circle: {
        tooltip: {
          start: 'Haz clic y arrastra para dibujar un círculo.'
        },
        radius: 'Radio'
      },
      circlemarker: {
        tooltip: {
          start: 'Haz clic en el mapa para colocar el marcador circular.'
        }
      },
      marker: {
        tooltip: {
          start: 'Haz clic en el mapa para colocar el marcador.'
        }
      },
      polygon: {
        tooltip: {
          start: 'Haz clic para comenzar a dibujar la forma.',
          cont: 'Haz clic para continuar dibujando la forma.',
          end: 'Haz clic en el primer punto para cerrar esta forma.'
        }
      },
      polyline: {
        error: '<strong>Error:</strong> los bordes de la forma no pueden cruzarse!',
        tooltip: {
          start: 'Haz clic para comenzar a dibujar la línea.',
          cont: 'Haz clic para continuar dibujando la línea.',
          end: 'Haz clic en el último punto para terminar la línea.'
        }
      },
      rectangle: {
        tooltip: {
          start: 'Haz clic y arrastra para dibujar un rectángulo.'
        }
      },
      simpleshape: {
        tooltip: {
          end: 'Suelta el mouse para terminar de dibujar.'
        }
      }
    }
  },
  edit: {
    toolbar: {
      actions: {
        save: {
          title: 'Guardar cambios',
          text: 'Guardar'
        },
        cancel: {
          title: 'Cancelar edición, descartar todos los cambios',
          text: 'Cancelar'
        },
        clearAll: {
          title: 'Limpiar todas las capas',
          text: 'Limpiar todo'
        }
      },
      buttons: {
        edit: 'Editar capas',
        editDisabled: 'No hay capas para editar',
        remove: 'Eliminar capas',
        removeDisabled: 'No hay capas para eliminar'
      }
    },
    handlers: {
      edit: {
        tooltip: {
          text: 'Arrastra los manipuladores o marcadores para editar la función.',
          subtext: 'Haz clic en cancelar para deshacer los cambios.'
        }
      },
      remove: {
        tooltip: {
          text: 'Haz clic en una característica para eliminarla'
        }
      }
    }
  }
};

@Component({
    selector: 'app-mapa',
    standalone: true,
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
    imports: [CommonModule, ButtonModule, ToastModule, CardModule, ButtonTooltiComponent, BannerInferiorComponent, ModalFiltroComponent, VentanaInfoAccionComponent,
    PopupCarroComponent, ReporteRutaComponent, ReporteViajeComponent, RecursosGeograficosMapaComponent],
    providers: [MessageService]
})
export class MapaComponent  implements AfterViewInit{

  
// =========== VARIBALES ========= //
ubicationValues: number[] = [];
private ubicationSubscription: Subscription | undefined;
private reporteRutaDataSubscription: Subscription | undefined;
protected realtime = false;

protected selectedLink: string = '';
protected result: any = {};
protected result2: any = {};
result$: Observable<any> | undefined;
subscription: Subscription | undefined;
protected formData: FormData | undefined;

// =========== VARIBALES CONTROL DE CAPAS ========= //

protected VisibilidadCapaVentana: boolean = false;
protected VisibilidadCapaBanner: boolean = false;
protected VisibilidadRealTime: boolean = false

// =========== VARIBALES MOBILEUNIT ========= //
protected mobileUnit = null;

// =========== VARIBALES MAPA ========= //
protected urlImage!: string;
protected urlImage2!: string;
private map!: L.Map;
protected zoom!: number;
protected openZoom: number;
protected classIds: number;
protected latitud: any;
protected longitud: any;
private markers: L.Marker[] = [];
private markerClusterGroup: L.MarkerClusterGroup | null = null;
private updateInterval: any;
private drawnFeatures!: L.FeatureGroup;
private drawControl: L.Control.Draw | undefined;
private geofenceCoordinates: string[] = [];; 
private colorSeleccionado: string = '';


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
      {campo:"device.imei", texto: "imei "},
      {campo:"device.simcard.lineNumber", texto: "sim"},
      {campo:"device.simcard.imei", texto: "iccid"},
      {campo:"device.simcard.simcardPlan.name", texto: "iccid"},
      {campo:"endreport.offtime.address", texto: "fecha"}, // falta ingresar al objeto
      {campo:"endreport.lat", texto: "latitud"},
      {campo:"endreport.long", texto: "longitud"},
      {campo:"endreport.horaSR", texto: "tiempo sin reportar"},
      {campo:"endreport.eventOn.address", texto: "dirección"},
      {campo:"endreport.battery", texto: "bateria"},
      {campo:"endreport.timeOff", texto: "tiempo en el mismo lugar"},  // falta calculo desde el back
      {campo:"endreport.device_date_hour", texto: "fecha gps"},  // falta calculo desde el back
      {campo:"endreport.address", texto: "Dirección"},  
      {campo:"endreport.eventName", texto: "nombre del evento"},  
      {campo:"MobileUnityDrivers.firstName", texto: "conductor"},
      {campo:"MobileUnityDrivers.lastName", texto: "conductor"},
      {campo:"class.id", texto: "clase"},
      {campo:"class.name", texto: "clase"},
      {campo:"subclass.id", texto: "Sub clase"},
      {campo:"subclass.name", texto: "Sub clase"},
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

  constructor(private dataService: DataService,private dataSimpleService: DataSimpleService,private messageService: MessageService
    ,private renderer: Renderer2, private el: ElementRef,
  ) {

      // ======= VARIABLES INICIALES DEL MAPA  ========//
      this.zoom = 6; // Nivel de zoom inicial
      this.openZoom = 17; // Nivel de zoom al que se quiere llegar
      this.classIds = 0;
  }

  ngOnInit() {

    // Inicializar el mapa
    this.initMap();
  
    // Suscribirse al evento de limpieza de mapa
    this.dataService.mapCleanup$.subscribe(() => {
      this.limpiarMapa();
    });
  }

  ngAfterViewInit() {
    this.ubicationSubscription = this.dataService.getUbicationValue().subscribe(
      values => {
        this.ubicationValues = values;
        console.log("valores para el mapa", this.ubicationValues);
        
        // Verificar si hay valores y actuar en consecuencia
        if (this.ubicationValues && this.ubicationValues.length > 0) {
          this.refreshMap();
          console.log("Actualizando mapa con valores:", this.ubicationValues);
        } else {
         this.limpiarMapa(); // Limpia el mapa si no hay valores
          console.log("No hay valores, limpiando el mapa.");
        }
      }
    );
  
    // Suscripciones adicionales si es necesario
  // this.ventanaInfoAccion.refresh.subscribe(() => this.refreshMap());
    this.reporteRutaDataSubscription = this.dataService.reporteRutaData$.subscribe(data => {
      if (data) {
        this.reporteRuta(data);
      }
    });
  }

  ngOnDestroy() {
    this.stopRealTime();
   
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.ubicationSubscription) {
      this.ubicationSubscription.unsubscribe();
    }
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
        center: [4.5709, -74.2973], // Coordenadas iniciales del centro
        zoom: this.zoom, // Nivel de zoom inicial
        zoomControl: false // Desactiva el control de zoom por defecto de Leaflet
      });
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
  
      L.control.zoom({
        position: 'bottomleft' // Ubica el control de zoom en la esquina inferior izquierda
      }).addTo(this.map);

      
  
  }

  private addLayers() {
   
  }

  private transitionMap(){
    if (this.ubicationValues.length === 1) {
      // Transición suave al zoom 16
      setTimeout(() => {
          this.map.flyTo([this.latitud!, this.longitud!], this.openZoom, {
          duration: 3 
        });
      }, 1000);   
    }else{
      this.map.flyTo([4.5709, -74.2973], 6)
    }
  }

  //===== FUNCIONES PARA DIBUJAR EN EL MAPA =====//
  private initDrawControl(): void {
    this.drawnFeatures = new L.FeatureGroup();
    this.map.addLayer(this.drawnFeatures);
  
    Object.assign(L.drawLocal, drawLocalSpanish);
  
    this.drawControl = new L.Control.Draw({
      position: 'bottomleft',
      
      edit: {
        featureGroup: this.drawnFeatures,
        remove: false
      },
      draw: {
        polygon: {
          shapeOptions: {
            color: this.colorSeleccionado,
          
          },
        },
        polyline: {
          shapeOptions: {
            color: this.colorSeleccionado,
            
          },
        },
        rectangle: {
          shapeOptions: {
            color: this.colorSeleccionado,
          },
          metric: false
        },
        circle: false,
        marker: false
      },
    });
  
    this.map.addControl(this.drawControl);
  
    // Eliminar listeners anteriores para evitar duplicación
    this.map.off(L.Draw.Event.CREATED);
  
    this.map.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer;
      const geoJson = layer.toGeoJSON();
      const coordinates = geoJson.geometry.coordinates[0]; // Assuming it's a polygon
  
      const formattedCoordinates = coordinates.map((coord: number[]) => `${coord[0]} ${coord[1]}`).join(',');
  
      if (!this.geofenceCoordinates.includes(formattedCoordinates)) {
        this.geofenceCoordinates.push(formattedCoordinates);
      }
  
      // Actualiza el servicio con las coordenadas
      this.dataService.setGeofenceCoordinates(this.geofenceCoordinates);
  
      console.log("coordenadas2", this.geofenceCoordinates[0]);
  
      layer.bindPopup(`Área: ${JSON.stringify(geoJson)}`);
      this.drawnFeatures.addLayer(layer);
    });
  }

  private updateDrawControl(): void {
    if (this.drawControl) {
      this.map.removeControl(this.drawControl);
    }
    this.initDrawControl();
  }
  //===== FIN FUNCIONES PARA DIBUJAR EN EL MAPA =====//

  //===== FUNCIONES PARA GRAFICAR EL CARRO =====//
  refreshMap() {
      console.log(this.ubicationValues);
  
      if (this.ubicationValues && this.ubicationValues.length > 0) {
        const ubicationIds = this.ubicationValues;
   
        this.dataService.fetchData(this.list, "MobileUnities", this.fieldRelations,{}, this.fieldRelationsJoins, [{ "ref": "id", "valor": ubicationIds, "tipo" : "in" }])
        .subscribe(response => {

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
   
              //envio de informacion para el banner-lateral y el divinfo
              this.dataService.setResponse(response);

              const resultado = response["body"];
              this.latitud = response["body"][0][0]["endreportlat"];
              this.longitud = response["body"][0][0]["endreportlong"] ;

              if(0 < resultado.length){

                this.VisibilidadCapaVentana = true;
                this.VisibilidadCapaBanner = true;
                this.VisibilidadRealTime = true;
              
               this.UltimosEvents();
               this.transitionMap();
               this.limpiarMapa();
               this.addMarker(resultado);
              }
            
          } else {
            // Lógica para cuando hay más de un valor en el arreglo
            this.VisibilidadCapaVentana = false;
            this.VisibilidadCapaBanner = false;
            this.VisibilidadRealTime = false;

            const resultado = response["body"];

            if(0 < resultado.length){
              this.limpiarMapa();
              this.addMultiMarker(resultado);
          
            }
          }
        });

      }
  }
  
    // cuando se marca una sola unidad en el mapa
  protected addMarker(resultado: any[]): void {
    console.log("addMarker" , resultado);
    
    let OrientacionCourse = resultado[0][0]['endreportdegree'];
    
    if (24 < resultado[0][0].endreportdevice_date_hour) {
      this.urlImage = '../../../assets/images/mapa/icono-sin-reportar-mapa_40x40.png';
    }
    
    setTimeout(() => {
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
      let markerl = L.marker([this.latitud!, this.longitud!], { icon: carIcon }).bindPopup(popupContent).addTo(this.map);
      markerl.setRotationAngle(OrientacionCourse);
        // Añadir el marcador a la lista de marcadores
        this.markers.push(markerl);
      }, 1500);
  }

    // cuando se marca mas de una sola unidad en el mapa
    addMultiMarker(resultado: any): void {
      console.log("resultado multi", resultado);

        // Eliminar todos los marcadores individuales
        this.markers.forEach(marker => {
          this.map.removeLayer(marker);
        });
        this.markers = [];
        
    
      // Si ya existe un MarkerClusterGroup, elimínalo primero
      if (this.markerClusterGroup) {
        this.map.removeLayer(this.markerClusterGroup);
      }
    
      // Crear un nuevo MarkerClusterGroup
      this.markerClusterGroup = L.markerClusterGroup({
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 100,
        iconCreateFunction: function(cluster) {
          return L.divIcon({
            html: '<div><span>' + cluster.getChildCount() + '</span></div>',
            className: 'marker-cluster marker-cluster-small',
            iconSize: new L.Point(40, 40)
          });
        }
      });
    
      let validMarkers = 0;
    
      resultado.forEach((item: any[]) => {
        if (item.length > 0) {
          const data = item[0];
          const popupContent = this.createPopupContent(data);
    
          if (data.endreportlat && data.endreportlong) {
            const position: L.LatLngExpression = [data.endreportlat, data.endreportlong];
            const customIcon = this.createCustomIcon(data.classid, data.typeimage, data.endreportdevice_date_hour);
            const m = L.marker(position, { icon: customIcon })
              .bindPopup(popupContent);
    
            this.markerClusterGroup?.addLayer(m);
            validMarkers++;
          }
        }
      });
    
      // Añadir el MarkerClusterGroup al mapa
      this.map.addLayer(this.markerClusterGroup);
    }

  createPopupContent(data: any): string {
      const transformStyle = `rotate(${data.endreportdegree}deg)`;
      return `
        <div style="display: flex; align-items: center;">
         <div style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px; border: 3px solid #e24c4c;">
         <img src="${this.urlImage2}" alt="Car Image" style="width: 30px; height: 30px; margin-right: 10px;"></div> 
          <div>
            <div style="font-weight: bold;"> ${data.plate}</div>
          </div>
        </div>
        <div style="margin-top: 10px;">
          <div>Cliente: ${data.endreportcustomer_name}</div>
          <div>Evento: ${data.endreporteventName}</div>
          <div>Dirección: ${data.endreportaddress}</div>
          <div>Fecha: ${data.endreportdevice_date_hour}</div>
          <div>Velocidad: ${data.endreportvelocity} km/h</div>
          <div>Orientación: ${data.endreportcourse}  <i class="fi fi-ss-compass-north" 
            style="
              transform: ${transformStyle};
              transform-origin: center center; display: inline-block; margin-left: 8px;font-size: 16px !important;
    color: #22c55e;
            "></i></div>
          <div>Latitud: ${data.endreportlat}</div>
          <div>Longitud: ${data.endreportlong}</div>
          <div>Estado: ${data.status}</div>
        </div>
      `;
  }

  limpiarMapa(): void {
    if (this.markerClusterGroup) {
      this.map.removeLayer(this.markerClusterGroup);
      this.markerClusterGroup.clearLayers();
      this.markerClusterGroup = null;
    }
      // Eliminar todos los marcadores individuales
      this.markers.forEach(marker => {
        this.map.removeLayer(marker);
      });
      this.markers = [];
      

      if (this.drawnFeatures) {
        this.drawnFeatures.clearLayers();
      }
    
      // Reiniciar el control de dibujo
      if (this.drawControl) {
        this.map.removeControl(this.drawControl);
        this.initDrawControl();
      }
      this.map.setZoom(6);
      
      
  }

  private createCustomIcon(classId: number, typeImage: string, lastReportTime: number): L.DivIcon {
      let iconUrl = '';
      let backgroundColor = "red";
      
      if (lastReportTime > 24) {
        iconUrl = '../../../assets/images/mapa/icono-sin-reportar-mapa_40x40.png';
      } else {
        switch (classId) {
          case 1:
            iconUrl = `../../../assets/images/mobile_unity_types/vehiculo_de_transporte/${typeImage}`;
            break;
          case 2:
            iconUrl = `../../../assets/images/mobile_unity_types/mascota/${typeImage}`;
            break;
          case 3:
            iconUrl = `../../../assets/images/mobile_unity_types/persona/${typeImage}`;
            break;
          case 4:
            iconUrl = `../../../assets/images/mobile_unity_types/moto/${typeImage}`;
            break;
          case 5:
            iconUrl = `../../../assets/images/mobile_unity_types/maquina_amarilla/${typeImage}`;
            break;
          default:
            iconUrl = '../../../assets/images/default-marker.png';
            
        }
      }
    
      return L.divIcon({
        html: `
          <div style="
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: white ;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            border: ${backgroundColor} 3px solid;
          ">
            <img src="${iconUrl}" alt="marker" style="
              width: 30px;
              height: 30px;
              object-fit: contain;
            " />
          </div>
        `,
        className: 'custom-div-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });
  }
  //===== FIN FUNCIONES PARA DIBUJAR EN EL MAPA =====//

  //===== FUNCIONES REPORTE DE RUTA  =====//
  reporteRuta(data: any[]): void {
      console.log('Datos de la ruta recibidos:', data);
    
      // Limpiar el mapa antes de agregar nuevos marcadores
     this.limpiarMapa();
    
      // Imagen fija para todos los marcadores
      const iconUrls = {
        Periodico: '../../../assets/images/mapa/icono-activo-mapa_40x40.png',
        Inicio: '../../../assets/images/mapa/icono-inicio-ruta.png',
        Fin: '../../../assets/images/mapa/icono-fin-ruta.png',
        Encendido: '../../../assets/images/mapa/icono-encendido.png',
        Apagado: '../../../assets/images/mapa/icono-apagado-mapa_40x40.png',
        Movimiento: '../../../assets/images/mapa/car.png',
        Detenido: '../../../assets/images/mapa/icono-activo-mapa_40x40.png'
      };
    
      // Función para seleccionar el icono basado en el estado
      const getIconUrl = (status: string): string => {
        switch (status.toLowerCase()) {
          case 'encendido': return iconUrls.Encendido;
          case 'apagado': return iconUrls.Apagado;
          case 'en movimiento': return iconUrls.Movimiento;
          case 'detenido': return iconUrls.Detenido;
          // Añade más casos según sea necesario
          default: return iconUrls.Periodico;
        }
      };
      // Array para almacenar los waypoints
      const waypoints: L.LatLng[] = [];
    
      // Iterar sobre los datos recibidos
      data.slice(0, 250).forEach((item: any, index: number) => {
        if (item.velocity !== undefined && item.address) {
          const position: L.LatLngExpression = [item.latitud, item.longitud];
    
          // Seleccionar el icono basado en el estado y la posición en la ruta
          let iconUrl;
          if (index === 0) {
            iconUrl = iconUrls.Inicio;
          } else if (index === data.length - 1) {
            iconUrl = iconUrls.Fin;
          } else {
            iconUrl = getIconUrl(item.status);
          }
    
          const customIcon = L.divIcon({
            html: `
              <div style="
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
              ">
                <img src="${iconUrl}" alt="marker" style="
                  width: 30px;
                  height: 30px;
                  object-fit: contain;
                " />
              </div>
            `,
            className: 'custom-div-icon',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
          });
    
          const m = L.marker(position, { icon: customIcon }).bindPopup(this.createPopupContentForRoute(item));
          m.addTo(this.map);
    
          // Añadir el punto a los waypoints
          waypoints.push(L.latLng(item.latitud, item.longitud));
        }
      });
    
      // Crear la ruta usando leaflet-routing-machine
      if (waypoints.length > 1) {
        L.Routing.control({
          waypoints: waypoints,
          router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1'
          }),
          routeWhileDragging: true,
          showAlternatives: false,
          fitSelectedRoutes: true,
          lineOptions: {
            styles: [{ color: 'red', opacity: 0.6, weight: 4 }],
            extendToWaypoints: true,
            missingRouteTolerance: 0
          },
          addWaypoints: false,
          plan: L.Routing.plan(waypoints, {
            createMarker: function(i: number, waypoint: L.Routing.Waypoint, n: number) {
              return false; // Esto evitará la creación del marcador
            }
          })
        }).addTo(this.map);
      }
    
      // Ajustar la vista del mapa para mostrar todos los marcadores
      const group = new L.FeatureGroup(data.map((item: any) => L.marker([item.latitud, item.longitud])));
      this.map.fitBounds(group.getBounds());
  }

  createPopupContentForRoute(data: any): string {
      return `
        <div style="font-weight: bold;">${data.address}</div>
        <div>Velocidad: ${data.velocity} km/h</div>
        <div>Fecha y hora: ${data.deviceDateHour}</div>
        <div>Estado: ${data.status}</div>
      `;
  }
  //===== FIN FUNCIONES REPORTE DE RUTA  =====//


  //===== FUNCIONES PARA REAL TIME =====//
  valorRealTime(){
     
     this.realTime();

     this.messageService.add({
      severity: 'success',
      detail: 'La ubicación se actualizará cada 30 segundos por 30 minutos'
    });
  }

  realTime() {

    this.realtime = !this.realtime;
    if (this.realtime) {
      
    // Iniciar actualizaciones
      this.updateInterval = setInterval(() => {
        this.refreshMap();
      }, 30000); // 30 segundos
      
      // Detener después de 30 minutos
      setTimeout(() => {
        this.stopRealTime();
      }, 30 * 60 * 1000); // 30 minutos
      
    } else {
      this.stopRealTime();
    }
  }
    
  private stopRealTime() {
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
      }
    
      this.realtime = false;
      this.messageService.add({
        severity: 'info',
        detail: 'La ubicación en tiempo real se detuvo'
      });
  }
  //===== FIN FUNCIONES  REAL TIME  =====//

  //===== FUNCIONES EVENTO GEOCERCAS =====// 
  onGeocercasButtonClick(): void {
    this.dataSimpleService.setBannerVisible(true);
    this.limpiarMapa();

    this.VisibilidadCapaVentana = false;
    this.VisibilidadCapaBanner = false;
    this.VisibilidadRealTime = false;
    this.initDrawControl();

    this.dataService.color$.subscribe(color => {
      this.colorSeleccionado = color;
      this.updateDrawControl();
    });

    const botonGeocercas = this.el.nativeElement.querySelector('.contenedor-boton-geocercas');
    if (botonGeocercas) {
      this.renderer.setStyle(botonGeocercas, 'bottom', '260px');
    }

  }
   //===== FIN FUNCIONES  EVENTO GEOCERCAS  =====//

  UltimosEvents(){
    const ubicationIds = this.ubicationValues;
    this.dataService.fetchData(this.list, "MobileUnityEvents", {}, {},this.fieldRelationsJoins, [{ "ref": "unityId", "valor": ubicationIds,}], {"id":"DESC"} , 5)
    .subscribe(response => {
      this.dataService.setResponseUltimosEventos(response);
    });
}
    
}
