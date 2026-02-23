import { Routes } from '@angular/router';
import { PlatformPageComponent } from './pages/platform/platform.component';
import { GalleryPageComponent } from './pages/platform/pages/gallery/gallery.component';
import { CategoryPageComponent } from './pages/platform/pages/category/category.component';
import { PlacesPageComponent } from './pages/platform/pages/places/places.component';

export const routes: Routes = [
    { 
        path: '', 
        component: PlatformPageComponent, 
        children: [
            { path: '', redirectTo: 'gallery', pathMatch: 'full' },
            { path: 'gallery', component: GalleryPageComponent },
            { path: 'category', component: CategoryPageComponent },
            { path: 'places', component: PlacesPageComponent },
        ]
    }
];