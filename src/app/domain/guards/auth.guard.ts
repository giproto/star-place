import { CanActivateFn, Router } from "@angular/router";
import { GoogleAuthService } from "../../shared/services/google-auth.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
    const googleAuthService = inject(GoogleAuthService);
    const router = inject(Router);

    return googleAuthService.whenInitialized().then(() => {
        const loggedProfile = googleAuthService.getLoggedProfile();
        if (loggedProfile) return true;

        router.navigate(['auth']);
        return false;
    });
}