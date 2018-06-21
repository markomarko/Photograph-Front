
export class Picture {

    id: number;
    albumId: number;
    userId: number;
    name: string;
    context: string;
    selected: boolean;

    constructor(image: string, name: string, extid: number, albid: string) {
        this.userId = extid;
        this.name = name;
        this.context = image;
        this.selected = false;
        parseInt(albid, this.albumId);
        console.log(this.albumId);
    }
}
