import { Routes } from '@angular/router';
import { PlatformPageComponent } from './pages/platform/platform.component';
import { GalleryPageComponent } from './pages/platform/pages/gallery/gallery.component';
import { CategoryPageComponent } from './pages/platform/pages/category/category.component';
import { PlacesPageComponent } from './pages/platform/pages/places/places.component';
import { LandingPageComponent } from './pages/landing/landing.component';
import { authGuard } from './domain/guards/auth.guard';

export const routes: Routes = [
    { 
        path: '', 
        component: PlatformPageComponent, 
        canActivate: [ authGuard ],
        children: [
            { 
                path: '', 
                redirectTo: 'gallery', 
                pathMatch: 'full' 
            },
            { 
                path: 'gallery', 
                component: GalleryPageComponent, 
                data: { title: 'Galeria', subtitle: 'Descubra os melhores lugares' }
            },
            { 
                path: 'category', 
                component: CategoryPageComponent,
                data: { title: 'Categorias', subtitle: 'Realize o cadastro de novas categorias' } 
            },
            { 
                path: 'places', 
                component: PlacesPageComponent,
                data: { title: 'Lugares', subtitle: 'Realize o cadastro de novos lugares' } 
            },
        ]
    },
    {  
        path: 'auth',
        component: LandingPageComponent
    },
];