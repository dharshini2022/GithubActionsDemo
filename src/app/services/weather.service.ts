import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { WeatherForecast } from '../models/weather-forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getForecast(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(this.apiUrl);
  }
}
