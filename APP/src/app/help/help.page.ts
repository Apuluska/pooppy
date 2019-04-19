import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {Location} from '@angular/common';


@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  showButton;

  constructor(private location: Location) {
  }

  ngOnInit() {
  }
  showMeTheText(number) {
    if(this.showButton === number){
      this.showButton = "";
    }else{
      this.showButton = number;
    }
  }
  backClicked() {
    this.location.back();
  }
}
