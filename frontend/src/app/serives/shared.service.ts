import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

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

    public showAlert(icon: 'success' | 'error' | 'warning' | 'info', message: string, callback?: () => void): void {
        const title = icon.charAt(0).toUpperCase() + icon.slice(1) + '!';
        Swal.fire({
            title: title,
            text: message,
            icon: icon,
        }).then(() => {
            if (callback)
                callback();
        });
    }

}
