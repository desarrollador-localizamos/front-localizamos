import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProductsData() {
    return [
      {
        id: 1,
        nombre: "Don Guillo",
        plan: "Premium",
        correo: "donguillo123@gmail.com",
        tipoUsuario: "Persona Natural",
        departamento: "Risaralda",
        ciudad: "Pereira",
        celular: "3333335",
        ultimaConexion: "2021-05-20",
        estado: "Active",
        orders: [{
          dispositivo: "Suntech",
          placa: "EPO890",
          imei: "807770456",
          modelo: "2023",
          clase: "Vehículo de transporte",
          estado: "Active"
        }]
      },
      {
        id: 3,
        nombre: "Jane Smith",
        plan: "Premium",
        correo: "janesmith@example.com",
        tipoUsuario: "VIP",
        departamento: "Marketing",
        ciudad: "Los Angeles",
        celular: "555-5678",
        ultimaConexion: "2021-05-19",
        estado: "Active",
        orders: []
      },
      {
        id: 2,
        nombre: "Mike Johnson",
        plan: "Basic",
        correo: "mikejohnson@example.com",
        tipoUsuario: "Regular",
        departamento: "placa Service",
        ciudad: "Chicago",
        celular: "555-9012",
        ultimaConexion: "2021-05-18",
        estado: "Inactive"
      },
      {
        id: 4,
        nombre: "Emily Davis",
        plan: "Premium",
        correo: "emilydavis@example.com",
        tipoUsuario: "VIP",
        departamento: "Finance",
        ciudad: "Houston",
        celular: "555-3456",
        ultimaConexion: "2021-05-17",
        estado: "Active",
        orders: []
      },
      {
        id: 5,
        nombre: "Chris Wilson",
        plan: "Basic",
        correo: "chriswilson@example.com",
        tipoUsuario: "Regular",
        departamento: "Operations",
        ciudad: "Phoenix",
        celular: "555-7890",
        ultimaConexion: "2021-05-16",
        estado: "Active",
        orders: []
      },
      {
        id: 6,
        nombre: "Amy Thompson",
        plan: "Premium",
        correo: "amythompson@example.com",
        tipoUsuario: "VIP",
        departamento: "Human Resources",
        ciudad: "Philadelphia",
        celular: "555-2345",
        ultimaConexion: "2021-05-15",
        estado: "Inactive",
        orders: []
      },
      {
        id: 7,
        nombre: "Mark Anderson",
        plan: "Basic",
        correo: "markanderson@example.com",
        tipoUsuario: "Regular",
        departamento: "IT",
        ciudad: "San Antonio",
        celular: "555-6789",
        ultimaConexion: "2021-05-14",
        estado: "Active"
      },
      {
        id: 8,
        nombre: "Laura Garcia",
        plan: "Premium",
        correo: "lauragarcia@example.com",
        tipoUsuario: "VIP",
        departamento: "Sales",
        ciudad: "San Diego",
        celular: "555-0123",
        ultimaConexion: "2021-05-13",
        estado: "Active",
        orders: []
      },
      {
        id: 9,
        nombre: "Kevin Martinez",
        plan: "Basic",
        correo: "kevinmartinez@example.com",
        tipoUsuario: "Regular",
        departamento: "Marketing",
        ciudad: "Dallas",
        celular: "555-4567",
        ultimaConexion: "2021-05-12",
        estado: "Inactive",
        orders: []
      },
      {
        id: 10,
        nombre: "Sara Robinson",
        plan: "Premium",
        correo: "sararobinson@example.com",
        tipoUsuario: "VIP",
        departamento: "placa Service",
        ciudad: "San Jose",
        celular: "555-8901",
        ultimaConexion: "2021-05-11",
        estado: "Active",
        orders: []
      },
      {
        id: 11,
        nombre: "Tom Wilson",
        plan: "Basic",
        correo: "tomwilson@example.com",
        tipoUsuario: "Regular",
        departamento: "Finance",
        ciudad: "Austin",
        celular: "555-2345",
        ultimaConexion: "2021-05-10",
        estado: "Active",
        orders: []
      },
      {
        id: 12,
        nombre: "Olivia Davis",
        plan: "Premium",
        correo: "oliviadavis@example.com",
        tipoUsuario: "VIP",
        departamento: "Operations",
        ciudad: "Jacksonville",
        celular: "555-6789",
        ultimaConexion: "2021-05-09",
        estado: "Inactive",
        orders: []
      },
      {
        id: 13,
        nombre: "Alex Thompson",
        plan: "Basic",
        correo: "alexthompson@example.com",
        tipoUsuario: "Regular",
        departamento: "Human Resources",
        ciudad: "San Francisco",
        celular: "555-0123",
        ultimaConexion: "2021-05-08",
        estado: "Active",
        orders: []
      },
      {
        id: 14,
        nombre: "Jessica Anderson",
        plan: "Premium",
        correo: "jessicaanderson@example.com",
        tipoUsuario: "VIP",
        departamento: "IT",
        ciudad: "Indianapolis",
        celular: "555-4567",
        ultimaConexion: "2021-05-07",
        estado: "Active",
        orders: []
      },
      {
        id: 15,
        nombre: "Erica Garcia",
        plan: "Basic",
        correo: "ericagarcia@example.com",
        tipoUsuario: "Regular",
        departamento: "Sales",
        ciudad: "Columbus",
        celular: "555-8901",
        ultimaConexion: "2021-05-06",
        estado: "Inactive",
        orders: []
      },
      {
        id: 16,
        nombre: "Daniel Martinez",
        plan: "Premium",
        correo: "danielmartinez@example.com",
        tipoUsuario: "VIP",
        departamento: "Marketing",
        ciudad: "Fort Worth",
        celular: "555-2345",
        ultimaConexion: "2021-05-05",
        estado: "Active",
        orders: []
      },
      {
        id: 17,
        nombre: "Lily Robinson",
        plan: "Basic",
        correo: "lilyrobinson@example.com",
        tipoUsuario: "Regular",
        departamento: "placa Service",
        ciudad: "Charlotte",
        celular: "555-6789",
        ultimaConexion: "2021-05-04",
        estado: "Active",
        orders: []
      },
      {
        id: 18,
        nombre: "Oscar Wilson",
        plan: "Premium",
        correo: "oscarwilson@example.com",
        tipoUsuario: "VIP",
        departamento: "Finance",
        ciudad: "Seattle",
        celular: "555-0123",
        ultimaConexion: "2021-05-03",
        estado: "Inactive",
        orders: []
      },
      {
        id: 19,
        nombre: "Sophia Davis",
        plan: "Basic",
        correo: "sophiadavis@example.com",
        tipoUsuario: "Regular",
        departamento: "Operations",
        ciudad: "Denver",
        celular: "555-4567",
        ultimaConexion: "2021-05-02",
        estado: "Active",
        orders: []
      },
      {
        id: 20,
        nombre: "Mia Thompson",
        plan: "Premium",
        correo: "miathompson@example.com",
        tipoUsuario: "VIP",
        departamento: "Human Resources",
        ciudad: "Washington",
        celular: "555-8901",
        ultimaConexion: "2021-05-01",
        estado: "Active",
        orders: []
      },
      {
        id: 21,
        nombre: "Aiden Anderson",
        plan: "Basic",
        correo: "aidenanderson@example.com",
        tipoUsuario: "Regular",
        departamento: "IT",
        ciudad: "Boston",
        celular: "555-2345",
        ultimaConexion: "2021-04-30",
        estado: "Inactive",
        orders: []
      },
      {
        id: 22,
        nombre: "Isabella Garcia",
        plan: "Premium",
        correo: "isabellagarcia@example.com",
        tipoUsuario: "VIP",
        departamento: "Sales",
        ciudad: "Nashville",
        celular: "555-6789",
        ultimaConexion: "2021-04-29",
        estado: "Active",
        orders: []
      },
      {
        id: 23,
        nombre: "Ethan Martinez",
        plan: "Basic",
        correo: "ethanmartinez@example.com",
        tipoUsuario: "Regular",
        departamento: "Marketing",
        ciudad: "Baltimore",
        celular: "555-0123",
        ultimaConexion: "2021-04-28",
        estado: "Active",
        orders: []
      },
      {
        id: 24,
        nombre: "Abigail Robinson",
        plan: "Premium",
        correo: "abigailrobinson@example.com",
        tipoUsuario: "VIP",
        departamento: "placa Service",
        ciudad: "Memphis",
        celular: "555-4567",
        ultimaConexion: "2021-04-27",
        estado: "Inactive",
        orders: []
      },
      {
        id: 25,
        nombre: "James Wilson",
        plan: "Basic",
        correo: "jameswilson@example.com",
        tipoUsuario: "Regular",
        departamento: "Finance",
        ciudad: "Austin",
        celular: "555-8901",
        ultimaConexion: "2021-04-26",
        estado: "Active",
        orders: []
      }
    ];
  }

  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  }

  getProductsSmall() {
      return Promise.resolve(this.getProductsData().slice(0, 10));
  }

  getProducts() {
      return Promise.resolve(this.getProductsData());
  }

  getProductsWithOrdersSmall() {
      return Promise.resolve(this.getProductsData().slice(0, 200));
  }

  getProductsWithOrders() {
      return Promise.resolve(this.getProductsData());
  }
}
