export interface Admin {
  id: string;
  nom: string;
  email: string;
  password: string;
}

export interface Medecin {
  id: string;
  nom: string;
  email: string;
  password: string;
  telephone: string;
  specialite: string;
}

export interface Patient {
  id: string;
  nom: string;
  email: string;
  password: string;
  telephone: string;
}

export interface RendezVous {
  id: string;
  date: string;
  heure: string;
  patientId: string;
  medecinId: string;
  etat: string;
}