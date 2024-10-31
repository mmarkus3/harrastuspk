import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: async () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'stats',
        loadComponent: async () =>
          import('../stats/stats.page').then((m) => m.StatsPage),
      },
      {
        path: 'history',
        loadComponent: async () =>
          import('../history/history.page').then((m) => m.HistoryPage),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
