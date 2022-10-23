import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Owner } from 'src/app/providers/owners/owner.model';
import { OwnersService } from 'src/app/providers/owners/owners.service';

@Component({
  selector: 'app-owner-list-item',
  templateUrl: './owner-list-item.component.html',
  styleUrls: ['./owner-list-item.component.scss'],
})
export class OwnerListItemComponent implements OnInit {
  loadedOwners: Owner[] = [];
  selectedOwner: Owner;
  currentSelected: number = null;

  constructor(
    private ownersService: OwnersService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.ownersService.owners.subscribe((owners) => {
      this.loadedOwners = owners;
    }, error => {
      console.log(error);
    });
  }

  onClickedOwnerDetails(ownerId) {
    this.loadingController
      .create({
        message: 'Loading details...',
        spinner: 'crescent',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.ownersService
          .setClickedOwnerForDetails(ownerId)
          .subscribe((owner) => {
            console.log('clicked', owner);
            loadingEl.dismiss();
          }, error => {
            console.log(error);
          });
      });
  }
}
