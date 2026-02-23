import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'platform-page',
    templateUrl: 'platform.component.html',
    styleUrl: 'platform.component.scss',
    imports: [CommonModule, RouterOutlet]
})

export class PlatformPageComponent {}