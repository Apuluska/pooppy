import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'
},

  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'home', loadChildren: './menu/home/home.module#HomePageModule' },
  { path: 'about', loadChildren: './menu/about/about.module#AboutPageModule' },
  { path: 'favorites', loadChildren: './menu/favorites/favorites.module#FavoritesPageModule' },
  { path: 'help', loadChildren: './menu/help/help.module#HelpPageModule' },
  { path: 'privacypolicy', loadChildren: './menu/privacypolicy/privacypolicy.module#PrivacypolicyPageModule' },
  { path: 'team', loadChildren: './menu/team/team.module#TeamPageModule' },
  { path: 'termsconditions', loadChildren: './menu/termsconditions/termsconditions.module#TermsconditionsPageModule' },


  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true,
      preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
