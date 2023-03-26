import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  callMsCognitiveAPIImageProcess(image: any) {
    const key: any = sessionStorage.getItem('openaisecretkey')?.toString();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/octet-stream')
      .set('Prediction-Key', key)
    return this.http.post('https://eastus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/98d8b944-2a18-45a1-bf54-08a2e1e8ce96/classify/iterations/Iteration2/image',
      image, { headers: headers }
    );
  }
  callChatGPT(payLoad: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('api-key', '4ab404b26b7548d3ab6eb0a8ca3ce696')
    const data = {

    };
    return this.http.post('https://hackathonopenai.openai.azure.com/openai/deployments/gpt/chat/completions?api-version=2023-03-15-preview',
      payLoad, { headers: headers }
    );
  }
}
