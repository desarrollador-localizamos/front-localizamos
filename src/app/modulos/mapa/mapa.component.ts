import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-rotatedmarker';
import { CardModule } from 'primeng/card';
import { DataService } from '../../core/services/data.service';
import { catchError, tap, throwError } from 'rxjs';

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
  standalone:true,
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
  imports: [CardModule]
})
export class MapaComponent implements AfterViewInit {

  
// =========== VARIBALES ========= //

protected selectedLink: string = '';
protected result: any = {};

// VARIABLES MOBILEUNIT 
 protected mobileUnit = null;
 protected totalSelected: number | undefined;

 // VARIABLES MAPA
  protected urlImage: string | undefined;
  private map!: L.Map;
  private carIcon!: L.Icon;
  private carMarker!: L.Marker;
  ubicationValue: number | undefined;

  public list: { [key: string]: any[] } = {
    MobileUnities:  [
      {campo:"endreport.battery", texto: "Nivel de bateria"},
      {campo:"brand", texto: "Marca"},
      {campo:"class.name ", texto: "Clase"},
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
     ] 
    };

    private fieldRelations: { [key: string]: any[] } = {
      MobileUnities: [
        "class", "device", "type", "subclass",
      ],
   
    };


    private fieldRelationsJoins: { [key: string]: any[] } = {
      MobileUnities: [
        "customer", 
      ],


   
    };

  constructor(private dataService: DataService) {}

 ngOnInit() {

    // Recupera el valor de ubicación almacenado
    this.ubicationValue = this.dataService.getUbicationValue();
    console.log('Ubication value:', this.ubicationValue);
    console.log('Lista inicial:', this.list);

    let dt = new Date();
    let month = dt.getMonth()+1;
    let year = dt.getFullYear();
    let day = dt.getDate();
    let hourStart = new Date();
    let hourEnd = new Date();
    hourStart.setHours(0);
    hourStart.setMinutes(0);
    hourEnd.setHours(23);
    hourEnd.setMinutes(59);

    // if(null != this.list && this.list.length > 0){
      
    //   this.mobileUnit = this.list[0];
     
    //   if(null != this.mobileUnit)
    //     {
    //         if(1 == this.list[0].class_id)
    //         {   
    //             this.urlImage = '../../../assets/images/mobile_unity_types/vehiculo_de_transporte/'+this.list[0].image_type;
    //         }
    //         else if(2 == this.list[0].class_id)
    //         {
    //             this.urlImage = '../../../assets/images/mobile_unity_types/mascota/'+this.list[0].image_type;
    //         }
    //         else if(3 == this.list[0].class_id)
    //         {
    //             this.urlImage = '../../../assets/images/mobile_unity_types/persona/'+this.list[0].image_type;
    //         }
    //         else if(4 == this.list[0].class_id)
    //         {
    //             this.urlImage = '../../../assets/images/mobile_unity_types/moto/'+this.list[0].image_type;
    //         }
    //         else if(5 == this.list[0].class_id)
    //         {
    //             this.urlImage = '../../../assets/images/mobile_unity_types/maquina_amarilla/'+this.list[0].image_type;
    //         }
    //     }
    //     this.refreshMap();

    // }else{
    //   console.log("no hay datos disponibles");
    // }


  }

  ngAfterViewInit() {


    this.initMap();

    const body =  this.dataService.fetchData(this.list, "MobileUnities", this.fieldRelations  )
     .pipe(
        tap(response => {
          // Procesa la respuesta según sea necesario
          
          this.result = response;
          console.log("respo",response);

        }), 
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error);
        })
      ).subscribe();

    this.addLayers();
  }

  private initMap(): void {
    this.map = L.map('map').setView([4.81333, -75.69611], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

  }

  private addLayers(): void {
    // Icono del coche
    this.carIcon = L.icon({
      iconUrl: 'assets/icon/white_car.png',  // Asegúrate de tener esta imagen en tu carpeta de assets
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


  refreshMap()
  {
      // this.infowindowModal = {};
      // this.timeOff= null
      // this.listPoints = {};
      // this.markerL = {};
      // // this.refreschAnimate();
      // this.listEvents = false;
      // this.showDetailEvent = false;
      // this.mobileUnitEvents = [];
      // this.spinner.show();
      // this.deleteMarkers();
      // this.labelIndex = 0;
      //this.totalSelected = this.list.length;

      console.log( "total",this.totalSelected);


      // if(1 === this.totalSelected){
      //     //If the user select only one item show the last 3 point reported and show the info of last point in bottom panel
      //     this.formData = new FormData();
      //     //Gets the key of the report
      //     let url = 'device-plots/'+this.list[0].id+'/get-normal';
      //     this.service.queryGet(url).subscribe(
      //         response=>
      //         {
      //             let result = response.json();
      //             this.regularKey = result.key;
      //             this.formData.append('key', this.regularKey);
      //             this.formData.append('imei', this.list[0].device_imei);
      //             this.formData.append('device_plot_id', result.device_plot_id);
      //             this.formData.append('lines', '3');
      //             if(true === this.realtime){
      //                 this.timer = setInterval(() => {
      //                     this.service.queryPost('mobile-units/show-single', this.formData).subscribe(response => {
      //                         let result = [];
      //                         let resVelocity = [];
      //                         result = response.json();
      //                         resVelocity = response.json();
      //                         if(result){
      //                             let len = result.length;
      //                             //Check if response is not empty and add markers foreach point
      //                             if(0 < len){
      //                                 //If realtime is enabled show markers and not the route
      //                                 var i=0
      //                                 for(i; i<=len; i++){
      //                                     if(result[i] && result[i].coordinates){
      //                                         this.addMarker(result[i].coordinates, result);
      //                                         //this.addMarkerWithTimeout(result[i].coordinates, i * 200);
      //                                     }
      //                                 }
      //                                 this.getLastFiveEvents();

      //                                 //Show information in bottom panel of last point
      //                                 this.actualLocation = result[len-1].address;
      //                                 // this.geocodeLatLng(result[len-1].coordinates);
      //                                 this.getMapStreetView(result[len-1].coordinates);

      //                                 if((-1 < resVelocity[i-1].velocity) && (5 >= resVelocity[i-1].velocity))
      //                                 {
      //                                     this.class = 'br-col-normally';
      //                                 }
      //                                 else if((6 < resVelocity[i-1].velocity) && (80 > resVelocity[i-1].velocity))
      //                                 {
      //                                     this.class = 'br-col-success';
      //                                 }
      //                                 else if((81 < resVelocity[i-1].velocity) && (100 >= resVelocity[i-1].velocity))
      //                                 {
      //                                     this.class = 'br-col-warning';
      //                                 }
      //                                 else if(100 < resVelocity[i-1].velocity)
      //                                 {
      //                                     this.class = 'br-col-danger';
      //                                 }


      //                             }
      //                         }else{
      //                             this.toastr.error('Server Error', 'Error', { enableHtml: true, positionClass: 'toast-top-center' });
      //                         }
      //                     },
      //                     err => {
      //                         console.log(err);
      //                     });
      //                 }, this.markerDuration);
      //             }else{
      //                 this.service.queryPost('mobile-units/show-single', this.formData).subscribe(response => {
      //                     let result = [];
      //                     this.respuesta =  response.json();
      //               let auxResult= response.json();
      //                 let resVelocity = [];
      //                     /////esta desición permite que solo se muestre un evento del activo movil en movimiento
      //                     ///pendiente revisas
      //                     if (this.respuesta.length == 1) {
      //                         result = response.json();
      //                     }else{
      //                         result.push(response.json()[0]);
      //                     }
      //                     /////////
      //                     // result = response.json();
      //                     resVelocity = response.json();
      //                     if(result){
      //                         let len = result.length;
      //                         //Check if response is not empty and add markers foreach point
      //                         if(0 < len){
      //                             //Show information in bottom panel of last point
      //                             let coordinates = result[0].coordinates;
      //                             this.actualCoords = coordinates;
      //                             this.timeAgo = result[0].time;
      //                             this.fileDate = result[0].file_date;
      //                             this.actualLocation = result[0].address;
      //                             // this.geocodeLatLng(coordinates);
      //                             this.getMapStreetView(coordinates);
      //                             // this.initMap(coordinates);
      //                             this.getLastFiveEvents();

      //                             if (result[0].driver_name_dallas && this.lastDriverName == 'No asignado') {
      //                                 this.lastDriverName = result[0].driver_name_dallas;
      //                             }

      //                             if(1 == resVelocity[0].status_mobile_unity.toString().charAt(0))
      //                             {
      //                                 this.class = 'br-col-success';
      //                                 this.statusCurrent = 'Encendido';
      //                                 this.statusClass = 'success';
      //                                 if(2 >= resVelocity[0].velocity && 2 != this.list[0].class_id && 3 != this.list[0].class_id)
      //                                 {
      //                                     this.class = 'br-col-warning';
      //                                     this.statusCurrent = 'Detenido';
      //                                     this.statusClass = 'warning';
      //                                 }
      //                                 if(24 < resVelocity[0].hours)
      //                                 {
      //                                     this.class = 'br-col-normally';
      //                                     this.statusCurrent = 'Sin reportar';
      //                                     this.statusClass = 'normally';
      //                                 }
      //                             }
      //                             else if(0 == resVelocity[0].status_mobile_unity.toString().charAt(0))
      //                             {
      //                                 this.class = 'br-col-danger';
      //                                 this.statusCurrent = 'Apagado';
      //                                 this.statusClass = 'danger';
      //                                 if(24 < resVelocity[0].hours)
      //                                 {
      //                                     this.class = 'br-col-normally';
      //                                     this.statusCurrent = 'Sin reportar';
      //                                     this.statusClass = 'normally';
      //                                 }
      //                             }

      //                             if(24 < resVelocity[0].hours)
      //                             {
      //                                 this.addMarker(coordinates, result);
      //                             }
      //                             else if(len == 1)
      //                             {
      //                                 result[0]['first'] = true;
      //                                 this.addMarker(coordinates, result);
      //                             }else
      //                             {
      //                                 if(this.googleMaps == '1')
      //                                 {


      //                                   var item   = {};
      //                                     var dataNew= {};
      //                                     for (var key in result) {

      //                                         dataNew = result[key];

      //                                         if (parseInt(key) == 0) {
      //                                             dataNew['first'] = true;
      //                                         }

      //                                         item[0] = dataNew;
      //                                         this.addMarker(result[key]['coordinates'],item);
      //                                     }
      //                                 }else
      //                                 {
      //                                     this.addMarker(coordinates,result);
      //                                 }
      //                             }
      //                             this.imageType = '../../../assets/images/mobile_unity_types/blanco/'+this.mobileUnit.image_type;
      //                             this.mobileUnit.course = auxResult[0].course;
      //                             this.mobileUnit.degrees = auxResult[0].degrees;
      //                             this.mobileUnit.batteryLevel = auxResult[0].batteryLevel;
      //                             this.mobileUnit.speed = auxResult[0].speed;
      //                             this.mobileUnit.plan_name = auxResult[0].planName;
      //                             this.geofencesNames = auxResult[0].geofencesNames;
      //                             this.mobileUnit.timeOff = null;
      //                             //---------------Codigo temperatura --------------------------
      //                             if (auxResult[0].temperature) { this.temperatura = auxResult[0].temperature; }
      //                             else {
      //                                 this.temperatura = null;
      //                             }
      //                             //------------------------------------------------------------
                                  
      //                             if (auxResult[0]['timeOff']) {
      //                                 this.timeOff            = auxResult[0].timeOff;
      //                                 this.mobileUnit.timeOff = auxResult[0].timeOff;
      //                             }

      //                             if('null' == auxResult[0].limitSpeed)
      //                             {
      //                                 this.mobileUnit.limitSpeed = '';                                
      //                             }
      //                             else{
      //                                 this.mobileUnit.limitSpeed = auxResult[0].limitSpeed;
      //                             }

      //                             //Center map in the last point
      //                             if(this.googleMaps == '1')
      //                             {
      //                                 // this.map.setCenter(result[0].coordinates);
      //                             }
      //                         }
      //                         else
      //                         {
      //                             this.class = '';
      //                             this.statusCurrent = '';
      //                             this.statusClass = '';
      //                             this.actualCoords = [];
      //                             this.timeAgo = '';
      //                             this.fileDate = '';
      //                             this.actualLocation = '';
      //                             jq('#pano').html('');
      //                             this.mobileUnitEvents = [];
      //                             this.loaderDataMap = true;
      //                         }
      //                         this.spinner.hide();
      //                     }else{
      //                         this.spinner.hide();
      //                         this.toastr.error('Server Error', 'Error', { enableHtml: true, positionClass: 'toast-top-center' });
      //                     }
      //                 },
      //                 err => {
      //                     this.spinner.hide();
      //                     console.log(err);
      //                 });
      //             }
      //         },
      //         err =>
      //         {
      //             console.log(err);
      //         }
      //     );
      // }else{
      //     this.spinner.hide();
      // }

  }
}
