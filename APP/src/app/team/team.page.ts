import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';



@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {}
  backClicked() {
    this.location.back();
  }
}

