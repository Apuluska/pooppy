import { Component, OnInit } from '@angular/core';

import { Bin } from '../bin';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage implements OnInit {
  constructor(
    private usersService: UsersService,
    ) {}

    ngOnInit() {
      this.getFavoriteBinData()
    }
  
    public bins = [];
   
  //userId es el id del usuario logueado, hay que ver de donde lo saca el front
    //getFavoriteBinData(userId: string): any { //Esta es la linea que deberia quedar, debe recibir el userid por parametro
    //this.bins = [];
    getFavoriteBinData(): any {

      let userId = "5c9b28545f02671f443fb996";
      this.usersService.getUserFavoriteBinsData(userId)
        .subscribe(
        (bin_observable) => {
         this.bins = [];
          for(let i = 0; i < bin_observable.length;i++){
            this.bins.push(bin_observable[i]);
          } 
        });
    }
  
    public deleteBin(binId):void {
      let userId = "5c9b28545f02671f443fb996";
      this.usersService.deleteBin(userId,binId).
      subscribe(
        this.getFavoriteBinData()
      );
    }
  }
