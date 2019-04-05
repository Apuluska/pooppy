import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';

declare var google;


import { Bin } from '../bin';
import { BinsService } from '../services/bins.service';


@Component({
  selector: 'app-home', 
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  mapRef = null;

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private binsService: BinsService,
  ) {

  }

  ngOnInit() {
    this.loadMap();
    this.getBinData();
  }

  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.addMaker(myLatLng.lat, myLatLng.lng);
    });
  }

  private addMaker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: 'Hello World!',
      icon: 'assets/img/bin_point_true.svg'
    });
    marker.addListener('click', function() {
      console.log(marker.title);
    });
  }
  

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  latitude: number;
  longitude: number;
  public bin: Bin[];



  getBinData(): void {            this.binsService.getBinData()
      .subscribe(
        (bin_observable) => this.bin = bin_observable
      );
  }

}