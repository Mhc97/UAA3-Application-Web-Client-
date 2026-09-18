import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { MedecinDashboardComponent } from './pages/medecin-dashboard/medecin-dashboard';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'medecin/dashboard', component: MedecinDashboardComponent },
  { path: 'patient/dashboard', component: PatientDashboardComponent },
];
