import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Song from '../model/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  uri = 'http://localhost:9090/oac/songs/';

  constructor(private http: HttpClient) { }

  saveSong(song:Song){
    console.log("Create Song");
    this.http.post(this.uri, song).subscribe(
      res => { console.log(res); },
      err => {
        console.log("error");
        console.log(err);
      }
    );
  }

  getAllSongs() {
    console.log("Getting all Songs");
    this.http.get(this.uri).subscribe(
      res => { console.log(res); },
      err => {
        console.log("error");
        console.log(err);
      }
    );
  }
}
