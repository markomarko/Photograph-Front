import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/dataServices';
import { User } from '../model/user';
import { PagingHeader } from '../model/PagingHeader';

@Component({
  selector: 'app-customer-component',
  templateUrl: 'customer.component.html',
  styles: []
})
export class CustomerComponent implements OnInit {
  public users: User[] = [];
  public isAdmin = false;
  pagingHeader: PagingHeader;
  pages: number[] = [1];
  constructor(private route: Router, private data: DataService) {}

  ngOnInit(): void {
    const token = this.data.getDecodedToken(localStorage.access_token);
    if (token) {
      this.isAdmin = token.role === 'Admin';
    } else {
      this.isAdmin = false;
    }
    this.pagingHeader = new PagingHeader();
    this.getUsers();
  }

  getUsers() {
    this.data.getRangeUsers(this.pagingHeader).subscribe(data => {
      this.users = data.body;
      const header = JSON.parse(data.headers.get('Paging-Headers'));
      this.updatePaginationHeader(header);
    });
  }

  private updatePaginationHeader(header: any) {
    this.pagingHeader.nextPage = header.nextPage;
    this.pagingHeader.previousPage = header.previousPage;
    this.pagingHeader.pageNumber = header.currentPage;
    this.pagingHeader.pageSize = header.pageSize;
    this.pagingHeader.lastPage = header.lastPage;

    this.setUIPageNumbers();
  }

  private setUIPageNumbers() {
    const pageNumber = this.pagingHeader.pageNumber;

    if (this.pagingHeader.lastPage < 4) {
      this.pages = this.range(1, this.pagingHeader.lastPage + 1);
    } else if (this.pagingHeader.lastPage - 2 <= this.pagingHeader.pageNumber) {
      this.pages = [
        this.pagingHeader.lastPage - 4,
        this.pagingHeader.lastPage - 3,
        this.pagingHeader.lastPage - 2,
        this.pagingHeader.lastPage - 1,
        this.pagingHeader.lastPage
      ];
    } else if (pageNumber < 3) {
      this.pages = this.range(1, 5 + 1);
    } else {
      this.pages = [
        pageNumber - 2,
        pageNumber - 1,
        pageNumber,
        pageNumber + 1,
        pageNumber + 2
      ];
    }
  }
  private range(start, end): number[] {
    return Array.from({ length: end - start }, (v, k) => k + start);
  }

  suspendUser(userId: string) {
    this.data.suspendUser(userId).subscribe(() => {
      this.getUsers();
    });
  }

  resumeUser(userId: string) {
    this.data.resumeUser(userId).subscribe(() => {
      this.getUsers();
    });
  }

  public nextPage() {
    if (this.pagingHeader.nextPage === 1) {
      this.pagingHeader.pageNumber += 1;
      this.getUsers();
    }
  }

  public previousPage() {
    if (this.pagingHeader.previousPage === 1) {
      this.pagingHeader.pageNumber -= 1;
      this.getUsers();
    }
  }

  public setPage(pageNumber: number) {
    this.pagingHeader.pageNumber = pageNumber;
    this.getUsers();
  }
}
