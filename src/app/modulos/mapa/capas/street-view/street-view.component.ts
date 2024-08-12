import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { DataService } from '../../../../core/services/data.service';

declare var google: any;

@Component({
  selector: 'app-street-view',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './street-view.component.html',
  styleUrls: ['./street-view.component.scss']
})
export class StreetViewComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('streetViewMap') streetViewMap!: ElementRef;
  visible: boolean = false;
  private subscription: Subscription | undefined;
  private ultiCoords: {lat: number, lng: number} | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.subscription = this.dataService.showStreetView$.subscribe((coords) => {
      this.ultiCoords = coords;
      this.showDialog();
    });
  
    if (typeof google === 'undefined') {
      (window as any)['initMap'] = () => {
        // La API de Google Maps se ha cargado
        if (this.visible && this.ultiCoords) {
          this.initStreetView(this.ultiCoords.lat, this.ultiCoords.lng);
        }
      };
    }
  }

  ngAfterViewInit() {
    if (this.visible && this.ultiCoords) {
      this.initStreetView(this.ultiCoords.lat, this.ultiCoords.lng);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showDialog() {
    this.visible = true;
    setTimeout(() => {
      if (this.ultiCoords) {
        this.initStreetView(this.ultiCoords.lat, this.ultiCoords.lng);
      }
    }, 100);
  }

  initStreetView(lat: number, lng: number) {
    if (google && google.maps && this.streetViewMap) {
      const sv = new google.maps.StreetViewService();
      sv.getPanorama({ location: { lat, lng }, radius: 50 }, (data: any, status: any) => {
        if (status === google.maps.StreetViewStatus.OK) {
          const panorama = new google.maps.StreetViewPanorama(
            this.streetViewMap.nativeElement,
            {
              position: { lat, lng },
              pov: { heading: 165, pitch: 0 },
              zoom: 1
            }
          );
        } else {
          console.error('La ubicacion no se encuntra disponible');
         
        }
      });
    } else {
      console.error('Google Maps API not loaded properly.');
    }
  }
}