import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.scss']
})
export class UploadimageComponent implements OnInit {
  items: string;
  img: any;
  imageSrc: any;
  showLoader = false;
  errorMessage: string;
  productList: string[] = [];
  info: string;
  result = {} as {
    name: string;
    confidence: string;
  };
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  onFileChanged(event: any) {
    this.img = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    }
    reader.readAsDataURL(this.img);
    if (this.img) {
      this.errorMessage = '';
    }
  }
  onSubmitImages() {
    if (this.img) {
      this.showLoader = true;
      this.info = 'Please wait ,Fetching data...';
      const key: any = sessionStorage.getItem('openaisecretkey')?.toString();
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/octet-stream')
        .set('Ocp-Apim-Subscription-Key', key)
      this.http.post('https://eastus.api.cognitive.microsoft.com/vision/v3.2/tag?language=en&model-version=latest', this.img, { headers: headers })
        .subscribe((response: any) => {
          this.result = response.tags[0];
          this.productList.push(this.result.name);
          this.showLoader = false;
        }, () => {
          this.info = 'It seems issue with fetching data, might be because of wrong key you entered'
        })
    } else {
      this.errorMessage = 'Please select image file.';
    }

  }
  onNext() {

  }

}
