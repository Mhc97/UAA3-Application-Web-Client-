import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, Medecin, RendezVous } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  // Patients
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
  }
  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, patient);
  }
  updatePatient(id: string, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/patients/${id}`, patient);
  }
  deletePatient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/patients/${id}`);
  }

  // Medecins
  getMedecins(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(`${this.apiUrl}/medecins`);
  }
  addMedecin(medecin: Medecin): Observable<Medecin> {
    return this.http.post<Medecin>(`${this.apiUrl}/medecins`, medecin);
  }
  updateMedecin(id: string, medecin: Medecin): Observable<Medecin> {
    return this.http.put<Medecin>(`${this.apiUrl}/medecins/${id}`, medecin);
  }
  deleteMedecin(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/medecins/${id}`);
  }

  // Rendez-vous
  getRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/rendezvous`);
  }
  getRendezVousByMedecin(medecinId: string): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/rendezvous?medecinId=${medecinId}`);
  }
  getRendezVousByPatient(patientId: string): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/rendezvous?patientId=${patientId}`);
  }
}