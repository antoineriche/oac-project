import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './site/product-add/product-add.component';
import { SongsComponent } from './site/songs/songs.component';


const routes: Routes = [
  { path: 'product/create', component: ProductAddComponent },
  { path: 'song/create', component: SongsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
