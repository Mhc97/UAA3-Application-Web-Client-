import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data';
import { RendezVous, Patient } from '../../models/model';
import { DateFormatPipe } from '../../pipes/date-format-pipe';

@Component({
  selector: 'app-medecin-dashboard',
  standalone: true,
  imports: [CommonModule, DateFormatPipe],
  templateUrl: './medecin-dashboard.html',
  styleUrl: './medecin-dashboard.css'
})
export class MedecinDashboardComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  rendezvous: RendezVous[] = [];
  patients: Patient[] = [];
  medecinId: string = '';

  ngOnInit(): void {
    const id = localStorage.getItem('id');
    const role = localStorage.getItem('role');

    if (!id || role !== 'medecin') {
      this.router.navigate(['/login']);
      return;
    }

    this.medecinId = id;

    this.dataService.getPatients().subscribe(patients => {
      this.patients = patients;

      this.dataService.getRendezVous().subscribe(rendezvous => {
        this.rendezvous = rendezvous.filter(r => r.medecinId === id);
        console.log('Rendez-vous:', this.rendezvous.length);
        
        // ⭐ FORCER la détection de changements
        this.cdr.detectChanges();
      });
    });
  }

  getPatientName(id: string): string {
    return this.patients.find(p => p.id === id)?.nom || 'Inconnu';
  }
}