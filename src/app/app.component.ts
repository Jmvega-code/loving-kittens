import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FavoritesModalComponent } from './components/favorites-modal/favorites-modal.component';
import { OwnersService } from './providers/owners/owners.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  favoriteCount: number = 0
  deadCats = 0

  constructor(
    private ownerService: OwnersService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.ownerService.favoriteOwnersList.subscribe(favoriteList => {
      this.favoriteCount = favoriteList.length
    })
    this.ownerService.deadCats.subscribe(data => {
      this.deadCats = data
    })
  }

  onOpenfavoriteModal() {
    if(this.favoriteCount) {
      this.modalController
      .create({
        component: FavoritesModalComponent,
      })
      .then((modalEl) => {
        modalEl.present();
      }
    );
    }
  }
}
