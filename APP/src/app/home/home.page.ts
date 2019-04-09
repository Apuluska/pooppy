import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import {Location} from '@angular/common';



declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  selectedPath = '';
  public menuPages = [
    {
      title: 'Favoritos',
      url: '/menu/favorites',
      icon: 'md-staricon',
      src: '../assets/icon/md-staricon.svg'
    },
    {
      title: 'Ayuda',
      url: '/menu/help',
      icon: 'helpicon.png',
      src: '../assets/icon/helpicon.png'
    },
    {
      title: 'Acerca de',
      url: '/menu/about',
      icon: 'infoicon.png',
      src: '/../assets/icon/infoicon.png'
    },
  ];

  mapRef = null;

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private location: Location,
  ) {

  }

  ngOnInit() {
    this.loadMap();
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
      title: 'Hello World!'
    });
  }

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }
}

