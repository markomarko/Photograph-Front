import { DataService } from "../shared/dataServices";


export class Picture {

    id: number;
    userId: number;
    name: string;
    context: string;
    selected: boolean;

    constructor(image: string, name: string, extid: number) {
        this.userId = extid;
        this.name = name;
        this.context = image;
        this.selected = false;
        console.log(this);
    }



}
