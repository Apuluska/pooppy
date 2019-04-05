import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { Bin } from '../bin';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-selected-bin',
  templateUrl: './selected-bin.component.html',
  styleUrls: ['./selected-bin.component.scss'],
})
export class SelectedBinComponent implements OnInit {

  constructor(private usersService: UsersService) { }
 
  ngOnInit() {}
  public bin: Bin[];
  public user: User[];

  getInfo

  addFavorite(userId: User["id"], binId: Bin["id"]): void {
    // find({email: userEmail}){
    //   if (!userId) { 
    //     this.usersService.addFavorite(userId, binId)
    //     .subscribe();
    //   } else{
    //     this.usersService.deleteFavoriteBin(userId, binId)
    //     .subscribe();
    //   }
    // }
  }

  

}
