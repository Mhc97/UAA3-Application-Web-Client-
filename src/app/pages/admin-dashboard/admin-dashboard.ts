import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data';
import { Patient, Medecin, RendezVous } from '../../models/model';
import { PhonePipe } from '../../pipes/phone-pipe';
import { DateFormatPipe } from '../../pipes/date-format-pipe';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, PhonePipe, DateFormatPipe],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  patients: Patient[] = [];
  medecins: Medecin[] = [];
  rendezvous: RendezVous[] = [];

  newPatient: Patient = { id: '', nom: '', email: '', password: '', telephone: '' };
  newMedecin: Medecin = { id: '', nom: '', email: '', password: '', telephone: '', specialite: '' };

  editingPatientId: string | null = null;
  editingMedecinId: string | null = null;

  ngOnInit(): void {
    const id = localStorage.getItem('id');
    const role = localStorage.getItem('role');

    if (!id || role !== 'admin') {
      this.router.navigate(['/login']);
      return;
    }

    this.loadData();
  }

  loadData() {
    this.dataService.getPatients().subscribe(data => {
      this.patients = data;
      this.cdr.detectChanges();
    });

    this.dataService.getMedecins().subscribe(data => {
      this.medecins = data;
      this.cdr.detectChanges();
    });

    this.dataService.getRendezVous().subscribe(data => {
      this.rendezvous = data;
      this.cdr.detectChanges();
    });
  }

  savePatient() {
    if (this.editingPatientId) {
      this.dataService.updatePatient(this.editingPatientId, this.newPatient).subscribe(() => {
        this.loadData();
        this.resetPatientForm();
      });
    } else {
      this.dataService.addPatient(this.newPatient).subscribe(() => {
        this.loadData();
        this.resetPatientForm();
      });
    }
  }

  editPatient(p: Patient) {
    this.editingPatientId = p.id;
    this.newPatient = { ...p };
  }

  deletePatient(id: string) {
    if (confirm('Supprimer ce patient ?')) {
      this.dataService.deletePatient(id).subscribe(() => this.loadData());
    }
  }

  resetPatientForm() {
    this.newPatient = { id: '', nom: '', email: '', password: '', telephone: '' };
    this.editingPatientId = null;
  }

  saveMedecin() {
    if (this.editingMedecinId) {
      this.dataService.updateMedecin(this.editingMedecinId, this.newMedecin).subscribe(() => {
        this.loadData();
        this.resetMedecinForm();
      });
    } else {
      this.dataService.addMedecin(this.newMedecin).subscribe(() => {
        this.loadData();
        this.resetMedecinForm();
      });
    }
  }

  editMedecin(m: Medecin) {
    this.editingMedecinId = m.id;
    this.newMedecin = { ...m };
  }

  deleteMedecin(id: string) {
    if (confirm('Supprimer ce médecin ?')) {
      this.dataService.deleteMedecin(id).subscribe(() => this.loadData());
    }
  }

  resetMedecinForm() {
    this.newMedecin = { id: '', nom: '', email: '', password: '', telephone: '', specialite: '' };
    this.editingMedecinId = null;
  }

  getPatientName(id: string): string {
    return this.patients.find(p => p.id === id)?.nom || 'Inconnu';
  }

  getMedecinName(id: string): string {
    return this.medecins.find(m => m.id === id)?.nom || 'Inconnu';
  }
}