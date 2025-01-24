import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor() { }

    private loading = new BehaviorSubject<boolean>(false);


    get isLoading() {
        return this.loading.asObservable();
    }

    public showLoading(): void {
        this.loading.next(true);
    }

    public hideLoading(): void {
        this.loading.next(false);
    }

}
