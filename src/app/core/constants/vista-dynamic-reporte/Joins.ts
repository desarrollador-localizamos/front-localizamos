export const Joins: { [key: string]: any[] } = {
    'Customers':[],
    'MobileUnityGroups':[],
    'MobileUnityGroupunity':[],
    'Devices':[],
    'Reporte general': [
      {"mainkey":"unityId", "join":"MobileUnities","joinkey":"id"}
    ],
    'Reporte kilometros recorridos': [
      { "mainkey": "unityId", "join": "MobileUnities", "joinkey": "id" }
    ],
    'Reporte de velocidad promedio': [
      {"mainkey":"unityId", "join":"MobileUnities","joinkey":"id"}
    ],
    // 'Reporte geocercas': [],
    // 'Reporte de mantenimiento': [],
    // 'Reporte gerencial': [],
    // 'Reporte de certificado': [],
    // 'Reporte horas reposo': [],
    // 'Reporte de temperatura': [],
    // 'Reporte de conductores': [],
    'Reporte preoperacional': [
      {"mainkey":"customer", "join":"Customers","joinkey":"id"},
      {"mainkey":"unityId", "join":"MobileUnities","joinkey":"id"}
    ],
    'Reporte hábitos de conducción': [
      { "mainkey": "unityId", "join": "MobileUnities", "joinkey": "id" }
    ],
    'Reporte de gasolina': [
      {"mainkey":"customer", "join":"Customers","joinkey":"id"},
      {"mainkey":"unityId", "join":"MobileUnities","joinkey":"id"}
    ],
  }