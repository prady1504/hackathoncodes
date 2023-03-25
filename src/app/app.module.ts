import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadimageComponent } from './uploadimage/uploadimage.component';
import { SecretKeyComponent } from './secret-key/secret-key.component';
import { FormsModule } from '@angular/forms';
import { DishComponent } from './dish/dish.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadimageComponent,
    SecretKeyComponent,
    DishComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
