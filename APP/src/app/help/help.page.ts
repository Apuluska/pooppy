import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  showButton = false;
  showText = false;

  constructor() {
  }

  ngOnInit() {
  }
  showMeTheP() {
    this.showText = !this.showText;
  }
  showMeTheText() {
    this.showButton = !this.showButton;
  }
}
