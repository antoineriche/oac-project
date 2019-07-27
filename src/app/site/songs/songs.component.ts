import { Component, OnInit } from '@angular/core';
import Song from 'src/app/model/song';

import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SongService } from 'src/app/service/song.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.sass']
})
export class SongsComponent implements OnInit {

  song: Song;
  aSong: Song;
  listSongs: Song[];
  songParts: number[];
  songForm: FormGroup;
  hideForm: Boolean;

  constructor(private fb: FormBuilder, 
    private sS: SongService) { }

  ngOnInit() {
    this.createForm();
    this.songParts = [];
    this.listSongs = [];
    this.hideForm = true;
  }

  createForm() {
    this.songForm = this.fb.group({
      songTitle: ['', Validators.required ]
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
      err => { console.log(err) }
    );
  }

  viewSong(id:number){
    this.sS.getSongWithId(id).subscribe(
      (data: Song) => { this.aSong = data },
      err => { console.log(err) }
    );
  }

  deleteSong(id:number) {
    this.sS.delete(id).subscribe(
      (data: Song) => { 
        this.aSong = null;
        this.getAllSongs(); },
      err => { console.log(err) }
    ); 
  }

  updateSong(id:number) {
    if(this.aSong){
      this.aSong.title = "New title 2";
      this.sS.update(id, this.aSong).subscribe(
        (data: Song) => { 
          this.aSong = data;
          this.getAllSongs();
        },
        err => { console.log(err) }
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
      },
      err => { console.log(err) }
    );
  }

  resetForm() {
    this.songForm.value.songTitle = "";
  }

}
