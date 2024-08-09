export const Fields: { [key: string]: any[] } ={
    EventTypes:[
      {campo:"id", texto: "id" },
      {campo:"name", texto: "campo" },
    ],
    Customers: [
      {campo:"id", texto: "id" },
      {campo:"fullName", texto: "campo" },
    ],
    Devices: [
      {campo:"mobileUnities.id", texto: "id" },
      {campo:"mobileUnities.plate", texto: "campo" },
      {campo:"customerId", texto: "campo" },
    ],
    MobileUnityGroups: [
      {campo:"id", texto: "id" },
      {campo:"name", texto: "campo" },
    ],
    Cities:[
      {campo:"id", texto: "id" },
      {campo:"name", texto: "campo" },
    ],
    Departments:[
      {campo:"id", texto: "id" },
      {campo:"name", texto: "campo" },
    ],
    MobileUnityGroupunity: [
      {campo:"unity.id", texto: "id" },
      {campo:"unity.plate", texto: "campo" },
    ],
    
    'Reporte general': [
      {"campo":"MobileUnities.plate","texto":"Placa","sortable":true,"filter":true},
      {"campo":"cantidad","texto":"", "id": "Cantidad","sortable":true,"filter":true},
      {"campo":"porcentaje","texto":"", "id": "Porcentaje","sortable":true,"filter":true}
     ],
    'Reporte horas trabajadas': [
      {"campo":"id","texto":"id","sortable":true,"filter":true},
      {"campo":"start","texto":"Cliente","sortable":true,"filter":true},
      {"campo":"MobileUnities.plate","texto":"\tActivos móviles","sortable":true,"filter":true}
    ],
    'Reporte kilometros recorridos': [
      {"campo":"MobileUnities.plate","texto":"Placa","sortable":true,"filter":true},
      {"campo":"km","texto":"Kilometros recorridos","sortable":true,"filter":true},
      {"campo":"MobileUnities.milesXGallon","texto":"Frenado Brusco","sortable":true,"filter":true}
    ],
    'Reporte de velocidad promedio': [
      {"campo":"MobileUnities.plate","texto":"Placa","sortable":true,"filter":true},
      {"campo":"velocity","texto":"Velocidad promedio","sortable":true,"filter":true},
      {"campo":"rank1","texto":"Menos de 64 km/h","sortable":true,"filter":true},
      {"campo":"rank2","texto":"65 km/h - 79 km/h","sortable":false,"filter":true},
      {"campo":"rank3","texto":"80km/h en adelante","sortable":true,"filter":true}
    ],
    // 'Reporte geocercas': [],
    // 'Reporte de mantenimiento': [],
    // 'Reporte gerencial': [],
    // 'Reporte de certificado': [],
    // 'Reporte horas reposo': [],
    // 'Reporte de temperatura': [],
    // 'Reporte de conductores': [],
    'Reporte preoperacional': [
      {"campo":"MobileUnities.plate","texto":"Placa","sortable":true,"filter":true},
      {"campo":"resultDate","texto":"", "id": "Fecha","sortable":true,"filter":true},
      {"campo":"Customers.fullName","texto":"Realizado por","sortable":false,"filter":true},
      {"campo":"status","texto":"Estado","sortable":false,"filter":true}
    ],
    'Reporte hábitos de conducción': [
      {"campo":"MobileUnities.plate","texto":"Placa","sortable":true,"filter":true},
      {"campo":"aceleracionBrusca","texto":"Aceleración brusca","sortable":true,"filter":true},
      {"campo":"frenadoBrusco","texto":"Frenado Brusco","sortable":true,"filter":true},
      {"campo":"excesoVelocidad","texto":"Exceso de velocidad","sortable":true,"filter":true},
      {"campo":"eventTypeId","texto":"","sortable":true,"filter":true}
    ],
    'Reporte de gasolina': [{"campo":"plate","texto":"Placa","sortable":true,"filter":true},
      {"campo":"date","texto":"Fecha","sortable":true,"filter":true},
      {"campo":"price","texto":"Precio","sortable":true,"filter":true},
      {"campo":"carMileage","texto":"Kilometraje","sortable":false,"filter":true},
      {"campo":"fuelQuantity","texto":"Galones recargados","sortable":true,"filter":true},
      {"campo":"resultgal","texto":"Galones consumidos","sortable":true,"filter":true},
      {"campo":"resultkm","texto":"Kilometros recorridos","sortable":true,"filter":true},
      {"campo":"rendimiento","texto":"Rendimiento","sortable":true,"filter":true}
    ],
  };