import * as L from 'leaflet';

declare module 'leaflet' {
  interface Marker {
    setRotationAngle(angle: number): this;
    setRotationOrigin(origin: string): this;
  }
}