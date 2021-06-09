import { Injectable } from "@angular/core";

@Injectable()
export class LoadPageService{
    constructor() { }

    private _pageLoaded:boolean = true;

    public changePageToLoading(): boolean{
        this._pageLoaded = false;
        return this._pageLoaded;
    }
    public changePageToAlreadyLoaded(): boolean{
        this._pageLoaded = true;
        return this._pageLoaded;
    }
    get pageLoaded() {
        return this._pageLoaded;
    }
    set pageLoaded(loading: boolean) {
        this._pageLoaded = loading;
    }
}