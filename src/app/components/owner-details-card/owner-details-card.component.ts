import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/providers/owners/owner.model';
import { OwnersService } from 'src/app/providers/owners/owners.service';

@Component({
  selector: 'app-owner-details-card',
  templateUrl: './owner-details-card.component.html',
  styleUrls: ['./owner-details-card.component.scss'],
})
export class OwnerDetailsCardComponent implements OnInit {
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

  onClickFavorite(selectedOwner) {
    console.log('clicked favorite <3', selectedOwner)
    this.ownersService.addFavoriteOwner(selectedOwner)
  }

}
