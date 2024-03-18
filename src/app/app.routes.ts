import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { TableCustomersComponent } from './shared/components/tables/table-customers/table-customers.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'customers', component: CustomersComponent,
        children: [
            { path: '', component: TableCustomersComponent}
        ]
    }


];
