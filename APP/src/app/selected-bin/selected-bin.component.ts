import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../user';
import { Bin } from '../bin';
import { UsersService } from '../services/users.service';
import { BinsService } from '../services/bins.service';
import { StorageService } from '../services/storage.service';



@Component({
  selector: 'app-selected-bin',
  templateUrl: './selected-bin.component.html',
  styleUrls: ['./selected-bin.component.scss'],
})

export class SelectedBinComponent implements OnInit {

  public favoriteBins: Bin[];
  public _selectedBinId: string;
  public binInfo: any;
  public users: User[];
<<<<<<< HEAD
  public user: any;
=======
  public active;
  public userId = '5ca1fdf203f2ef6b8024750b';
  public userHasFavorite = false;
>>>>>>> origin/duplicate

  @Output() bagsChangedEvent = new EventEmitter<string>();

  constructor(
    private usersService: UsersService,
    private binsService: BinsService,
    private storageService: StorageService
  ) {
    this.getLocalStorage();
  }

  get selectedBinId(): string {
    // transform value for display
    return this._selectedBinId;
  }

  @Input()
  set selectedBinId(selectedBinId: string) {
    this._selectedBinId = selectedBinId;
    if (selectedBinId.length) {
      this.getOneBinInfo(selectedBinId);
      this.getUserFavoriteBinsData(this.userId);
    }
  }


  ngOnInit() {
<<<<<<< HEAD
=======
    
>>>>>>> origin/duplicate
  }

  getOneBinInfo(selectedBinId: Bin['_id']): any {
    this.binsService.getOneBinInfo(selectedBinId)
      .subscribe(
        (bin_observable) => {
<<<<<<< HEAD
        this.binInfo = bin_observable;
=======
          this.binInfo = bin_observable;
          
>>>>>>> origin/duplicate
        }
      );
  }

<<<<<<< HEAD
  async getLocalStorage() {
    this.user = await this.storageService.getUsers();
    await this.getUserFavoriteBinsData(this.user._id);
  }

=======
  
>>>>>>> origin/duplicate
  getUserFavoriteBinsData(userId): any {
    this.usersService.getUserFavoriteBinsData(userId)
      .subscribe(
        async(bin_observable) => {
          this.favoriteBins = [];
          // bin_observable.length
          for (let i = 0; i < bin_observable.length; i++) {
            this.favoriteBins.push(bin_observable[i]);
          }
          await this.findBinInUserFavoriteAndColor();
        });

  }

  findBinInUserFavoriteAndColor(): boolean {
    let findBin = this.favoriteBins.find(bin => { return bin._id === this.selectedBinId });
    if (!findBin || (findBin._id !== this.selectedBinId)) {
      this.userHasFavorite = false;
    } else {
      this.userHasFavorite = true;
    }
    console.log(this.userHasFavorite);
    return this.userHasFavorite;
  }


<<<<<<< HEAD
  // Gets userId from the atribute of this class
  // Gets selectedBinId from home.page.ts
  addFavorite(userId: User['_id'], selectedBinId: Bin['_id']): void {
    const findBin = this.favoriteBins.find(bin => bin._id === selectedBinId);
    if (!findBin) {
=======
  //Gets userId from the atribute of this class
  //Gets selectedBinId from home.page.ts
  addFavorite(userId: User["_id"], selectedBinId: Bin["_id"]): void {
    this.findBinInUserFavoriteAndColor();
    if (!this.userHasFavorite) {
>>>>>>> origin/duplicate
      this.usersService.addFavoriteBin(userId, selectedBinId)
        .subscribe();
      console.log("add");
    } else {
      this.usersService.deleteBin(userId, selectedBinId)
        .subscribe();
      console.log("delete");
    }
    this.getUserFavoriteBinsData(userId);
  }

<<<<<<< HEAD
  changeBinBag(selectedBin: Bin['_id']): void {
=======
  changeBinBag(selectedBin: Bin["_id"]): void {
>>>>>>> origin/duplicate
    this.binsService.updateBinBags(selectedBin, !this.binInfo.bag).subscribe();
    this.bagsChangedEvent.next(selectedBin.toString());
  }


<<<<<<< HEAD
}
=======
}
>>>>>>> origin/duplicate
