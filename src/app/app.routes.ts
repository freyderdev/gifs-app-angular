import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    // component:
    //si solo se queire que sea cargado bajo de manda se usa 'loadComponent'
    //esta es la importación por defecto de nuestro componente de manera perezoza
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page'),

    //*Rutas hijas:
    /* No es mas que definir un children que es un arreglo de rutas: */
    children: [
      {
        path: 'trending',
        // component:
        loadComponent: () => import('./gifs/pages/trending-page/trending-page.component')
      },
      {
        path: 'search',
        // component:
        loadComponent: () => import('./gifs/pages/search-page/search-page.component')
      },
      {
        // path: 'history/:query/:name/:title/:tag',
        path: 'history/:query',
        // component:
        loadComponent: () => import('./gifs/pages/gif-history/gif-history.component')
      },
      {
        path: '**',
        redirectTo: 'trending'
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }

];
