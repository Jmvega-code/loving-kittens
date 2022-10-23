import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../providers/owners/owners.service';
import { Owner } from 'src/app/providers/owners/owner.model'

@Component({
  selector: 'app-owners',
  templateUrl: './owners.page.html',
  styleUrls: ['./owners.page.scss'],
})
export class OwnersPage implements OnInit {


  constructor(
    private ownersService: OwnersService
  ) { }

  ngOnInit() {
    this.ownersService.fetchOwners().subscribe();
  }

}
