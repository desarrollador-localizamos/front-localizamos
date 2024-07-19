import { Component, OnInit } from '@angular/core';
import { ServiceMapService } from '../servicio-mapa/service-map.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-agregar-carro',
  standalone: true,
  templateUrl: './agregar-carro.component.html',
  styleUrls: ['./agregar-carro.component.scss']
})
export class AgregarCarroComponent implements OnInit {
  constructor(private mapService: ServiceMapService) {}

  ngOnInit() {
    this.mapService.getMap().subscribe(map => {
      if (map) {
        this.addMarker(4.81333, -75.69611); // Coordenadas de ejemplo para el marcador
      } else {
        console.warn('Map not initialized yet');
      }
    });
  }

  addMarker(lat: number, lng: number) {
    console.log('Añadiendo marcador en:', lat, lng);

    const defaultIcon = L.icon({
      iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76]
    });

    this.mapService.addMarker(lat, lng, defaultIcon);
  }
}





