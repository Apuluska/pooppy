
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HelpPage } from './help.page';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MatMenuModule} from '@angular/material/menu';

const routes: Routes = [
  {
    path: '',
    component: HelpPage,
    /* children: [
      {
        path: 'first',
        loadChildren: '../frist-with-tabs/first-with-tabs.module#FistWithTabsPageModule'
      },
      {
        path: 'second',
        loadChildren: '../second/second.module#SecondPageModule'
      }
    ] */
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
  ],
  declarations: [HelpPage]
})
export class HelpPageModule {}
