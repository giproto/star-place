import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LandingProfileEntity } from '../../domain/entities/landing.entity';
import { Router } from '@angular/router';
import { GoogleAuthService } from '../../shared/services/google-auth.service';

@Component({
    selector: 'landing-page',
    templateUrl: 'landing.component.html',
    styleUrl: 'landing.component.scss',
    imports: [ CommonModule ]
})

export class LandingPageComponent 
{
    public profile: LandingProfileEntity | undefined;

    // * Injects
    private router = inject(Router);
    private googleAuthService = inject(GoogleAuthService);

    // Método para realizar rota de naveção do perfil
    public browseProfile(): void
    {
        this.router.navigate(['/gallery']);
    }

    // Método para autenticar o login com Google
    public loginWithGoogle(): void
    {
        this.googleAuthService.loginProfile();
    }

    // Método de verificação de autencidade do perfil com Google
    public isLoggedIn(): boolean
    {
        const googleData = this.googleAuthService.getLoggedProfile()
        this.profile = googleData;
        
        return !!this.profile;
    }
}