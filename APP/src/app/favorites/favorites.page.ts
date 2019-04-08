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
  getFavoriteBinData(): any {
    console.log("vamoalyeu");
    let userId = "5c9b28545f02671f443fb996";
    this.usersService.getUserFavoriteBinsData(userId)
      .subscribe(
      (bin_observable) => {
       // bin_observable.length
        for(let i = 0; i < bin_observable.length;i++){
          console.log("a pushear " + bin_observable[i].address[0].addressName);
          this.bins.push(bin_observable[i]);
         
        } 
    
      });
  }

  public deleteBin():void {
    let userId = "5c9b28545f02671f443fb996";
    let binId= "5c9a8a8b318e3d3e6094df08";
    this.usersService.deleteBin(userId,binId).
    subscribe(
      (bin_observable)=>{
      for (let i = 0; i < bin_observable.length; i++) {
        if (this.bins[i].comprado) {
          this.bins.splice(i--, 1);
        }
      }
    })

  }
/*   public marcarTodos():void{
    for (let i = 0; i < this.productos.length; i++) {
    this.productos[i].comprado=true;
    } 
  }*/
}
