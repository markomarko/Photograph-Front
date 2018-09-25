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

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};


  constructor(private router: Router, private data: DataService) {
  }

  ngOnInit() {
    this.data.getAlbum()
      .subscribe(data => this.albums = data);

      this.data.getUsers().subscribe(data => {
        this.dropdownList = data;
      });

      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'userName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 10,
        allowSearchFilter: true
      };
  }

  onItemSelect (item: User) {
    console.log(item);
    this.selectedItems.push(item.id);
  }
  onSelectAll (items: User[]) {
    items.forEach(element => {
      this.selectedItems.push(element.id);
    });
  }

  onItemDeSelect(item: User) {
    const index = this.selectedItems.indexOf(item.id, 0);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    }
  }

  onDeSelectAll(items: User[]) {
    this.selectedItems = [];
  }

  newAlbum(form: NgForm) {
    let id = this.data.getUserId();
    let album = new Album(id, form.value.name, form.value.description, this.selectedItems);
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
