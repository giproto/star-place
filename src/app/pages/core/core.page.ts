import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'core-page',
    templateUrl: 'core.page.html',
    styleUrl: 'core.page.scss',
    imports: [CommonModule, RouterOutlet]
})

export class CorePage {}