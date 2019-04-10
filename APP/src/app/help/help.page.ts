import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {Location} from '@angular/common';


@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  showButton = false;
  showText = false;

  constructor(private location: Location) {
  }

  ngOnInit() {
  }
  showMeTheP() {
    this.showText = !this.showText;
  }
  showMeTheText() {
    this.showButton = !this.showButton;
  }
  backClicked() {
    this.location.back();
  }
}
