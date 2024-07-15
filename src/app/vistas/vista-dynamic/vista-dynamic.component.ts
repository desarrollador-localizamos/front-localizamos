import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, catchError, tap, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TableSencillaComponent } from "../../shared/components/tables/table-sencilla/table-sencilla.component";
import { ButtonTooltiComponent } from "../../shared/components/buttons/button-toolti/button-toolti.component";
import { TagModule } from 'primeng/tag';
import { environments } from '../../../environments/environments';
import { DataService } from '../../core/services/data.service';

interface EstructuraData {
  id: number;
  [key: string]: any;
}

interface EnvioData {
  entityName: string;
  fields: any[];
  relations: any[];
  joins?: any[];
}

@Component({
  selector: 'app-vista-dynamic',
  standalone: true,
  templateUrl: './vista-dynamic.component.html',
  styleUrls: ['./vista-dynamic.component.scss'],
  imports: [
    CommonModule,
    TableSencillaComponent,
    ButtonTooltiComponent,
    TagModule
  ]
})
export class VistaDynamicComponent implements OnInit, OnDestroy {

  private readonly baseUrl: string = environments.baseUrl;
  
  protected selectedLink: string = '';
  protected data: { header: any[], body: EstructuraData[] } = { header: [], body: [] };
  protected result: any = {};
  protected displayedColumns: string[] = [];
  protected routeSubscription!: Subscription;
  protected body!: EnvioData;
  protected fieldNames: string[] = [];


  private fieldMappings: { [key: string]: any[] } = {
    MobileUnityEvents: [ // Tabla que depreonto no va existir
      { campo: "id", texto: "id", sortable: true, filter: true },
      // { campo: "customer.id", texto: "", sortable: true, filter: true }, 
      // { campo: "customer.name", texto: "Cliente", sortable: true, filter: true }, no tiene relacion con customer
      { campo: "Estado", texto: "Estado", sortable: false, filter: true },
      { campo: "serverDataHour", texto: "Fecha/Hora servidor", sortable: true, filter: true },
      { campo: "deviceDataHour", texto: "Fecha/Hora GPS", sortable: false, filter: true },
      //{ campo: "Tiempo", texto: "Tiempo", sortable: true, filter: true }, no se sabe
      // { campo: "MobileUnity.plate", texto: "Activo móvil", sortable: false, filter: true }, // no tiene relacion
      { campo: "address", texto: "Dirección", sortable: false, filter: true },
      { campo: "velocity", texto: "Velocidad", sortable: true, filter: true },
      { campo: "Temperatura	", texto: "Temperatura", sortable: false, filter: true },
      { campo: "course	", texto: "Orientación", sortable: false, filter: true },
      { campo: "temperature", texto: "Nivel de batería", sortable: false, filter: true },
      { campo: "mileage", texto: "Kilometraje", sortable: false, filter: true },
      //{ campo: "driver.id", texto: "Trama Valida", sortable: false, filter: true },  // no tiene relacion
    ],
    Customers: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"fullName",texto: "Nombre", sortable: true, filter: true },
      {campo:"plan.name", texto: "Plan",sortable: false, filter: true }, 
      {campo:"email", texto: "Correo electrónico", sortable: true, filter: true }, 
      {campo:"userType.name", texto: "Tipo de usuario", sortable: false, filter: true }, 
      {campo:"department.name", texto: "Departamento", sortable: true, filter: true },
      {campo:"city.name",texto: "Ciudad", sortable: true, filter: true },
      {campo: "cellphone", texto: "Celular",sortable: false, filter: true },
      {campo: "status", texto: "Estado", sortable: false, filter: true },
    ],
    Users: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"name", texto: "Nombre", sortable: true, filter: true },
      {campo:"email", texto: "Correo electrónico",sortable: false, filter: true },
      {campo:"role.name", texto: "Rol", sortable: true, filter: true },
      {campo:"lastDateConnection", texto: "Última conexión", sortable: false, filter: true },
      {campo:"status", texto: "Estado", sortable: true, filter: true },
    ],
    Plans: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"name", texto: "Nombre", sortable: true, filter: true },
      {campo:"usersLimit", texto: "Límite de usuarios",sortable: false, filter: true },
      {campo:"centralMonitoringNotifications", texto: "Notificaciones de central de monitoreol", sortable: true, filter: true },
      {campo:"geographicalResourcesLimit", texto: "Límite de recursos geográficos", sortable: true, filter: true },
      {campo:"generalReportsAccess", texto: "Acceso a reportes generales", sortable: true, filter: true },
      {campo:"canShareTracking", texto: "Comparte seguimiento", sortable: true, filter: true },
      {campo:"routesModuleAccess", texto: "Acceso a módulo de rutas", sortable: true, filter: true },
      {campo:"appAccess", texto: "Acceso a la app", sortable: true, filter: true },
      {campo:"selfMonitoring", texto: "Automonitoreo", sortable: true, filter: true },
      {campo:"status", texto: "Estado", sortable: true, filter: true },
    ],
    Consultants: [
      
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"firstName", texto: "Nombre", sortable: true, filter: true },
      {campo:"lastName", texto: "Apelido", sortable: true, filter: true },
      {campo:"telephone", texto: "telefono",sortable: false, filter: true },
      {campo:"cellphone", texto: "celular", sortable: true, filter: true },
      {campo:"email", texto: "email", sortable: false, filter: true },
      {campo:"Departments.name", texto: "Departamento", sortable: true, filter: true },
      {campo:"Cities.name",texto: "Ciudad", sortable: true, filter: true },
      
    ],

    MobileUnities: [
      {campo:"id", texto: "id", sortable: true, filter: true },
     // {campo:"endreport.customerName", texto: "Cliente", sortable: true, filter: true },
      {campo:"device.deviceType.brand.name", texto: "Tipo de dispositivo",sortable: false, filter: true },
      {campo:"device.deviceType.code", texto: "Referencia del dispositivo",sortable: false, filter: true },
      {campo:"plate", texto: "Nombre / Placa", sortable: true, filter: true },
     {campo:"device.imei", texto: "IMEI dispositivoil", sortable: false, filter: true },
      {campo:"runt", texto: "Runt", sortable: true, filter: true },
      {campo:"model", texto: "Modelo", sortable: true, filter: true },
      {campo:"class.name", texto: "Clase", sortable: true, filter: true },
     // {campo:"endreport.status", texto: "Estado actual", sortable: true, filter: true },  //no sabemos de donde viene
      {campo:"status", texto: "Estado", sortable: true, filter: true },
    ],
    Devices: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"customer.fullName", texto: "Cliente", sortable: true, filter: true },
      {campo:"deviceType.brand.name", texto: "Tipo de dispositivo",sortable: false, filter: true },
      {campo:"deviceType.code", texto: "Referencia del dispositivo",sortable: false, filter: true },
      {campo:"mobileUnities.1plate", texto: "Nombre / Placa", sortable: true, filter: true },
      {campo:"imei", texto: "IMEI dispositivo", sortable: false, filter: true },
      {campo:"simcard.lineNumber", texto: "Número de línea de tarjeta SIM", sortable: true, filter: true },
      {campo:"simcard.imei", texto: "IMEI simcard", sortable: true, filter: true },
      {campo:"property", texto: "Propiedad", sortable: true, filter: true }, // queda pendiente
      {campo:"status", texto: "Estado", sortable: true, filter: true },
    ],
    GeographicalResources: [
      {campo:"id", texto: "id", sortable: true, filter: true },
     // {campo:"customer.fullName", texto: "Cliente", sortable: true, filter: true },
      {campo:"type", texto: "Tipo",sortable: false, filter: true },
      {campo:"name", texto: "Nombre", sortable: true, filter: true },
      //{campo:"customer.department.name", texto: "Departamento", sortable: true, filter: true },
     // {campo:"customer.citie.name",texto: "Ciudad", sortable: true, filter: true },
      {campo:"isPrivate", texto: "Es privado", sortable: true, filter: true },
      {campo:"applyForAddress", texto: "Aplica dirección", sortable: true, filter: true },
      {campo:"status", texto: "Estado", sortable: true, filter: true },
      
    ],
    Notifications: [
      // {campo:"id", texto: "id", sortable: true, filter: true },
      // {campo:"Customers.fullName", texto: "Cliente", sortable: true, filter: true },
      // {campo:"EventTypes.name", texto: "Tipo de evento",sortable: false, filter: true },
      // {campo:"MobileUnities.plate", texto: "	Activos móviles", sortable: true, filter: true },
      // {campo:"emails", texto: "Correos", sortable: false, filter: true },
      // {campo:"notificationPush", texto: "Notificaciones push", sortable: true, filter: true },
      // {campo:"notificationEmail", texto: "Notificaciones email", sortable: true, filter: true },
      // {campo:"status", texto: "Estado", sortable: true, filter: true },

      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"plate", texto: "placa", sortable: true, filter: true },
      {campo:"MobileUnities.plate", texto: "	Activos móviles", sortable: true, filter: true },
  
    ],

    DriversDallas: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"firstName", texto: "Nombre", sortable: true, filter: true },
      {campo:"lastName", texto: "Apellido", sortable: true, filter: true },
      {campo:"MobileUnityDallasKeys.codeNumber", texto: "Codigo llave dallas",sortable: false, filter: true }, 
     {campo:"MobileUnityDallasKeys.description", texto: "Descripción", sortable: true, filter: true }, //customer.
      {campo:"status", texto: "Estado", sortable: true, filter: true },
      
    ],
    MobileUnityDrivers: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"firstName", texto: "Nombre", sortable: true, filter: true },
      {campo:"lastName", texto: "Apellido",sortable: false, filter: true },
      {campo:"documentNumber", texto: "Documento", sortable: true, filter: true },
      {campo:"address", texto: "Dirección", sortable: true, filter: true },
      {campo:"email", texto: "Correo electrónico", sortable: true, filter: true },
      {campo:"telephone", texto: "Teléfono", sortable: true, filter: true },
      {campo:"cellphone", texto: "Celular", sortable: true, filter: true },

    ],
    SharePreoperational: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"MobileUnities.id", texto: "Activos móviles", sortable: true, filter: true },
      {campo:"urlSend", texto: "Link de reporte",sortable: false, filter: true },
      {campo:"token", texto: "",sortable: false, filter: true },
      {campo:"status", texto: "Estado" ,sortable: false, filter: true }, 
    ],
    Simcards: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"createdAt", texto: "Fecha de creación", sortable: true, filter: true },
      {campo:"imei", texto: "IMEI simcard",sortable: false, filter: true },
      {campo:"lineNumber", texto: "	Número de la línea",sortable: false, filter: true },
      {campo:"status", texto: "estado",sortable: false, filter: true },
    ],
    SimcardPlan: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"name", texto: "nombre", sortable: true, filter: true },
      {campo:"cuttingDay", texto: "Día de corte",sortable: false, filter: true },
      {campo:"status", texto: "estado",sortable: false, filter: true },
    ],
    MobileUnities_: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"plate", texto: "placa", sortable: true, filter: true },
      {campo:"controlT", texto: "opcion", sortable: true, filter: true },
      {campo:"status", texto: "estado",sortable: false, filter: true },
    ],
    DeviceTypes: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"brand.name", texto: "marca", sortable: true, filter: true },
      {campo:"code", texto: "Código", sortable: true, filter: true },
      {campo:"status", texto: "estado",sortable: false, filter: true },
    ],
    DevicePlots: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"brand.name", texto: "marca", sortable: true, filter: true },
      {campo:"name", texto: "marca", sortable: true, filter: true },
      {campo:"EventTypes.name", texto: "tipo", sortable: true, filter: true },
    ],
    // Por desentramado vuela todo 
    DevicePlotDeviceType: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"deviceType.brand.name", texto: "marca", sortable: true, filter: true }, 
       {campo:"deviceType.code", texto: "tipo de dispositivo", sortable: true, filter: true },
       {campo:"devicePlot.name", texto: "Trama asociada",sortable: false, filter: true },
       {campo:"key", texto: "Llave", sortable: true, filter: true },
       {campo:"eventType.name", texto: "Evento", sortable: true, filter: true },
       {campo:"imeiPosition", texto: "Posición imei", sortable: true, filter: true },
  
    ],
    MobileUnityClass: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"name", texto: "Nombre", sortable: true, filter: true },
      {campo:"status", texto: "Estado", sortable: true, filter: true },
    ],
    MobileUnitySubclass: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"name", texto: "Nombre", sortable: true, filter: true },
      {campo:"class.name", texto: "clase", sortable: true, filter: true }, 
    ],
    MobileUnityType: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"class.name", texto: "clase", sortable: true, filter: true },
      {campo:"name", texto: "Nombre", sortable: true, filter: true }, 
      {campo:"image", texto: "imagen", sortable: true, filter: true },
      
    ],
    MobileUnityStatus: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"name", texto: "Nombre", sortable: true, filter: true },
      {campo:"status", texto: "estado", sortable: true, filter: true },
    ],
    ContactTypes: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"name", texto: "Nombre", sortable: true, filter: true },
    ],
    Alerts: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"name", texto: "nombre", sortable: true, filter: true },
      {campo:"description", texto: "Descripción", sortable: true, filter: true },
      {campo:"status", texto: "estado", sortable: true, filter: true },
    ],
    EventTypes: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"name", texto: "nombre", sortable: true, filter: true },
      {campo:"centralMonitoring", texto: "Estado en central de monitoreo", sortable: true, filter: true },
      {campo:"color", texto: "color", sortable: true, filter: true },
      {campo:"status", texto: "estado", sortable: true, filter: true },
    ],
    NoveltyTypes: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"eventType.name", texto: "tipo de evento", sortable: true, filter: true },
      {campo:"name", texto: "nombre", sortable: true, filter: true },
      {campo:"status", texto: "estado", sortable: true, filter: true },
    ],
    MobileUnityLine: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"name", texto: "nombre", sortable: true, filter: true },
    ],
    MobileUnityBrands: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"name", texto: "nombre", sortable: true, filter: true },
    ],
  
    DeviceTypeCommands: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"DeviceTypes.code", texto: "dispositivo", sortable: true, filter: true },
      {campo:"CommandsList.name", texto: "nombre comando", sortable: true, filter: true },
      {campo:"command", texto: "comando", sortable: true, filter: true },
    ],
    CentralAlerts: [
     {campo:"id", texto: "id", sortable: true, filter: true },
      // no tiene relaciones y varios campos son calculos 
    //  {campo:"howLong", texto: "tiempo", sortable: true, filter: true },
    //  {campo:"deviceDateHour", texto: "Hora Gps", sortable: true, filter: true },
    //  {campo:"serverDateHour", texto: "Hora servidor", sortable: true, filter: true },
    //  {campo:"eventType.id", texto: "Tipo de evento", sortable: true, filter: true },
    //  {campo:"eventType.name", texto: "Tipo de evento", sortable: true, filter: true },
     //{campo:"total", texto: "Total", sortable: true, filter: true },
    //  {campo:"customer.name", texto: "Cliente", sortable: true, filter: true },
    //  {campo:"mobileUnity.name", texto: "Cliente", sortable: true, filter: true },
    //  {campo:"mobileUnity.endreport.location", texto: "", sortable: true, filter: true }, //no tiene relacion
    //  {campo:"mobileUnity.endreport.velocity", texto: "nombre comando", sortable: true, filter: true },
    // {campo:"status", texto: "comando", sortable: true, filter: true },
    ],
    Directions: [
     {campo:"id", texto: "id", sortable: true, filter: true },
     {campo:"latitud", texto: "latitud", sortable: true, filter: true },
     {campo:"longitud", texto: "longitud", sortable: true, filter: true }, 
     {campo:"address", texto: "Dirección", sortable: true, filter: true },
    ],
    Reporte_historico: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"status", texto: "Estado", sortable: true, filter: true },
      {campo:"Fecha/Hora servidor", texto: "Fecha/Hora servidor", sortable: true, filter: true },
      {campo:"Fecha/Hora GPS", texto: "Fecha/Hora GPS", sortable: true, filter: true },
      {campo:"evento", texto: "evento", sortable: true, filter: true },
      {campo:"activo movil", texto: "activo movil", sortable: true, filter: true },
      {campo:"Dirección", texto: "Dirección", sortable: true, filter: true },
      {campo:"Velocidad", texto: "Velocidad", sortable: true, filter: true },
      {campo:"Temperatura", texto: "Temperatura", sortable: true, filter: true },
      {campo:"Orientación", texto: "Orientación", sortable: true, filter: true },
      {campo:"Nivel de batería", texto: "Nivel de batería", sortable: true, filter: true },
      {campo:"Kilometraje", texto: "Kilometraje", sortable: true, filter: true },
    ],
    Reporte_Clientes: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"status", texto: "Estado", sortable: true, filter: true },
      {campo:"Fecha/Hora servidor", texto: "Fecha/Hora servidor", sortable: true, filter: true },
      {campo:"Fecha/Hora GPS", texto: "Fecha/Hora GPS", sortable: true, filter: true },
      {campo:"evento", texto: "evento", sortable: true, filter: true },
      {campo:"activo movil", texto: "activo movil", sortable: true, filter: true },
      {campo:"Dirección", texto: "Dirección", sortable: true, filter: true },
      {campo:"Velocidad", texto: "Velocidad", sortable: true, filter: true },
      {campo:"Temperatura", texto: "Temperatura", sortable: true, filter: true },
      {campo:"Orientación", texto: "Orientación", sortable: true, filter: true },
      {campo:"Nivel de batería", texto: "Nivel de batería", sortable: true, filter: true },
      {campo:"Kilometraje", texto: "Kilometraje", sortable: true, filter: true },
    ],
    Reporte_novedades: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"status", texto: "Estado", sortable: true, filter: true },
      {campo:"evento", texto: "evento", sortable: true, filter: true },
      {campo:"activo movil", texto: "activo movil", sortable: true, filter: true },
      {campo:"Tipo de novedad", texto: "Tipo de novedad", sortable: true, filter: true },
      {campo:"Comentarios", texto: "Comentarios", sortable: true, filter: true },
      {campo:"Caso cerrado", texto: "Caso cerrado", sortable: true, filter: true },
    ],
    ScheduledReports: [
      { campo:"id", texto: "id", sortable: true, filter: true },
      { campo: "createdAt", texto: "Fecha", sortable: true, filter: true },
     // { campo: "mobileUnity.plate", texto: "Activo móvil", sortable: true, filter: true }, no tiene relacion
      { campo: "sendDate", texto: "Dia de envio", sortable: true, filter: true },
      { campo: "emails", texto: "Correo electrónico", sortable: true, filter: true },
      { campo: "typeReport", texto: "Reporte", sortable: true, filter: true }, 
      { campo: "periodicity", texto: "Periocidad", sortable: true, filter: true },
     // { campo: "customer.name", texto: "Usuario", sortable: true, filter: true }, no tiene relacion
      { campo: "status", texto: "Estado", sortable: true, filter: true }
    ],
    Reporte_tramas: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      { campo: "Fecha", texto: "Fecha", sortable: true, filter: true },
      { campo: "Fecha/Hora servidor", texto: "Fecha/Hora servidor", sortable: true, filter: true },
      { campo: "IMEI", texto: "IMEI", sortable: true, filter: true },
      { campo: "Tramas", texto: "Tramas", sortable: true, filter: true },
      { campo: "status", texto: "Estado", sortable: true, filter: true },
      { campo: "Error", texto: "Error", sortable: true, filter: true }
    ],
    WebserviceLogs: [
      {campo:"id", texto: "id", sortable: true, filter: true },
    { campo: "RUNT", texto: "RUNT", sortable: true, filter: true },
    { campo: "plot.unity", texto: "PLACA", sortable: true, filter: true },
    { campo: "TIPO DE DISPOSITIVO", texto: "TIPO DE DISPOSITIVO", sortable: true, filter: true },
    { campo: "CLIENTE", texto: "CLIENTE", sortable: true, filter: true },
    { campo: "SERIAL GPS", texto: "SERIAL GPS", sortable: true, filter: true },
    { campo: "MODELO", texto: "MODELO", sortable: true, filter: true },
    { campo: "SERIE", texto: "SERIE", sortable: true, filter: true },
    { campo: "ID UNIDAD", texto: "ID UNIDAD", sortable: true, filter: true },
    { campo: "MOTOR", texto: "MOTOR", sortable: true, filter: true },
    { campo: "CHASIS", texto: "CHASIS", sortable: true, filter: true },
    { campo: "FECHA DE SINCRONIZACION", texto: "FECHA DE SINCRONIZACION", sortable: true, filter: true },
    { campo: "RESPUESTA WEBSERVICE", texto: "RESPUESTA WEBSERVICE", sortable: true, filter: true },
    { campo: "status", texto: "ESTADO", sortable: true, filter: true }
    ],
    Reporte_preperacional: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      { campo: "fecha", texto: "fecha", sortable: true, filter: true },
      { campo: "activo movil", texto: "activo movil", sortable: true, filter: true },
      { campo: "fecha", texto: "fecha", sortable: true, filter: true },
      { campo: "activo movil", texto: "activo movil", sortable: true, filter: true },
    ],
    Reporte_mantenimiento: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      { campo: "fecha", texto: "fecha", sortable: true, filter: true },
      { campo: "activo movil", texto: "activo movil", sortable: true, filter: true },
      { campo: "fecha", texto: "fecha", sortable: true, filter: true },
      { campo: "activo movil", texto: "activo movil", sortable: true, filter: true },
    ],
    Reporte_conductores: [
      {campo:"id", texto: "id", sortable: true, filter: true },
      { campo: "fecha", texto: "fecha", sortable: true, filter: true },
      { campo: "activo movil", texto: "activo movil", sortable: true, filter: true },
      { campo: "fecha", texto: "fecha", sortable: true, filter: true },
      { campo: "activo movil", texto: "activo movil", sortable: true, filter: true },
    ],
  };

  
  private fieldRelations: { [key: string]: any[] } = {
    Customers: [
     "city","department","plan","userType"
    ],
    Users: [
      "role","plans"
    ],

    MobileUnities: [
       "class", "device", "device.deviceType","device.deviceType.brand",
    ],
    Devices: [
      "customer","mobileUnities","deviceType","deviceType.brand","simcard"
    ],
    GeographicalResources: [
      "customer"
    ],
    Notifications: [
      // No tiene relaciones
    ],
    MobileUnityDrivers : [
    
    ],
    SharePreoperational : [
     // "mobileUnities"
    ],
    DeviceTypes: [
     "brand"
    ],
    DevicePlots: [
      "brand","devicePlotDeviceTypes"
    ],
    DevicePlotDeviceType:[
      "deviceType", "devicePlot","eventType","deviceType.brand"
    ],
    MobileUnitySubclass: [
     "class"
    ],
    MobileUnityType: [
      "class"
    ],
    NoveltyTypes: [
     "eventType"
    ],
    CentralAlerts: [
     // "customer","eventType","device"
     ],
     MobileUnityEvents: [ // Tabla que depreonto no va existir
      
    //"mobileUnities","driver","customer"
    ],
      
  };

  private fieldJoins: { [key: string]: any[] } = {
      MobileUnities: [
        {"mainkey":"brandId", "join":"Brands","joinkey":"id"},
      ],
      Consultants: [
        {"mainkey":"cityId", "join":"Cities","joinkey":"id"},
        {"mainkey":"departmentId", "join":"Departments","joinkey":"id"},
      ],
      Notifications: [
        // {"mainkey":"customerId", "join":"Customers","joinkey":"id"},
        // {"mainkey":"mobileUnityId", "join":"MobileUnities","joinkey":"id"},
        // {"mainkey":"eventTypeId", "join":"EventTypes","joinkey":"id"},
        {"mainkey":"mobileUnityId", "join":"MobileUnities","joinkey":"id"},
      ],
      DriversDallas: [
        {"mainkey":"idDallas", "join":"MobileUnityDallasKeys","joinkey":"id"},
      ],
      SharePreoperational: [
        {"mainkey":"unityId", "join":"MobileUnities","joinkey":"id"},
      ],
      DevicePlots: [
        {"mainkey":"type", "join":"EventTypes","joinkey":"id"},
      ],
      DeviceTypeCommands: [
        {"mainkey":"deviceTypeId", "join":"DeviceTypes","joinkey":"id"},
        {"mainkey":"commandId", "join":"CommandsList","joinkey":"id"},
      ],
  };
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dataService: DataService) {

    this.body = {
      entityName : "",
      fields : [],
      relations: [],
      joins: [],
    }
  }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.selectedLink = params.get('page') ?? '';
      console.log('Selected Link:', this.selectedLink);

      // Fetch data each time the route changes
      this.fetchData();
    });
  }


  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    console.log("hola");
  }

  private fetchData() {
    console.log(this.fieldJoins)
    this.dataService.fetchData(this.fieldMappings, this.selectedLink, this.fieldRelations,undefined, this.fieldJoins)
      .pipe(
        tap(response => {
          // Procesa la respuesta según sea necesario
          this.result = response;

          if (this.result.header && Array.isArray(this.result.header)) {
            this.fieldNames = this.result.header.map((item: any) => item.campo.replace(/\./g, ''));
          }
          console.log("Field Names:", this.fieldNames);
          this.updateDisplayedColumns();
        }), 
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError(() => error);
        })
      ).subscribe();
  }


  protected updateDisplayedColumns(): void {
    
    if (this.result.body.length > 0) {
      console.log("data",this.result);
      this.displayedColumns = Object.keys(this.result.body[0]);
    }
  }

  protected isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  protected formatObject(obj: any): string {
    if (Array.isArray(obj)) {
      return obj.map(item => this.formatObject(item)).join(', ');
    } else if (this.isObject(obj)) {
      return Object.values(obj).map(val => this.formatObject(val)).join(', ');
    }
    return obj;
  }

   // private fetchData() {
  //   console.log(this.fieldJoins);
  //   this.dataService.fetchData(this.fieldMappings, this.selectedLink, this.fieldRelations, undefined, this.fieldJoins)
  //     .pipe(
  //       tap(response => {
  //         this.result = response;
  
  //         if (this.result.header && Array.isArray(this.result.header)) {
  //           this.fieldNames = this.result.header.map((item: any) => item.campo.replace(/\./g, ''));
  //         }
  
  //         if (this.result.body && Array.isArray(this.result.body)) {
  //           this.result.body = this.result.body.map((item: any) => this.removeDotsFromKeys(item));
  //         }
  //         console.log(this.result.body);
  //         console.log("Field Names:", this.fieldNames);
  //         this.updateDisplayedColumns();
  //       }), 
  //       catchError(error => {
  //         console.log('Error en la solicitud:', error);
  //         return throwError(() => error);
  //       })
  //     ).subscribe();
  // }
  
  // protected updateDisplayedColumns(): void {
  //   if (this.result.body.length > 0) {
  //     console.log("data", this.result);
  //     this.displayedColumns = Object.keys(this.result.body[0]).map(key => key.replace(/\./g, ''));
  //     console.log("keys body", this.displayedColumns);
  //   }
  // }
  
  // private removeDotsFromKeys(obj: any): any {
  //   if (Array.isArray(obj)) {
  //     return obj.map(this.removeDotsFromKeys);
  //   } else if (this.isObject(obj)) {
  //     return Object.keys(obj).reduce((acc, key) => {
  //       const newKey = key.replace(/\./g, '');
  //       acc[newKey] = this.removeDotsFromKeys(obj[key]);
  //       return acc;
  //     }, {} as any);
  //   }
  //   return obj;
  // }
  
  // protected isObject(value: any): boolean {
  //   return value && typeof value === 'object' && !Array.isArray(value);
  // }
  
  // protected formatObject(obj: any): string {
  //   if (Array.isArray(obj)) {
  //     return obj.map(item => this.formatObject(item)).join(', ');
  //   } else if (this.isObject(obj)) {
  //     return Object.values(obj).map(val => this.formatObject(val)).join(', ');
  //   }
  //   return obj;
  // }

  saveUser() {
    console.log('User saved!');
  }

  updateUser() {
    console.log('User updated!');
  }
}


// fetchData(): void {
//   this.data = []; // Reiniciar datos antes de hacer la nueva solicitud
//   this.displayedColumns = []; // Reiniciar columnas

//   switch (this.selectedLink) {
//     case 'mapa':
//       this.fetchMapaData();
//       break;
//     case 'general':
//       this.fetchGeneralData();
//       break;
//     default:
//       console.log('Ruta no manejada:', this.selectedLink);
//       break;
//   }
// }

// fetchMapaData(): void {
//   this.dataSubscription = this.http.get<EstructuraData[]>('https://jsonplaceholder.typicode.com/users')
//     .pipe(
//       catchError(error => {
//         console.error('Error fetching map data:', error);
//         return throwError(error);
//       })
//     )
//     .subscribe(data => {
//       this.data = data;
//       if (data.length > 0) {
//         this.displayedColumns = Object.keys(data[0]);
//       }
//       console.log('Map Data:', this.data);
//     });
// }

// fetchGeneralData(): void {
//   this.dataSubscription = this.http.get<EstructuraData[]>('https://jsonplaceholder.typicode.com/posts')
//     .pipe(
//       catchError(error => {
//         console.error('Error fetching general data:', error);
//         return throwError(error);
//       })
//     )
//     .subscribe(data => {
//       this.data = data;
//       if (data.length > 0) {
//         this.displayedColumns = Object.keys(data[0]);
//       }
//       console.log('General Data:', this.data);
//     });
// }

// isObject(value: any): boolean {
//   return value && typeof value === 'object' && !Array.isArray(value);
// }

// formatObject(obj: any): string {
//   if (Array.isArray(obj)) {
//     return obj.map(item => this.formatObject(item)).join(', ');
//   } else if (this.isObject(obj)) {
//     return Object.values(obj).map(val => this.formatObject(val)).join(', ');
//   }
//   return obj;
// }


 // fetchData(): void {
  //   this.displayedColumns = []; // Reiniciar columnas

  //   switch (this.selectedLink) {
  //     case 'mapa':
  //       this.data.header = this.tableDataMapa.header;
  //       this.data.body = this.tableDataMapa.body;
  //       break;
  //     case 'general':
  //       this.data.header = this.tableDataGeneral.header;
  //       this.data.body = this.tableDataGeneral.body;
  //       break;
  //     default:
  //       console.log('Ruta no manejada:', this.selectedLink);
  //       break;
  //   }
  //   this.updateDisplayedColumns();
  // }


// tableDataMapa = {  // Estructura de datos para la vista 'mapa'
//   header: [
//     {
//       texto: "id",
//       sortable: true,
//       filter: true
//     },
//     {
//       texto: "name",
//       sortable: false,
//       filter: true
//     },
//     {
//       texto: "country",
//       sortable: true,
//       filter: true
//     },
//     {
//       texto: "company",
//       sortable: false,
//       filter: true
//     },
//     {
//       texto: "date",
//       sortable: false,
//       filter: false
//     },
//     {
//       texto: "status",
//       sortable: true,
//       filter: true
//     },
//     {
//       texto: "verified",
//       sortable: false,
//       filter: false
//     },
//     {
//       texto: "activity",
//       sortable: false,
//       filter: true
//     },
//     {
//       texto: "balance",
//       sortable: false,
//       filter: false
//     },
//     {
//       texto: "acciones",
//       sortable: false,
//       filter: false
//     }
//   ],
//   body: [
//     {
//       id: 1000,
//       name: 'James Butt',
//       country: 'Algeria',
//       company: 'Benton, John B Jr',
//       date: '2015-09-13',
//       status: 'unqualified',
//       verified: true,
//       activity: 17,
//       balance: 70663,
//       representative: 'Ioni Bowcher'
//     },
//     {
//       id: 1001,
//       name: 'Josephine Darakjy',
//       company: 'Chanay, Jeffrey A Esq',
//       date: '2019-02-09',
//       status: 'proposal',
//       verified: true,
//       activity: 0,
//       balance: 82429,
//       representative: [{ name: 'Anna Bowcher' }]
//     },
//     {
//       id: 1002,
//       name: 'Art Venere',
//       country: { name: 'France' },
//       company: 'Chemel, James L Cpa',
//       date: '2017-05-13',
//       status: 'qualified',
//       verified: false,
//       activity: 63,
//       balance: 28334,
//       representative: { name: 'Peter Bowcher' }
//     }
//   ],
//   footer: null
// };

// tableDataGeneral = {  // Estructura de datos para la vista 'general'
//   header: [
//     {
//       texto: "id",
//       sortable: true,
//       filter: true
//     },
//     {
//       texto: "title",
//       sortable: false,
//       filter: true
//     },
//     {
//       texto: "body",
//       sortable: false,
//       filter: true
//     },
//     {
//       texto: "userId",
//       sortable: true,
//       filter: true
//     }
//   ],
//   body: [
//     {
//       id: 1,
//       title: 'Post 1',
//       body: 'Content of post 1',
//       userId: 1
//     },
//     {
//       id: 2,
//       title: 'Post 2',
//       body: 'Content of post 2',
//       userId: 1
//     },
//     {
//       id: 3,
//       title: 'Post 3',
//       body: 'Content of post 3',
//       userId: 2
//     }
//   ],
//   footer: null
// };
