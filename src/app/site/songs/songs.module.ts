import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './songs.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyAlertComponent } from '../my-alert/my-alert.component';



@NgModule({
  declarations: [SongsComponent, MyAlertComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SongsModule { }
