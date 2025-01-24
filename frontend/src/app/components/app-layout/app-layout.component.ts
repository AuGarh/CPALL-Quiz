import { Component } from '@angular/core';
import { AppLoadingComponent } from '../app-loading/app-loading.component';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-layout',
    imports: [
        AppLoadingComponent,
        AppHeaderComponent,
        RouterModule
    ],
    templateUrl: './app-layout.component.html'
})
export class AppLayoutComponent {

}
