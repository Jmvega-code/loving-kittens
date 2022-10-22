import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../providers/owners/owners.service';
import { Owner } from 'src/app/providers/owners/owner.model'

@Component({
  selector: 'app-owners',
  templateUrl: './owners.page.html',
  styleUrls: ['./owners.page.scss'],
})
export class OwnersPage implements OnInit {
  selectedFavoriteOwner: Owner

  constructor(
    private ownersService: OwnersService
  ) { }

  ngOnInit() {
    this.ownersService.selectedFavoriteOwner.subscribe((favoriteOwner) => {
      console.log('favoriteOwner', favoriteOwner)
      this.selectedFavoriteOwner = favoriteOwner
    })
  }

  ionViewWillEnter() {
    this.ownersService.fetchOwners().subscribe();
  }


  onClickFavorite(selectedOwner) {
    console.log('clicked favorite <3', selectedOwner)
    this.ownersService.addFavoriteOwner(selectedOwner)
  }

}
