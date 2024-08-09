export const Multiconditions = {
    'MobileUnityGroups':[{"ref":"customerId","valor": []}],
    'MobileUnityGroupunity':[{"ref":"groupId","valor": [],"tipo":"in" }],
    'Devices':[{"ref":"customerId","valor": []}],
    'Reporte general': [
      {"ref":"unityId","valor":[1185,4704],"tipo":"in"},
      {"ref":"deviceDateHour","valor":["2024-06-01","2024-06-02"],"tipo":"between"},
      {"ref":"eventTypeId","valor": 6},
    ],
    'Reporte horas trabajadas': [
      { "ref": "unityId", "valor": [4704], "tipo" : "in"},
      {"ref":"start","valor":["2024-06-07","2024-06-13"],"tipo":"between"}
    ],
    'Reporte kilometros recorridos': [
      {"ref": "unityId", "valor": [4704,4737], "tipo" : "in"},
      {"ref":"start","valor":["2024-05-06","2024-06-13"],"tipo":"between"},
      {"ref":"type","valor":1},
    ],
    'Reporte de velocidad promedio': [
      {"ref": "unityId", "valor" : [4704], "tipo" : "in"},
      {"ref":"deviceDateHour","valor":["2024-06-01","2024-06-06"],"tipo":"between"}
    ],
    // 'Reporte geocercas': [],
    // 'Reporte de mantenimiento': [],
    // 'Reporte gerencial': [],
    // 'Reporte de certificado': [],
    // 'Reporte horas reposo': [],
    // 'Reporte de temperatura': [],
    // 'Reporte de conductores': [],
    'Reporte preoperacional': [
      {"ref":"unityId","valor":[5535,5540],"tipo":"in"},
      {"ref":"resultDate","valor":["2024-06-11","2024-06-12"],"tipo":"between"},
    ],
    'Reporte hábitos de conducción': [
      { "ref": "unityId", "valor": [4551,4269], "tipo" : "in"},
      {"ref":"deviceDateHour","valor":["2024-06-01","2024-06-01"],"tipo":"between"},
      { "ref": "eventTypeId", "valor": [6, 59, 7], "tipo" : "in"} 
    ],
    'Reporte de gasolina': [
      { "ref": "unityId", "valor": [4551,4269], "tipo" : "in"},
      {"ref":"deviceDateHour","valor":["2024-06-01","2024-06-01"],"tipo":"between"},
      { "ref": "eventTypeId", "valor": [6, 59, 7], "tipo" : "in"} 
    ],
  }