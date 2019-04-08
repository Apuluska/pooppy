import { Component, OnInit, Input  } from '@angular/core';

import { User } from '../user';
import { Bin } from '../bin';
import { UsersService } from '../services/users.service';
import { BinsService } from '../services/bins.service';


@Component({
  selector: 'app-selected-bin',
  templateUrl: './selected-bin.component.html',
  styleUrls: ['./selected-bin.component.scss'],
})
export class SelectedBinComponent implements OnInit {

  constructor(private usersService: UsersService, private binsService: BinsService) { }

  ngOnInit() {
  }

  public bin: Bin[];
  public users: User[];
  public userId = '5ca1fdf203f2ef6b8024750b';

  @Input() public thisBinId : string;

  // getOneBinInfo(thisBinId): void {
  //   this.binsService.getOneBinInfo(thisBinId)
  //   .subscribe(
  //     (bin_observable) => this.bin = bin_observable
  //     );
  // }

  //Gets userId from the atribute of this class
  //Gets thisBinId from home.page.ts
  addFavorite(userId: User["_id"], thisBinId: Bin["_id"]): void {
    console.log(thisBinId);
    // const userBinFavoriteList = getUserFavoriteBinList('5ca1fdf203f2ef6b8024750b');
    // const findBin = userBinFavoriteList.find(bin => bin._id === thisBinId)
    // if (!findBin) {
    //   this.usersService.addFavoriteBin(userId, thisBinId)
    //     .subscribe();
    // } else {
    //   this.usersService.deleteFavoriteBin(userId, thisBinId)
    //     .subscribe();
    // }
  }



}
