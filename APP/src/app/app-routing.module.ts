import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'
},
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'help', loadChildren: './help/help.module#HelpPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'termsconditions', loadChildren: './termsconditions/termsconditions.module#TermsConditionsPageModule' },
  { path: 'privacypolicy', loadChildren: './privacypolicy/privacypolicy.module#PrivacyPolicyPageModule' },
  { path: 'team', loadChildren: './team/team.module#TeamPageModule' },


  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
