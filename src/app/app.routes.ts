import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { TableCustomersComponent } from './shared/components/tables/table-customers/table-customers.component';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    {
        path: "",
    	component: LayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'customers', component: CustomersComponent,
                children: [
                { path: '', component: TableCustomersComponent}
                ]
            }
        ]
    },
    
  
    


];
