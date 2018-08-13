export class PagingHeader {
    public pageNumber: number;
    public pageSize: number;
    public nextPage: number;
    public previousPage: number;
    public lastPage: number;
    constructor() {
        this.pageNumber = 1;
        this.pageSize = 5;
        this.nextPage = 0;
        this.previousPage = 0;
        this.lastPage = 1;
    }
}
