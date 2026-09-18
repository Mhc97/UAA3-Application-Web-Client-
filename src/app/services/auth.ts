import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Admin, Medecin, Patient } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000';

  utilisateurConnecte = signal<{ id: string, role: string } | null>(null);

  login(email: string, password: string) {
    // ⭐ On encode l'email pour l'URL
    const emailEncode = encodeURIComponent(email);

    // 1. Vérifier dans admins (par email uniquement)
    this.http.get<Admin[]>(`${this.apiUrl}/admins?email=${emailEncode}`)
      .subscribe({
        next: (admins) => {
          console.log('Admins trouvés:', admins);
          if (admins.length > 0 && admins[0].password === password) {
            this.rediriger(admins[0].id, 'admin');
          } else {
            this.verifierMedecin(emailEncode, password);
          }
        },
        error: (erreur) => console.log('Erreur admins:', erreur)
      });
  }

  private verifierMedecin(email: string, password: string) {
    // 2. Vérifier dans medecins (par email uniquement)
    this.http.get<Medecin[]>(`${this.apiUrl}/medecins?email=${email}`)
      .subscribe({
        next: (medecins) => {
          console.log('Medecins trouvés:', medecins);
          if (medecins.length > 0 && medecins[0].password === password) {
            this.rediriger(medecins[0].id, 'medecin');
          } else {
            this.verifierPatient(email, password);
          }
        },
        error: (erreur) => console.log('Erreur medecins:', erreur)
      });
  }

  private verifierPatient(email: string, password: string) {
    // 3. Vérifier dans patients (par email uniquement)
    this.http.get<Patient[]>(`${this.apiUrl}/patients?email=${email}`)
      .subscribe({
        next: (patients) => {
          console.log('Patients trouvés:', patients);
          if (patients.length > 0 && patients[0].password === password) {
            this.rediriger(patients[0].id, 'patient');
          } else {
            alert('Email ou mot de passe incorrect');
          }
        },
        error: (erreur) => console.log('Erreur patients:', erreur)
      });
  }

  private rediriger(id: string, role: string) {
    localStorage.setItem('id', id);
    localStorage.setItem('role', role);
    this.utilisateurConnecte.set({ id, role });

    if (role === 'admin') this.router.navigate(['/admin/dashboard']);
    else if (role === 'medecin') this.router.navigate(['/medecin/dashboard']);
    else if (role === 'patient') this.router.navigate(['/patient/dashboard']);
  }
}