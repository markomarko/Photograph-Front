import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Picture } from '../model/Picture';
import { DataService } from '../shared/dataServices';
import { Album } from '../model/Album';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'gallery-component',
  templateUrl: "gallery.component.html",
  styles: []
})

export class GalleryComponent implements OnInit {

  selectedFile: File;
  public albums: Album[];

  constructor(private router: Router, private data: DataService) {

  }

  ngOnInit() {
    this.data.getAlbum()
      .subscribe(data => this.albums = data);
  }

  newAlbum(form: NgForm) {
    let id = this.data.getUserId();
    let album = new Album(id, form.value.name, form.value.description);
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

  public resetForm(form: NgForm) {
    form.reset();
  }

 

}
