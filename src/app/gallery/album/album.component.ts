import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../shared/dataServices';
import { Router, ActivatedRoute } from '@angular/router';
import { Picture } from '../../model/Picture';

@Component({
    selector: 'album-component',
    templateUrl: 'album.component.html',
    styles: []
  })

  export class AlbumComponent implements OnInit {
    id: string;
    public pictures: Picture[];
    selectedFile: Picture[] = [];
    constructor(private data: DataService, private router: Router, private arouter: ActivatedRoute) {
    }
    ngOnInit(){
        this.id = this.arouter.snapshot.paramMap.get('id');
        this.data.getPictures(this.id)
            .subscribe(data => this.pictures = data);
    }

    handleFileInput(files: FileList) {
        let model = { counter: 0, size: files.length };
        Array.from(files).forEach(file => {
            this.ConvertBase64(file, model);
        });
        console.log(this.selectedFile);
    }

    public deletePhoto(idPhoto) {
        this.data.deletePicture(idPhoto)
            .subscribe(() => {
                this. ngOnInit();
            });
    }

    private ConvertBase64(image: File, model: {counter, size}): void {
        const reader = new FileReader();
        reader.readAsDataURL(image);

          reader.onload = () => {
          const picture = new Picture(reader.result, image.name, this.data.getUserId(), this.id);
          this.selectedFile.push(picture);
          model.counter++;
          console.log(model.counter);
          if (model.counter === model.size) {
            this.data.postPicture(this.selectedFile).subscribe();
            this.selectedFile = [];
            this.ngOnInit();
          }
        };
    }

  }
