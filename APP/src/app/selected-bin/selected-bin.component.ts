import { Component, OnInit } from '@angular/core';

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

  ngOnInit() { }
  public bins: Bin[];
  public users: User[];

  getOneBinInfo(binId): void {
    this.binsService.getOneBinInfo(binId)
    .subscribe(
      (bin_observable) => this.bins = bin_observable
    );
  }

  getOneUserInfo(binId): void {
    this.usersService.getOneUserInfo(binId)
    .subscribe(
      (user_observable) => this.users = user_observable
    );
  }

  addFavorite(userId: User["_id"], binId: Bin["_id"]): void {
    const findBin = this.bins.find(bin => bin._id === binId)
    if (!findBin) {
      this.usersService.addFavoriteBin(userId, binId)
        .subscribe();
    } else {
      this.usersService.deleteFavoriteBin(userId, binId)
        .subscribe();
    }
  }



}
