import { Routes } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';

export const routes: Routes = [
  { path: 'mapa', component: MapaComponent },
  { path: 'notificaciones', component: NotificacionesComponent },
  { path: 'perfil', component: PerfilUsuarioComponent },
];                                                                                  