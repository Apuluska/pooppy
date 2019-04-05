import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';
  public menuPages = [
    {
      title: 'Favoritos',
      url: '/menu/favorites',
      icon: '../assets/img/fakeDog.png'
    },
    {
      title: 'Ayuda',
      url: '/menu/help',
      icon: 'md-help-circle'
    },
    {
      title: 'Acerca de',
      url: '/menu/about',
      icon: 'md-information-circle'
    }
  ];

  constructor(private menu: MenuController) {}
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
  ngOnInit() {}
}
