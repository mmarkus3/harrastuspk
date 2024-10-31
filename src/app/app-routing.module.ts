import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: async () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
];
