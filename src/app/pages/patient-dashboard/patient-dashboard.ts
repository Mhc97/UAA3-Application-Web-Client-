import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data';
import { RendezVous, Medecin } from '../../models/model';
import { DateFormatPipe } from '../../pipes/date-format-pipe';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, DateFormatPipe],
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.css'
})
export class PatientDashboardComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  rendezvous: RendezVous[] = [];
  medecins: Medecin[] = [];
  patientId: string = '';

  ngOnInit(): void {
    const id = localStorage.getItem('id');
    const role = localStorage.getItem('role');

    if (!id || role !== 'patient') {
      this.router.navigate(['/login']);
      return;
    }

    this.patientId = id;

    this.dataService.getMedecins().subscribe(medecins => {
      this.medecins = medecins;

      this.dataService.getRendezVous().subscribe(rendezvous => {
        this.rendezvous = rendezvous.filter(r => r.patientId === id);
        console.log('Rendez-vous patient:', this.rendezvous.length);
        this.cdr.detectChanges();
      });
    });
  }

  getMedecinName(id: string): string {
    return this.medecins.find(m => m.id === id)?.nom || 'Inconnu';
  }
}