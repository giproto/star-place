import { Injectable, inject, signal } from "@angular/core";
import { OAuthService, AuthConfig } from "angular-oauth2-oidc";
import { auth } from "./google-auth.config"; 
import { Router } from "@angular/router";
import { LandingProfileEntity } from "../../domain/entities/landing.entity";

@Injectable({
    providedIn: 'root'
})
export class GoogleAuthService 
{
    public profile = signal<any>(null);

    // * Injects
    private oauthService = inject(OAuthService);

    private initPromise: Promise<void>;

    constructor()
    {
        this.initPromise = this.initConfiguration();
    }

    // Método para realizar as configurações de autenticação do Google
    private initConfiguration(): Promise<void>
    {
        this.oauthService.configure(auth);
        this.oauthService.setupAutomaticSilentRefresh();
        return this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => 
        {
            if (this.oauthService.hasValidIdToken() || this.oauthService.hasValidAccessToken()) 
            {
                this.profile.set(this.oauthService.getIdentityClaims());
            }
        });
    }

    // Aguarda a inicialização do OAuth antes de verificar o perfil
    public whenInitialized(): Promise<void>
    {
        return this.initPromise ?? Promise.resolve();
    }

    // Método para chamar o fluxo de autenticação do Google
    public loginProfile(): void
    {
        this.oauthService.initLoginFlow();
    }

    // Método para revogar as credenciais e deslogar conta Google
    public logoutProfile(): void
    {
        this.oauthService.revokeTokenAndLogout();
        this.oauthService.logOut();
        this.profile.set(null);
    }

    // Método para pegar dados do perfil logado com Google
    public getLoggedProfile(): LandingProfileEntity
    {
        return this.profile();
    }
}