import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/dataServices';
import { Album } from '../model/Album';
import { NgForm } from '@angular/forms';
import { User } from '../model/user';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'gallery-component',
  templateUrl: "gallery.component.html",
  styles: []
})

export class GalleryComponent implements OnInit {

  selectedFile: File;
  public albums: Album[];
  public clients: User[];
  public clientid: any;


  constructor(private router: Router, private data: DataService) {
  }

  ngOnInit() {
    this.data.getAlbum()
      .subscribe(data => this.albums = data);

      this.data.getUsers().subscribe(data => {
        this.clients = data;
      });
  }

  newAlbum(form: NgForm) {
    let id = this.data.getUserId();
    let album = new Album(id, form.value.name, form.value.description, this.clientid);
    this.data.postAlbum(album)
      .subscribe(() => {
        this.ngOnInit();
        this.resetForm(form);
      });
  }

  deleteAlbum(idAlbum) {
    this.data.deleteAlbum(idAlbum)
      .subscribe(() => {
        this.ngOnInit();
      }
      );
  }

  onOptionsSelected(comboid): any {
    console.log(comboid);
    console.log(this.clientid);
    this.clientid = comboid;
    console.log(this.clientid);
  }

  public resetForm(form: NgForm) {
    form.reset();
  }

  
}
