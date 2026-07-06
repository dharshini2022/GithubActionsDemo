import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from './services/weather.service';
import { WeatherForecast } from './models/weather-forecast.model';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  apiUrl = environment.apiUrl;
  forecasts$: Observable<WeatherForecast[]> | null = null;

  isLoading = false;
  isError = false;
  errorMessage = '';
  connectionClass = '';
  connectionText = 'Connecting...';

  maxTemp = '--';
  minTemp = '--';
  avgTemp = '--';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.isError = false;
    this.connectionClass = 'loading';
    this.connectionText = 'Fetching live data...';

    this.forecasts$ = this.weatherService.getForecast().pipe(
      tap((data) => {
        this.calculateStats(data);
        this.connectionClass = 'online';
        this.connectionText = 'Connected (Live API)';
        this.isLoading = false;
      }),
      catchError((err) => {
        console.error('API Fetch Failed:', err);
        this.isError = true;
        this.connectionClass = '';
        this.connectionText = 'Disconnected / Offline';
        this.errorMessage = `Could not load weather logs from the Azure Web App backend. Error: ${err.message || err.statusText || 'Unknown Connection Error'}`;
        this.isLoading = false;
        return of([]);
      })
    );
  }

  calculateStats(data: WeatherForecast[]): void {
    if (!data || data.length === 0) return;
    const tempsC = data.map(item => item.temperatureC);
    const max = Math.max(...tempsC);
    const min = Math.min(...tempsC);
    const avg = Math.round(tempsC.reduce((sum, val) => sum + val, 0) / tempsC.length);

    this.maxTemp = `${max}°C`;
    this.minTemp = `${min}°C`;
    this.avgTemp = `${avg}°C`;
  }

  formatDate(dateStr: string): string {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }
    return dateStr;
  }

  getTempClass(tempC: number): string {
    if (tempC >= 45) return 'hot';
    if (tempC >= 30) return 'warm';
    if (tempC >= 15) return 'mild';
    if (tempC >= 0) return 'cold';
    return 'freezing';
  }

  getSummaryIcon(summary: string): string {
    if (!summary) return '☁️';
    const lower = summary.toLowerCase();
    if (lower.includes('scorch') || lower.includes('hot')) return '🔥';
    if (lower.includes('warm') || lower.includes('balmy')) return '☀️';
    if (lower.includes('mild') || lower.includes('cool')) return '⛅';
    if (lower.includes('chilly') || lower.includes('cold')) return '❄️';
    return '☁️';
  }
}
