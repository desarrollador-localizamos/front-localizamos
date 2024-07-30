import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { TableCustomersComponent } from './shared/components/tables/table-customers/table-customers.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
//import { isAuthenticatedGuard } from './core/guards';
import { VistaDynamicComponent } from './vistas/vista-dynamic/vista-dynamic.component';
import { VistaDynamic2Component } from './vistas/vista-dynamic2/vista-dynamic2.component';
import { VistaDynamicReporteComponent } from './vistas/vista-dynamic-reporte/vista-dynamic-reporte.component';
import { MapaComponent } from './modulos/mapa/mapa.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    {
        path: "", component: LayoutComponent,

        children: [
            { path: 'dashboard',
           // canActivate: [isAuthenticatedGuard],
             component: DashboardComponent },
            
            { path: 'customers', component: CustomersComponent,
                children: [
                { path: '', component: TableCustomersComponent}
                ]
            },
            {   path: ':page/1', component: VistaDynamicComponent

            },
            {   path: ':page/2', component: VistaDynamic2Component

            },
            {   path: ':page/3', component: VistaDynamicReporteComponent

            },
            { path: 'mapa', component: MapaComponent

            },
            
            {path: '', loadChildren: () => import('./modulos/modulo.routes').then(m => m.routes)}
           
        ]
    },
    
];
