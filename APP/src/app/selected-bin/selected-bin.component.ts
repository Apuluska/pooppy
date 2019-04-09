import { Component, OnInit, Input  } from '@angular/core';

import { User } from '../user';
import { Bin } from '../bin';
import { UsersService } from '../services/users.service';
import { BinsService } from '../services/bins.service';
// import { HomePage } from '../home/home.page';


@Component({
  selector: 'app-selected-bin',
  templateUrl: './selected-bin.component.html',
  styleUrls: ['./selected-bin.component.scss'],
})
export class SelectedBinComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private binsService: BinsService,
    // private homePage : HomePage
    ) { }
  
  @Input() public selectedBinId : string;
  @Input() public addMarker;

  public favoriteBins: Bin[];
  public binInfo: Bin[];
  public users: User[];
  public userId = '5ca1fdf203f2ef6b8024750b';
  
  ngOnInit() {
    this.getUserFavoriteBinsData(this.userId);
  }

  getOneBinInfo(selectedBinId: Bin["_id"]): any {
    this.binsService.getOneBinInfo(selectedBinId)
    .subscribe(
      (bin_observable) => {this.binInfo = bin_observable; console.log(this.binInfo)}
      );
  }

  getUserFavoriteBinsData(userId): any {
   this.usersService.getUserFavoriteBinsData(userId)
   .subscribe(
    (bin_observable) => {
      this.favoriteBins = [];
     // bin_observable.length
      for(let i = 0; i < bin_observable.length;i++){
        this.favoriteBins.push(bin_observable[i]);
      } 
  
    });
    
  }

  
  //Gets userId from the atribute of this class
  //Gets selectedBinId from home.page.ts
  addFavorite(userId: User["_id"], selectedBinId: Bin["_id"]): void {
    const findBin = this.favoriteBins.find(bin => {return bin._id === selectedBinId});
    if (!findBin) {
      this.usersService.addFavoriteBin(userId, selectedBinId)
        .subscribe();
    } else {
      this.usersService.deleteBin(userId, selectedBinId)
        .subscribe();
    }
    this.getUserFavoriteBinsData(userId);
    // this.homePage.getBinData();
  }



}
