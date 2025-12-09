import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'reports', component: ReportsComponent },
            { path: 'transactions', component: TransactionsComponent }
        ],
    },
];
