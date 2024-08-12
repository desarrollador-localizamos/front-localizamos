import { Routes } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { CentralMonitoreoComponent } from './central-monitoreo/central-monitoreo.component';
import { RolesPermisosComponent } from './roles-permisos/roles-permisos.component';

export const routes: Routes = [
  { path: 'mapa', component: MapaComponent },
  { path: 'notificaciones', component: NotificacionesComponent },
  { path: 'perfil', component: PerfilUsuarioComponent },
  { path: 'centralMonitoreo', component: CentralMonitoreoComponent },
  { path: 'roles', component: RolesPermisosComponent },
];                                                                                  