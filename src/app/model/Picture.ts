
export class Picture {

    id: number;
    albumId: string;
    userId: string;
    name: string;
    context: string;
    selected: boolean;

    constructor(image: string, name: string, extid: string, albid: string) {
        this.userId = extid;
        this.name = name;
        this.context = image;
        this.selected = false;
        this.albumId = albid;
    }
}
