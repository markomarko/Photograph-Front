import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../shared/dataServices';
import { Router, ActivatedRoute } from '@angular/router';
import { Picture } from '../../model/Picture';
import { PagingHeader } from '../../model/PagingHeader';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
    selector: 'album-component',
    templateUrl: 'album.component.html',
    styles: []
  })

  export class AlbumComponent implements OnInit {

    id: string;
    public pictures: Picture[];
    selectedFile: Picture[] = [];
    pagingHeader: PagingHeader;

    constructor(private data: DataService, private router: Router, private arouter: ActivatedRoute) {
    }
    ngOnInit() {
        this.pagingHeader = new PagingHeader();
        this.id = this.arouter.snapshot.paramMap.get('id');
        this.applyChanges();
    }

    public deletePhoto(idPhoto) {
        this.data.deletePicture(idPhoto)
            .subscribe(() => {
                this.applyChanges();
            });
    }

    public nextPage() {
        if (this.pagingHeader.nextPage === 1) { this.pagingHeader.pageNumber += 1; } else { return; }
        this.applyChanges();
    }

    public previousPage() {
        if (this.pagingHeader.previousPage === 1) { this.pagingHeader.pageNumber -= 1; } else { return; }
        this.applyChanges();
    }

    updatePhoto(picture: Picture) {
        if (picture.selected) { picture.selected = false;  } else { picture.selected = true; }
        this.data.putPicture(picture)
            .subscribe(() => {
                this.applyChanges();
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
            this.applyChanges();
          }
        };
    }

    private applyChanges() {
        this.data.getPictures(this.id, this.pagingHeader)
            .subscribe(data => {
                this.pictures = data.body;
                let header  = JSON.parse(data.headers.get('Paging-Headers'));
                this.updatePagination(header);
        });
    }

    private setPageSize(size: number) {
        this.pagingHeader.pageSize = size;
        this.applyChanges();
    }

    updatePagination(header: any){
        this.pagingHeader.nextPage = header.nextPage;
        this.pagingHeader.previousPage = header.previousPage;
        this.pagingHeader.pageNumber = header.currentPage;
        this.pagingHeader.pageSize = header.pageSize;
    }

    handleFileInput(files: FileList) {
        let model = { counter: 0, size: files.length };
        Array.from(files).forEach(file => {
            this.ConvertBase64(file, model);
        });
        console.log(this.selectedFile);
    }
  }
