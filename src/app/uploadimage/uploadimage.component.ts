import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { IChoice, IGPTResponse } from '../common.model';
import { Constants } from '../constants';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.scss']
})
export class UploadimageComponent implements OnInit, OnDestroy {
  items: string;
  img: any;
  imageSrc: any;
  showLoader = false;
  showLoader2 = false;
  errorMessage: string;
  errorMessage2: string;
  productList: string[] = [];
  info: string;
  info2: string;
  result = {} as {
    tagName: string;
    probability: string;
  };
  gptResponse: any;
  gptResponseStr: string;
  congnitiveAPI$: Subscription;
  chatGPT$: Subscription;
  constructor(private apiService: ApiService) { }

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
      this.info2 = '';
      if (this.chatGPT$) {
        this.chatGPT$.unsubscribe();
      }
      this.congnitiveAPI$ = this.apiService.callMsCognitiveAPIImageProcess(this.img).subscribe({
        next: this.onSuccess.bind(this),
        error: this.onError.bind(this)
      })
    } else {
      this.errorMessage = 'Please select image file.';
    }

  }

  onSuccess(res: any) {
    this.result = res.predictions[0];
    this.productList.push(this.result.tagName);
    this.showLoader = false;
    // this.onNext(2);
  }
  onError() {
    this.info = 'It seems issue with fetching data, might be because of wrong key you entered';
  }
  manualSubmit() {
    const manualArr = this.items.split(',');
    this.productList = [...this.productList, ...manualArr];
    // if (this.items) {
    //   this.onNext(1);
    //   this.errorMessage2 = '';
    // } else {
    //   this.errorMessage2 = 'Please enter item details';
    // }
   
  }
  onNext() {
    if ( this.productList && this.productList.length) {
      this.showLoader2 = true;
      this.info2 = 'Please wait ,Fetching data for you...';
      const payLoad = this.getPayload();
      this.chatGPT$ =  this.apiService.callChatGPT(payLoad).subscribe({
        next: this.onGPTSuccess.bind(this) as any,
        error: this.onGPTError.bind(this)
      })
    } else {
      this.showLoader2 = true;
      this.info2 = 'Please select a few items';
    }
    
  }

  delteItem(index: number) {
    this.productList.splice(index, 1);
  }
  trackbyFn(index: number) {
    return index;
  }
  getPayload() {
    return {
      "messages": [
        {
          "role": "user",
          "content": Constants.labels.content.replace('{0}', this.productList.toString())
        }
      ],
     "temperature": 0.7,
      "top_p": 0.95,
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "max_tokens": 8000,
      "stop": null
    }
  }
  onGPTSuccess(res: IGPTResponse) {
    const choice = res?.choices?.[0];
    this.formatResponseData(choice)
    this.showLoader2 = false;
  }

  formatResponseData(choice: IChoice) {
    const message = choice?.message?.content || '';
    const formatedResponse = message.replace(/\n/g, '');
    // this.gptResponse = formatedResponse;
    try {
      this.gptResponse = JSON.parse(formatedResponse);
    } catch {
      this.gptResponseStr = message;
    }
    

    console.log(formatedResponse);
  }
  onGPTError() {
    this.info2 = 'It seems issue with fetching data as server experiencing . Please try again later';
  }


  ngOnDestroy(): void {
    if (this.chatGPT$) {
      this.chatGPT$.unsubscribe();
    }
    if (this.congnitiveAPI$) {
      this.congnitiveAPI$.unsubscribe();
    }
  }

}
