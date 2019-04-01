import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  pages = [
    {
      title: 'First page with Tabs',
      url: '/menu/first'
    },
    {
      title: 'Second page blank',
      url: '/menu/second'
    }
  ];
  selectedPath = '';

  constructor(private menu:
    MenuController) {
  }

  ngOnInit() {
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
