import { Component } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Bin } from '../bin';
import { BinsService } from '../services/bins.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  latitude: number;
  longitude: number;
  public bin: Bin[];

  constructor(private geolocation: Geolocation, private binsService: BinsService) { }

  getBinData(): void {
    this.binsService.getBinData()
      .subscribe(
        (bin_observable) => this.bin = bin_observable
      );
  }

  ngOnInit() {
    this.getBinData();
  }

  getLocation() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude
      this.longitude = resp.coords.longitude
    }).catch((error) => {
      
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }
}