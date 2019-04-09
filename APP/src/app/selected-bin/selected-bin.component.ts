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

  public bins: Bin[];
  public users: User[];
  public userId = '5ca1fdf203f2ef6b8024750b';

  @Input() public selectedBinId: string;

  ngOnInit() {

  }

  // getOneBinInfo(selectedBinId): void {
  //   this.binsService.getOneBinInfo(selectedBinId)
  //   .subscribe(
  //     (bin_observable) => this.bin = bin_observable
  //     );
  // }

  getUserFavoriteBinsData(userId): any {
    this.usersService.getUserFavoriteBinsData(userId)
    .subscribe(
      (user_observable) => {this.bins = user_observable;
        console.log(this.bins);
      }
    );

  }


  // Gets userId from the atribute of this class
  // Gets selectedBinId from home.page.ts
  addFavorite(userId: User['_id'], selectedBinId: Bin['_id']): void {
    const userBinFavoriteList = this.getUserFavoriteBinsData(this.userId);
    const findBin = userBinFavoriteList.find(bin => bin._id === selectedBinId);
    if (!findBin) {
      this.usersService.addFavoriteBin(userId, selectedBinId)
        .subscribe();
    } else {
      this.usersService.deleteBin(userId, selectedBinId)
        .subscribe();
    }
  }



}
