import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, Router, ActivatedRoute } from '@angular/router';
import { PlatformEntity } from '../../domain/entities/platform.entity';
import { filter, map } from 'rxjs';
import { GoogleAuthService } from '../../shared/services/google-auth.service';

@Component({
    selector: 'platform-page',
    templateUrl: 'platform.component.html',
    styleUrl: 'platform.component.scss',
    imports: [
    CommonModule,
    RouterOutlet,
    RouterLinkWithHref
],
})

export class PlatformPageComponent implements OnInit
{
    public props = signal<PlatformEntity>({ title: '', subtitle: '' });

    // * Injects
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private googleAuthService = inject(GoogleAuthService);

    ngOnInit(): void 
    {
        this.props.set(this.getPropsPlatform());
        this.listenToChangeRoutes();
    }

    // Método para obter dados de rotas e retornar em uma variável
    public getPropsPlatform(): PlatformEntity
    {
        let firstRoute = this.activatedRoute.firstChild;

        while(firstRoute?.firstChild)
        {
            firstRoute = firstRoute.firstChild;
        }
        
        return firstRoute?.snapshot.data as PlatformEntity;
    }

    // Método para observar mudanças de rotas
    public listenToChangeRoutes(): void
    {
        this.router.events.pipe(
            filter( () => this.activatedRoute.firstChild !== null ),
            map( () => this.getPropsPlatform())).subscribe(
                (props: PlatformEntity) => this.props.set(props)
        );
    }

    // Método para revogar as credenciais e deslogar da conta Google
    public logoutProfile(): void
    {
        this.googleAuthService.logoutProfile();
        this.router.navigate(['auth']);
    }
}