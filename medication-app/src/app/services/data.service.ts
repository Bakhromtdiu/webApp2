import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseType, Review } from '../data-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private static readonly SERVER_URL = `http://localhost:3000`;

  constructor(private http: HttpClient) { }

  addMedication(formData: FormData): Observable<ResponseType> {
    return this.http.post<ResponseType>(DataService.SERVER_URL + `/medications`, formData);
  }

  getMedicationsByLetter(letter: string): Observable<ResponseType> {
    return this.http.get<ResponseType>(DataService.SERVER_URL + `/medications?first_letter=${letter}`);
  }

  updateMedication(id: string, formData: FormData): Observable<ResponseType> {
    return this.http.put<ResponseType>(DataService.SERVER_URL + `/medications/${id}`, formData);
  }

  getMedicationById(id: string): Observable<ResponseType> {
    return this.http.get<ResponseType>(DataService.SERVER_URL + `/medications/${id}`);
  }

  deleteMedicationById(id: string): Observable<ResponseType> {
    return this.http.delete<ResponseType>(DataService.SERVER_URL + `/medications/${id}`);
  }

  addReview(medId: string, review: Review): Observable<ResponseType> {
    return this.http.post<ResponseType>(DataService.SERVER_URL + `/medications/${medId}/reviews`, review);
  }

  getReviews(medId: string): Observable<ResponseType> {
    return this.http.get<ResponseType>(DataService.SERVER_URL + `/medications/${medId}/reviews`);
  }

  updateReview(medId: string, reviewId: string, review: Review): Observable<ResponseType> {
    return this.http.put<ResponseType>(DataService.SERVER_URL + `/medications/${medId}/reviews/${reviewId}`, review);
  }

  getReviewById(medId: string, reviewId: string): Observable<ResponseType> {
    return this.http.get<ResponseType>(DataService.SERVER_URL + `/medications/${medId}/reviews/${reviewId}`);
  }

  deleteReviewById(medId: string, reviewId: string): Observable<ResponseType> {
    return this.http.delete<ResponseType>(DataService.SERVER_URL + `/medications/${medId}/reviews/${reviewId}`);
  }

}
