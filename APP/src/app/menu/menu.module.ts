import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
   {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'favorites',
        loadChildren: '../favorites/favorites.module#FavoritesPageModule'
      },
      {
        path: 'help',
        loadChildren: './help/help.module#HelpPageModule'
      },
      {
        path: 'about',
        loadChildren: './about/about.module#AboutPageModule'
      },
      {
        path: 'termsconditions',
        loadChildren: './termsconditions/termsconditions.module#TermsConditionsPageModule'
      },
      {
        path: 'privacypolicy',
        loadChildren: './privacypolicy/privacypolicy.module#PrivacyPolicyPageModule'
      },
      {
        path: 'team',
        loadChildren: './team/team.module#TeamPageModule'
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
