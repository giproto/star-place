import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { CorePage } from './app/pages/core/core.page';

bootstrapApplication(CorePage, appConfig)
  .catch((err) => console.error(err));
