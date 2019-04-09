import { Component, OnInit} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';


declare var google;


import { Bin } from '../bin';
import { BinsService } from '../services/bins.service';
import { SelectedBinComponent } from '../selected-bin/selected-bin.component';


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
    private selectedBin: SelectedBinComponent 
  ) {

  }

  public selectedBinId: string;

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
      zoom: 12,
      disableDefaultUI: true,
      styles: 
      [
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
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
  }
  
  public addMaker(lat: number, lng: number) {
      const marker= new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: 'Hello World!',
      icon:'assets/img/bin_point_true.svg',
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



  getBinData(): void { this.binsService.getBinData()
      .subscribe(
      (bin_observable) => {
       // bin_observable.length
        let iconBin;
        for(let i = 0; i < 20;i++){
          let lat = parseFloat(bin_observable[i].address[0].lat);
          let lng = parseFloat(bin_observable[i].address[0].lng);
          let statusBin= bin_observable[i].bag;
          if (statusBin===true){
           iconBin= 'assets/img/bin_point_true.svg'}
           else{
               iconBin= 'assets/img/bin_point_false.svg'
           }
         const marker=  new google.maps.Marker({
            position: { lat, lng },
            map: this.mapRef,
            title: bin_observable[i]._id,
            icon: iconBin
          });
          marker.addListener('click', ()=> {
            this.selectedBinId = marker.title;
            this.selectedBin.getOneBinInfo(marker.title);
          });
        } 
    
      });
  }

}