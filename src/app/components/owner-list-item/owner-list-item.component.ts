import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/providers/owners/owner.model';
import { OwnersService } from 'src/app/providers/owners/owners.service';

@Component({
  selector: 'app-owner-list-item',
  templateUrl: './owner-list-item.component.html',
  styleUrls: ['./owner-list-item.component.scss'],
})
export class OwnerListItemComponent implements OnInit {
  loadedOwners: Owner[] = []
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


  onClickedOwner(ownerId) {
    this.ownersService.setFavoriteOwner(ownerId).subscribe(owner => {
      console.log('clicked', owner)
      // this.selectedOwner = owner
    })
  }
}
