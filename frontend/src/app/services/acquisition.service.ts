import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acquisition } from '../models/acquisition';

@Injectable({
  providedIn: 'root'
})
export class AcquisitionService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getAcquisitions(): Observable<Acquisition[]> {
    return this.http.get<Acquisition[]>(`${this.apiUrl}/acquisitions`);
  }

  getAcquisition(id: number): Observable<Acquisition> {
    return this.http.get<Acquisition>(`${this.apiUrl}/acquisitions/${id}`);
  }

  createAcquisition(acquisition: Acquisition): Observable<Acquisition> {
    return this.http.post<Acquisition>(`${this.apiUrl}/acquisitions`, acquisition);
  }

  updateAcquisition(id: number, acquisition: Acquisition): Observable<Acquisition> {
    return this.http.put<Acquisition>(`${this.apiUrl}/acquisitions/${id}`, acquisition);
  }

  deleteAcquisition(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/acquisitions/${id}`);
  }
}
