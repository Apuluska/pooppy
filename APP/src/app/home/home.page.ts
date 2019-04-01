import { Component } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { ModalController } from '@ionic/angular';
import { SelectedBinPage } from '../selected-bin/selected-bin.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  latitude: number;
  longitude:number;

  constructor(private geolocation: Geolocation, public modalController: ModalController) { }

  getLocation(){

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude
      this.longitude = resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SelectedBinPage
    });
    return await modal.present();
  }
}