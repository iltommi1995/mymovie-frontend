import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Movie } from 'src/interfaces/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}movies`);
  }

  deleteMovie(id:Number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}movies/${id}`);
  }

  createMovie(movie:Movie): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}movies`, movie);
  }

  editMovie(id:number, movie:Movie): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}movies/${id}`, movie);
  }
}
