import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/router/src/config';
import { Picture } from '../model/Picture';
import { DataService } from '../shared/dataServices';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'gallery-component',
  templateUrl: "gallery.component.html",
  styles: []
})

export class GalleryComponent {

  selectedFile: File;

  constructor(private router: Router, private data: DataService) {

  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.ConvertBase64(this.selectedFile);

  }

  private ConvertBase64(image: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = () => {
      console.log(reader.result);
      const picture = new Picture(reader.result, image.name, this.data.getUserId());

      this.data.postPicture(picture)
        .subscribe();
    };
  }

}
