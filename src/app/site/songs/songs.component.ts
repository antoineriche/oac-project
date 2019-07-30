import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import Song from 'src/app/model/song';

import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SongService } from 'src/app/service/song.service';
import { MyAlertComponent } from '../my-alert/my-alert.component';
import AlertMessage from 'src/app/model/alert-message';
import ClientError from 'src/app/model/error/client-error';

const TIMEOUT: number = 3 * 1000;

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.sass']
})
export class SongsComponent implements OnInit {

  @ViewChild(MyAlertComponent, {static: false})   myAlert:   MyAlertComponent;

  song: Song;
  aSong: Song;
  listSongs: Song[];
  songParts: number[];
  songForm: FormGroup;
  hideForm: Boolean;
  alertMessage: AlertMessage;

  constructor(
    private fb: FormBuilder, 
    private sS: SongService) { }

  ngOnInit() {
    this.createForm();
    this.songParts = [];
    this.listSongs = [];
    this.hideForm = true;
    this.alertMessage = new AlertMessage();
    this.alertMessage.timeout = TIMEOUT;
  }

  createForm() {
    this.songForm = this.fb.group({
      songTitle: ['', Validators.required]
    });
  }

  addNewVerse(nb:number) {
    console.log(nb);
    this.songParts.push(nb);
  }

  addChorus(){
    this.songParts.push(0);
  }

  getAllSongs(){
    this.sS.getAllSongs().subscribe(
      (data: Song[]) => { this.listSongs = data },
      err => { this.myAlert.showError(this.convertToClientError(err), TIMEOUT) }
    );
  }

  viewSong(id:number){
    this.sS.getSongWithId(id).subscribe(
      (data: Song) => { this.aSong = data },
      err => { this.myAlert.showError(this.convertToClientError(err), TIMEOUT) }
    );
  }

  deleteSong(id:number) {
    this.sS.delete(id).subscribe(
      (data: string) => { 
        this.aSong = null;
        this.getAllSongs();
        this.myAlert.showSuccess("Song has been deleted", null, TIMEOUT);
       },
      err => { this.myAlert.showError(this.convertToClientError(err), TIMEOUT) }
    ); 
  }

  updateSong(id:number) {
    if(this.aSong){
      this.aSong.title = "New title 2";
      this.sS.update(id, this.aSong).subscribe(
        (data: Song) => { 
          this.aSong = data;
          this.getAllSongs();
          this.myAlert.showSuccess("Song has been updated", null, TIMEOUT);
        },
        err => { this.myAlert.showError(this.convertToClientError(err), TIMEOUT) }
      );
    }
  }

  saveSong() {
    let song = new Song();
    song.title = this.songForm.value.songTitle;
    this.sS.saveSong(song).subscribe(
      (data: Song) => {
        this.hideForm = true;
        this.getAllSongs();
        this.myAlert.showSuccess("Song has been saved", null, TIMEOUT);
      },
      err => { this.myAlert.showError(this.convertToClientError(err), TIMEOUT) }
    );
  }

  resetForm() {
    this.songForm.value.songTitle = "";
  }

  convertToClientError(apiError: any): ClientError {
    let error = new ClientError();
    error.cause = apiError.error.error.message;
    error.detail = apiError.error.error.stack;
    return error;
    };

}
