import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Owner } from 'src/app/providers/owners/owner.model';
import { OwnersService } from 'src/app/providers/owners/owners.service';

@Component({
  selector: 'app-favorites-modal',
  templateUrl: './favorites-modal.component.html',
  styleUrls: ['./favorites-modal.component.scss'],
})
export class FavoritesModalComponent implements OnInit {
  favoriteList: Owner[] = []

  constructor(
    private ownersService: OwnersService
  ) { }

  ngOnInit() {
    this.ownersService.favoriteOwnersList.subscribe(favList => {
      this.favoriteList = favList
    })
  }

  onClickDeleteOwner(ownerId: number, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.ownersService.deleteFavoriteOwner(ownerId).subscribe()
  }

}
