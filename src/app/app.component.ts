import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
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
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.ownerService.favoriteOwnersList.subscribe(favoriteList => {
      this.favoriteCount = favoriteList.length
    }, error => {
      console.log(error);
      this.loadingController.dismiss()
    });
    this.ownerService.deadCats.subscribe(data => {
      this.deadCats = data
    }, error => {
      console.log(error);
      this.loadingController.dismiss()
    });
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
