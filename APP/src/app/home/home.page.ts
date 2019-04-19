import { Component, OnInit} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import {Location} from '@angular/common';
import { Bin } from '../bin';
import { BinsService } from '../services/bins.service';
import { SelectedBinComponent } from '../selected-bin/selected-bin.component';

/* import {SelectedBinComponent } from 'selected-bin/selected-bin.component' */

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public thisBinId = "";
  public markers = [];

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private binsService: BinsService,
    private selectedBin: SelectedBinComponent
  ) {

  }
  mapRef = null;
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
      src: '../assets/icon/infoicon.png'
    },
  ];

  latitude: number;
  longitude: number;
  public bin: Bin[];

  public selectedBinId: string;

  idOfSelectedBin = null;

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
      zoom: 12,
      disableDefaultUI: true,
      styles:
      [
        {
          'featureType': 'administrative',
          'elementType': 'geometry',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'poi',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'labels.icon',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'transit',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        }
      ]
    });
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.addMaker(myLatLng.lat, myLatLng.lng);
    });
    console.log('He cargado el mapa');
    this.getBinData();
  }
  public addMaker(lat: number, lng: number) {
      const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: 'Hello World!',
      icon: 'assets/img/geolocation.svg',
    });

  }

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  getBinData(): void {
     this.binsService.getBinData()
      .subscribe(
      (bin_observable) => {
       // bin_observable.length
        let iconBin;
          this.clearMarkers();        
          for (let i = 0; i < bin_observable.length; i++) {
          if (bin_observable != null && bin_observable[i].address != null) {
          const lat = parseFloat(bin_observable[i].address[0].lat);
          const lng = parseFloat(bin_observable[i].address[0].lng);
          const statusBin = bin_observable[i].bag;
          if (statusBin === true) {
            iconBin = 'assets/img/bin_point_true.svg'; } else {
            iconBin = 'assets/img/bin_point_false.svg';
          }
         const marker =  new google.maps.Marker({
            position: { lat, lng },
            map: this.mapRef,
            title: bin_observable[i]._id,
            icon: iconBin,
            has_bags: statusBin
          });
          marker.addListener('click', ()=> {
            //console.log("titulo1");
            //console.log(this.thisBinId);
            //console.log("titulo2");
            //console.log(marker.title);
            if(this.idOfSelectedBin){
              this.unselectBin(this.thisBinId);
            }

            console.log("Esto es lo que hay");
            console.log(this.idOfSelectedBin);
            console.log(marker.icon)
            if(this.idOfSelectedBin){
              console.log("Primera true");
            }else{
              console.log("Primera false");

            }

            if(marker.title === this.thisBinId){
              console.log("Segunda true");
            }else{
              console.log("Segunda false");
            }

            if(this.idOfSelectedBin && marker.title === this.thisBinId){
              this.unselectBin(marker.title);
            }else{
              this.selectBin(marker.title);
            }
            this.selectedBin.getOneBinInfo(marker.title);
            this.thisBinId = marker.title;
          });
          this.markers.push(marker);
        }
      }
        console.log('He cargado los marcadores');

      });
  }

  selectBin(binId){
    console.log("select");
    console.log(binId);
    for(let i=0; i< this.markers.length; i++){
      if(this.markers[i].title === binId){
        //console.log("encontrado");
        this.markers[i].setIcon('assets/img/bin_point_selected.png');
        this.markers[i].icon = 'assets/img/bin_point_selected.png';
        this.idOfSelectedBin = binId;
        return;
      }
    }
  }

  unselectBin(binId){
    console.log("unselect");
    console.log(binId);
    for(let i=0; i< this.markers.length; i++){
      if(this.markers[i].title === binId){
        //console.log("encontrado");
        //console.log(this.markers[i].has_bags);
        if(this.markers[i].has_bags){
          this.markers[i].setIcon('assets/img/bin_point_true.svg');
        }else{
          this.markers[i].setIcon('assets/img/bin_point_false.svg');
        }
        this.idOfSelectedBin = null;
        return;
      }
    }
  }

  clearMarkers(): void{
    for(let i=0;i<this.markers.length;i++){
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

}
