import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';
import { SharedService } from '../../serives/shared.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-loading',
    imports: [CommonModule, ProgressSpinnerModule],
    templateUrl: './app-loading.component.html'
})
export class AppLoadingComponent {

    constructor(
        private shared: SharedService,
    ) {
        this.isLoading$ = this.shared.isLoading;
    }

    public isLoading$: Observable<boolean>;


}
