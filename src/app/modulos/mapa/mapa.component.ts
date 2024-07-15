import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-rotatedmarker';
import { CardModule } from 'primeng/card';
import { DataService } from '../../core/services/data.service';
import { Observable, Subscription, catchError, tap, throwError } from 'rxjs';
import { ButtonTooltiComponent } from "../../shared/components/buttons/button-toolti/button-toolti.component";
import { BannerInferiorComponent } from "./capas/banner-inferior/banner-inferior.component";
import { ModalFiltroComponent } from "./capas/modal-filtro/modal-filtro.component";
import { VentanaInfoAccionComponent } from "./capas/ventana-info-accion/ventana-info-accion.component";

interface CarMarker {
  id: string;
  lat: number;
  lng: number;
  rot: number;
  type: number;
  marker: L.Marker;
}

@Component({
    selector: 'app-mapa',
    standalone: true,
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
    imports: [CardModule, ButtonTooltiComponent, BannerInferiorComponent, ModalFiltroComponent, VentanaInfoAccionComponent]
})
export class MapaComponent  {

  
// =========== VARIBALES ========= //
ubicationValues: number[] = [];
private ubicationSubscription: Subscription | undefined;

protected selectedLink: string = '';
protected result: any = {};
protected result2: any = {};
result$: Observable<any> | undefined;
subscription: Subscription | undefined;
protected formData: FormData | undefined;

// =========== VARIBALES MOBILEUNIT ========= //
 protected mobileUnit = null;

// =========== VARIBALES MAPA ========= //
  protected urlImage!: string ;
  private map!: L.Map;
  private carIcon!: L.Icon;
  private carMarker!: L.Marker;
  protected zoom!: number;
  protected openZoom: number;
  protected classIds :number;


  public list: { [key: string]: any[] } = {   
    MobileUnities:  [
      {campo:"endreport.battery", texto: "Nivel de bateria"},
      {campo:"brand", texto: "Marca"},
      {campo:"class.name", texto: "Clase"},
      {campo:"class.id", texto: "Clase"},
      {campo:"endreport.course", texto: "Orientación"},
      {campo:"createdAt", texto: "Fecha de creación"},
      // {campo:"customer.id", texto: "id del customer"},
      // {campo:"customer.name", texto: "Nombre del customer"}, // son joins
      {campo:"endreport.degree", texto: "Grados"},
      {campo:"device.id", texto: "Id del dispositivo"},
      // {campo:"deviceType.code", texto: "Codigo del dispositivo"},
      // {campo:"deviceType.id", texto: "id del codigo del dispositivo"}, // son relaciones anidadas con device
      // {campo:"deviceType.brand", texto: "nombre del dispositivo"},
      {campo:"plate", texto: "placa"},
      {campo:"id", texto: "Id de la unidad"},
      {campo:"installationDate", texto: "Fecha de instalacion"},
      {campo:"soatDueDate", texto: "Fecha vencimiento soat"},
      {campo:"endreport.velocity", texto: "Velocidad"},
      {campo:"status", texto: "Estado"},
      //{campo:"statusHistory", texto: "Estado historico DEL GPS y el activo"}, no se sabe de donde viene ??
      {campo:"subclass.name", texto: "Tipo"},
      {campo:"taxesDueDate", texto: "Impuestos"},
      {campo:"techMechRevitionDueDate", texto: "Fecha vencimiento tecnomecanica"},
      {campo:"endreport.offtime", texto: "Tiempo en el mismo lugar"},
      {campo:"type.image", texto: "Imagen"},
      {campo:"type.name", texto: "Tipo de dispositivo"},
    
    //   {
    //     batteryLevel: "100",
    //     brand: "BAJAJ",
    //     // brand_id: null,
    //     // brand_name: null,
    //     // chassis: null,
    //     // classTextColorSoat: "",
    //     // classTextColorTaxes: "",
    //     // classTextColorTechMech: "",
    //     class_id: 4,
    //     class_name: "Moto",
    //     // color: "NEGRO NEBULOSA",
    //     course: "Suroeste",
    //     created_at: "2024-03-23 13:08:40",
    //     customer_id: 2419,
    //     customer_name: "CENTRALQUIPOS SAS BIC",
    //     degrees: 155,
    //     device_id: 5421,
    //     // device_imei: "869487060506804",
    //     // device_name: "869487060506804",
    //     device_type_code: "PioneerX100",
    //     device_type_id: 38,
    //     device_type_name_brand: "TOPFLYtech",
    //     // full_name: "RJB89E",
    //     // gallons_x_hour_engine_on: null,
    //     id: 5475,
    //     // image: null,
    //     // image_type: "027-motorcycle-1.png",
    //     installation_date: "2024-03-30",
    //     // installation_record_image: null,
    //     // installation_record_number: 11667,
    //     // key_id: null,
    //     // keys_code: null,
    //     // limitSpeed: 80,
    //     // line_id: null,
    //     // line_name: null,
    //     // miles_approx: null,
    //     // miles_x_gallon: null,
    //     model: 2020,
    //     // name: null,
    //     // oil_change: null,
    //     // plan_name: "",
    //     plate: "RJB89E",
    //     // runt: null,
    //     // series: null,
    //     soat_due_date: null,
    //     speed: "0",
    //     status: 1,
    //     status_history: "Activo",
    //     status_name: "Activo",
    //     subclass_id: null,
    //     subclass_name: null,
    //     taxes_due_date: null,
    //     tech_mech_revition_due_date: null,
    //     timeOff: "2 horas 40 minutos 28 segundos",
    //     // type_id: 28,
    //     type_image: "027-motorcycle-1.png",
    //     type_name: "MOTO",
    //     // updated_at: "2024-07-02 20:58:39"
    // }
     ] ,


     MobileUnities2:  [
      {campo:"endreport.battery", texto: "Placa"},
      {campo:"class.id", texto: "Nombre"},
      {campo:"endreport.course", texto: "Gps"},
      {campo:"createdAt", texto: "Fecha de Imei dispositivo"},
      {campo:"brand", texto: "Marca"},
      {campo:"class.name", texto: "Modelo"},
      {campo:"endreport.degree", texto: "Simcard"},
      {campo:"device.id", texto: "Plan"},
      {campo:"plate", texto: "ICCID"},
      {campo:"id", texto: "Estado actual"},
      {campo:"installationDate", texto: "Ubicacion"},
      {campo:"soatDueDate", texto: "Orientación"},
      {campo:"endreport.velocity", texto: "Latitud"},
      {campo:"status", texto: "Longitud"},
      {campo:"subclass.name", texto: "Bateria"},
      {campo:"taxesDueDate", texto: "Fecha gps"},
      {campo:"techMechRevitionDueDate", texto: "Tiempo en el mismo lugar"},
      {campo:"endreport.offtime", texto: "Tipo"},
      {campo:"type.image", texto: "Conductor"},
      {campo:"type.name", texto: "Venc Impuestos"},
      {campo:"type.name", texto: "Venc Tecnomecanica"},
      {campo:"type.name", texto: "Venc Soat"},
      {campo:"type.name", texto: "Fecha instalacion"},
      {campo:"type.name", texto: "Tiempo "},
      {campo:"type.name", texto: "id de la unidad mobil "},
      {campo:"type.name", texto: "Velocidad"},
      {campo:"type.name", texto: "Status mobile Unity"},
      {campo:"type.name", texto: "Grados"},
      {campo:"type.name", texto: "Curso "},
      {campo:"type.name", texto: "Bateria"},
      {campo:"type.name", texto: "Velocidad"},
      {campo:"type.name", texto: "Limite de velocidad"},
      {campo:"type.name", texto: "Nombre del plan"},
      {campo:"type.name", texto: "Nombre geocercas"},
      {campo:"type.name", texto: ""},
    
   
     ] 
     
  };

    private fieldRelations: { [key: string]: any[] } = {
      MobileUnities: [
        "device", "type", "subclass", "class",
      ],
   
    };


    private fieldRelationsJoins: { [key: string]: any[] } = {
      MobileUnities: [
        "customer", 
      ],
    };

    constructor(private dataService: DataService) {

      // ======= VARIABLES INICIALES DEL MAPA  ========//
        this.zoom = 12;
        this.openZoom = 7;
        this.classIds = 0;
    }

    // ngOnInit() {
    //   this.result$ = this.dataService.fetchData(this.list, "MobileUnities", this.fieldRelations, {"id": 1185 })
    //     .pipe(
    //       tap(response => {
    //         this.result = response;
    //         // console.log('Lista inicial en tap:', this.result); // Verifica aquí dentro de tap
           
    //       }),
    //       catchError(error => {
    //         console.log('Error en la solicitud:', error);
    //         return throwError(() => error);
    //       })
    //     );
    
    //   this.subscription = this.result$.subscribe(() => {
    //     // Aquí se ejecuta el código después de que se complete la llamada
    //     this.ubicationValue = this.dataService.getUbicationValue();
    //     // console.log('Ubication value:', this.ubicationValue);
    
    //     // Lógica que requiere this.result después de que se complete la llamada
    //     // console.log('Lista inicial en subscribe:', this.result["body"]); // Aquí debería estar lleno
        
    //     if (this.result && this.result["body"].length > 0) {
     
    //       console.log("golaaaa en subscribe",  this.result["body"][0]["type.image"]);

    //       if(null != this.result["body"][0]){

    //             if(1 == this.result["body"][0]["class.id"])
    //             {   
    //                 this.urlImage = '../../../assets/images/mobile_unity_types/vehiculo_de_transporte/'+this.result["body"][0]["type.image"];
    //             }
    //             else if(2 == this.result["body"][0]["class.id"])
    //             {
    //                 this.urlImage = '../../../assets/images/mobile_unity_types/mascota/'+this.result["body"][0]["type.image"];
    //             }
    //             else if(3 == this.result["body"][0]["class.id"])
    //             {
    //                 this.urlImage = '../../../assets/images/mobile_unity_types/persona/'+this.result["body"][0]["type.image"];
    //             }
    //             else if(4 == this.result["body"][0]["class.id"])
    //             {
    //                 this.urlImage = '../../../assets/images/mobile_unity_types/moto/'+this.result["body"][0]["type.image"];
    //             }
    //             else if(5 == this.result["body"][0]["class.id"])
    //             {
    //                 this.urlImage = '../../../assets/images/mobile_unity_types/maquina_amarilla/'+this.result["body"][0]["type.image"];
    //        console.log("url2",this.urlImage);
    //             }
    //       }   
    //     }
    //   });
   
    //   this.initMap();
    //   this.addLayers();
    // }

    //this.dataService.fetchData(this.list, "MobileUnities", this.fieldRelations,{}, {}, [{ "ref": "id", "valor": [1,2,3,4,5]},{ "ref": "plate", "valor": [1,2,3,4,5]}],)
    //ejemplo de una estructura con multicondiciones

    ngOnInit() {
      this.ubicationSubscription = this.dataService.getUbicationValue().subscribe(
        values => {
          this.ubicationValues = values;
          console.log('Valores de ubicación recibidos:', values);
        }
      );
     
        this.refreshMap();
        this.initMap();
    }
    
  

    visudata() {
      this.dataService.getResponse().subscribe(response => {
      this.result2 = response;
        // console.log("function3", this.result2["body"]);
    
        // // Verificación adicional
        // console.log("this.result2:", this.result2);
        // console.log("this.result2['body']:", this.result2["body"]);
        // console.log("this.result2['body'].length:", this.result2["body"].length);
    
        // Verifica que el array "body" tenga elementos
        if (this.result2 && this.result2["body"] && this.result2["body"].length > 0) {
          // console.log("golaaaa en subscribe", this.result2["body"][0]["type.image"]);
    
          if (this.result2["body"][0] != null) {
            const classId = this.result2["body"][0]["class.id"];
            const typeImage = this.result2["body"][0]["type.image"];
            // console.log("classId:", classId);
            // console.log("typeImage:", typeImage);
    
            switch (classId) {
              case 1:
                this.urlImage = '../../../assets/images/mobile_unity_types/vehiculo_de_transporte/' + typeImage;
                break;
              case 2:
                this.urlImage = '../../../assets/images/mobile_unity_types/mascota/' + typeImage;
                break;
              case 3:
                this.urlImage = '../../../assets/images/mobile_unity_types/persona/' + typeImage;
                break;
              case 4:
                this.urlImage = '../../../assets/images/mobile_unity_types/moto/' + typeImage;
                break;
              case 5:
                this.urlImage = '../../../assets/images/mobile_unity_types/maquina_amarilla/' + typeImage;
                console.log("url2", this.urlImage);
                break;
              default:
                // console.log("Clase desconocida:", classId);
            }
          }
        }
        this.addLayers();
        // console.log(this.urlImage);
      });
    }
    

  // ngAfterViewInit() {
  //   this.dataService.getResponse().subscribe(response => {
  //     this.result2 = response;
  //     this.classIds = this.result2["body"][0]["class.id"];
  //     // console.log("en el after", this.result2)
  //     });
     

  // }

  prueba(){
  
 
  }


  private initMap(): void {
    // Crea el mapa y establece la vista inicial
    this.map = L.map('map', {
      center: [4.81333, -75.69611], // Coordenadas iniciales del centro
      zoom: this.zoom, // Nivel de zoom inicial
      zoomControl: false // Desactiva el control de zoom por defecto de Leaflet
    });
  
    // Añade la capa de mosaicos de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  
    // Añade el control de zoom personalizado en la esquina superior derecha
    L.control.zoom({
      position: 'topright' // Ubica el control de zoom en la esquina superior derecha
    }).addTo(this.map);

  }

  private addLayers(): void {
  //   console.log(this.urlImage);
    // Icono del coche
    this.carIcon = L.icon({
      iconUrl: this.urlImage,  // Asegúrate de tener esta imagen en tu carpeta de assets
      iconSize: [42, 42],
      iconAnchor: [16, 16]
    });

    // Marcador del coche
    this.carMarker = L.marker([4.81333, -75.69611], {
      icon: this.carIcon,
    }).addTo(this.map);
    this.carMarker.setRotationAngle(5);

    // Crear más iconos
    const markerIcon = L.icon({
      iconUrl: 'assets/icon/marker.png',  // Ruta del nuevo icono del marcador
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    }); 

    // Capas adicionales
    const markers = L.layerGroup([
      L.marker([4.81333, -75.69611], { icon: markerIcon }).bindPopup('Centro de Pereira'),
      L.marker([4.81433, -75.69711], { icon: markerIcon }).bindPopup('Punto 2')
    ]);

    const carRoutes = L.layerGroup([
      L.polyline([
        [4.81333, -75.69611],
        [4.81433, -75.69711],
        [4.81533, -75.69811]
      ], { color: 'blue' }).bindPopup('Ruta del carro 1')
    ]);

    const infoLayer = L.layerGroup([
      L.circle([4.81333, -75.69611], { radius: 200 }).bindPopup('Información adicional')
    ]);

    // Añadir capas al mapa
    markers.addTo(this.map);
    carRoutes.addTo(this.map);
    infoLayer.addTo(this.map);

    // Control de capas
    const overlayMaps = {
      "Marcadores": markers,
      "Rutas de Carros": carRoutes,
      "Información Adicional": infoLayer,
      "geocercas": infoLayer,
      "carro": infoLayer,
      "ruta": infoLayer,
      "modal_info_carro": infoLayer,
      "modal_emergente": infoLayer,
      "modal_banner_lateral_info": infoLayer,
      "sidebar": infoLayer,
      "filtro": infoLayer,
      "polyline": infoLayer,
      "modal_crud": infoLayer,
      "visualizacion": infoLayer,
      "creacion": infoLayer,
      "edicion": infoLayer,


    };

    L.control.layers({}, overlayMaps).addTo(this.map); 
  }


  refreshMap() {
    console.log(this.ubicationValues);
  
    if (this.ubicationValues && this.ubicationValues.length > 0) {
      const ubicationIds = this.ubicationValues;
  
      this.dataService.fetchData(this.list, "MobileUnities", this.fieldRelations,{}, {}, [{ "ref": "id", "valor": ubicationIds }]
      ).subscribe(response => {
        console.log("holi",response);
        this.dataService.setResponse(response);
      });
    } else {
      console.log("No hay valores");
    }
  }
}

