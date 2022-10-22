import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../providers/owners/owners.service';
import { Owner } from 'src/app/providers/owners/owner.model'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.page.html',
  styleUrls: ['./owners.page.scss'],
})
export class OwnersPage implements OnInit {
  loadedOwners: Owner[] = []
  private ownersSub: Subscription;
  selectedOwner: Owner

  constructor(
    private ownersService: OwnersService
  ) { }

  ngOnInit() {
    this.ownersService.owners.subscribe(owners => {
      console.log(owners);
      this.loadedOwners = owners
    })
  }

  ionViewWillEnter() {
    this.ownersService.fetchOwners().subscribe();
  }

  onClickedOwner(ownerId) {
    this.ownersService.getOwner(ownerId).subscribe(owner => {
      this.selectedOwner = owner
      console.log('clicked', owner)
    })
  }

  onClickFavorite(selectedOwner) {
    console.log('clicked favorite <3', selectedOwner)
    this.ownersService.addFavoriteOwner(selectedOwner)
    // this.selectedOwner = null
  }

}
