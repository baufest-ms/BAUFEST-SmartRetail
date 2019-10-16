import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

export interface Prediction {
  probability: number;
  tagId: string;
  tagName: string;
}

export interface CustomVisionResponse {
  created: Date;
  id: string;
  iteration: string;
  predictions: Prediction[];
  project: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomVisionService {

  private baseUrl = environment.customVision.baseUrl;
  private predictionKey = environment.customVision.predictionKey;

  constructor(
    private httpClient: HttpClient
  ) { }

  classify(image: {Url: string} | Blob): Observable<CustomVisionResponse> {
    const isUrl = Object.keys(image).some(key => key === 'Url');
    const url = this.baseUrl + (isUrl ? '/url' : '/image');
    const contentType = isUrl ? 'application/json' : 'application/octet-stream';
    const options = {
      headers: new HttpHeaders()
        .append('Context-Type', contentType)
        .append('Prediction-Key', this.predictionKey)
    };
    return this.httpClient.post<CustomVisionResponse>(url, image, options);
  }
}
