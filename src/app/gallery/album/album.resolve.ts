import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../../shared/dataServices';

@Injectable()
export class AlbumResolve implements Resolve<any> {

    constructor(private data: DataService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.data.getPictures(route.params['id']);
    }
}
