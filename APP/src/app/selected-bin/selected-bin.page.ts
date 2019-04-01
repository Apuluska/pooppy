import { Component, OnInit } from '@angular/core';

import { NavParams, ModalController } from '@ionic/angular'

@Component({
  selector: 'app-selected-bin',
  templateUrl: './selected-bin.page.html',
  styleUrls: ['./selected-bin.page.scss'],
})
export class SelectedBinPage implements OnInit {

  passedId = null;

  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.passedId = this.navParams.get('custom_id');
  }

  closeModal(){
    this.modalController.dismiss();
  }

}
