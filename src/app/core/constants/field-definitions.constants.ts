export const FORM_FIELDS: { [key: string]: any[] } = {
    Customers: [
        {name:'fullName', label: 'Nombre', type: 'text', required: true, placeholder: 'Ingrese el nombre del cliente' },
        
        {name:'planname', label: 'Plan',type: 'text', required: true, placeholder: 'Ingrese el nombre del cliente' },
        
        {name:'email', label: 'Correo electronico', type: 'text', required: true, placeholder: 'Ingrese el nombre del cliente' },
        
        {name:'userTypename', label: 'Tipo de usuario', type: 'text', required: true, placeholder: '' }, 
        
        {name:'departmentname', label: 'Departamento',  type: 'select', entidad: 'Departments', options: [{ name: 'Risaralda', value: 25 },
            { name: 'Caldas', value: 7 },
            { name: 'Cundinamarca', value: 14 }], required: true, placeholder: 'Selecciona Departamento' }, 
        
        {name:'cityname', label: 'Ciudad', type: 'select', entidad: 'Cities', options: [{ name: 'Leticia', value: 1 },
            { name: 'Santa Isabel', value: 1048 },
            { name: 'Buga', value: 1060 }], required: true, placeholder: 'Selecciona Ciudad ' }, 
        
        {name:'status', label: 'Estado', type: 'checkbox', required: true, placeholder: 'Estado' },
    ],

    Devices: [
        {name:'customerfullName', label: 'Cliente', type: 'text', required: true, placeholder: 'Ingrese el nombre del cliente' },
      {name:'devicedeviceTypebrandname', label: 'Tipo de dispositivo',type: 'text', required: true, placeholder: 'Tipo de dispositivo' },
      {name:'devicedeviceTypecode', label: 'Referencia', type: 'text', required: true, placeholder: 'Referencia' },
      {name:'plate', label: 'Placa', type: 'text', required: true, placeholder: 'Placa' },
      {name:'deviceimei', label: 'Ciudad', type: 'text', required: true, placeholder: 'Imei gps' },
      {name:'classname', label: 'Clase', type: 'text', required: true, placeholder: 'Clase ' },
    ]
}