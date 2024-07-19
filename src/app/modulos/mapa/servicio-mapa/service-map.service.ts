import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceMapService {
  private mapSubject = new BehaviorSubject<L.Map | null>(null);
  map$ = this.mapSubject.asObservable();

  private markersSubject = new BehaviorSubject<L.Marker[]>([]);
  markers$ = this.markersSubject.asObservable();

  setMap(map: L.Map): void {
    console.log('Setting map:', map);
    this.mapSubject.next(map);
  }

  getMap(): Observable<L.Map | null> {
    return this.map$.pipe(
      take(1),
      tap(map => {
        if (!map) console.warn('Map not initialized');
      })
    );
  }

  addMarker(lat: number, lng: number, icon?: L.Icon, options?: L.MarkerOptions): void {
    this.getMap().subscribe(map => {
      if (map) {
        console.log('Añadiendo marcador en el mapa:', map);
        const markerOptions = { ...options, icon };
        const marker = L.marker([lat, lng], markerOptions).addTo(map);
        console.log('Marker added:', marker);
        this.markersSubject.next([...this.markersSubject.value, marker]);
      } else {
        console.warn('Map not initialized');
      }
    });
  }

  removeMarker(marker: L.Marker): void {
    this.getMap().subscribe(map => {
      if (map) {
        map.removeLayer(marker);
        const updatedMarkers = this.markersSubject.value.filter(m => m !== marker);
        this.markersSubject.next(updatedMarkers);
      }
    });
  }
}
