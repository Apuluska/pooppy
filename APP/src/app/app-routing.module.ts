import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'favoritos',
    loadChildren: './favoritos/favoritos.module#FavoritosPageModule'
  },
  { path: 'ayuda',
  loadChildren: './ayuda/ayuda.module#AyudaPageModule'
},
  {
     path: 'acerca', loadChildren: './acerca/acerca.module#AcercaPageModule'
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
