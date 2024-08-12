import { Component } from '@angular/core';
import { TableAvanzadaComponent } from "../../shared/components/tables/table-avanzada/table-avanzada.component";

@Component({
  selector: 'app-central-monitoreo',
  standalone: true,
  imports: [TableAvanzadaComponent],
  templateUrl: './central-monitoreo.component.html',
  styleUrl: './central-monitoreo.component.scss'
})
export class CentralMonitoreoComponent {

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
      {campo:"endreport.customer_name", texto: "Cliente", sortable: true, filter: true },
      {campo:"device.deviceType.brand.name", texto: "Tipo de dispositivo",sortable: false, filter: true },
      {campo:"device.deviceType.code", texto: "Referencia del dispositivo",sortable: false, filter: true },
      {campo:"plate", texto: "Nombre / Placa", sortable: true, filter: true },
      {campo:"device.imei", texto: "IMEI dispositivoil", sortable: false, filter: true },
      {campo:"runt", texto: "Runt", sortable: true, filter: true },
      {campo:"model", texto: "Modelo", sortable: true, filter: true },
      {campo:"class.name", texto: "Clase", sortable: true, filter: true },
      {campo:"endreport.status", texto: "Estado actual", sortable: true, filter: true },  //no sabemos de donde viene
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
      {campo:"id", texto: "id", sortable: true, filter: true },
      {campo:"Customers.fullName", texto: "Cliente", sortable: true, filter: true },
      {campo:"EventTypes.name", texto: "Tipo de evento",sortable: false, filter: true },
      {campo:"MobileUnities.plate", texto: "	Activos móviles", sortable: true, filter: true },
      {campo:"emails", texto: "Correos", sortable: false, filter: true },
      {campo:"notificationPush", texto: "Notificaciones push", sortable: true, filter: true },
      {campo:"notificationEmail", texto: "Notificaciones email", sortable: true, filter: true },
      {campo:"status", texto: "Estado", sortable: true, filter: true },
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
 
   
  };


}
