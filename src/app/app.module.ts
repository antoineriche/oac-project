import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductAddComponent } from './site/product-add/product-add.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TodosService } from './service/todos.service';
import { SongsModule } from './site/songs/songs.module';
import { MyAlertComponent } from './site/my-alert/my-alert.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductAddComponent,
//    MyAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SongsModule,
    HttpClientModule
  ],
  providers: [
    TodosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
