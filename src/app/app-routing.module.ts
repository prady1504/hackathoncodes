import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretKeyComponent  } from './secret-key/secret-key.component';
import { UploadimageComponent } from './uploadimage/uploadimage.component';

const routes: Routes = [
  { path: '', component: SecretKeyComponent},
  { path: 'secret', component: SecretKeyComponent},
  { path: 'uploadimage', component: UploadimageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
