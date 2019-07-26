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
  songParts: number[];
  songForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private sS: SongService) { }

  ngOnInit() {
    this.createForm();
    this.songParts = [];
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
    this.sS.getAllSongs();
  }

  onSubmit() {
    console.log("onSubmit");
    
    let song = new Song();
    song.title = this.songForm.value.songTitle;

    this.sS.saveSong(song);
  }

  resetForm() {
    this.songForm.value.songTitle = "";
  }

}
