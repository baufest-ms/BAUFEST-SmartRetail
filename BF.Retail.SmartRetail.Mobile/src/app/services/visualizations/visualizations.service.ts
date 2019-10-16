import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

export interface AddVisualizationRequest {
  CustomerId: number;
  ProductId: number;
}

@Injectable({
  providedIn: 'root'
})
export class VisualizationsService {

  constructor(private httpClient: HttpClient) { }

  addVisualization(visualization: AddVisualizationRequest): Observable<void> {
    const url = environment.baseUrl + '/Visualizations';
    return this.httpClient.post<void>(url, visualization);
  }
}
